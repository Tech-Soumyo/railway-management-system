import prisma from "../config/database.config";
import { Booking } from "../types/booking.type";

export const bookSeat = async (
  userId: number,
  trainId: number
): Promise<Booking> => {
  if (!trainId) {
    throw new Error("Train ID is required");
  }

  const booking = await prisma.$transaction(
    async (tx) => {
      const trainDataFromDb = await tx.train.findUnique({
        where: { id: trainId },
      });
      if (!trainDataFromDb) {
        throw new Error("Train is not found");
      }
      if (trainDataFromDb.availableSeats <= 0) {
        throw new Error("Seats are not available");
      }

      const isExistingBooking = await tx.booking.findUnique({
        where: { userId_trainId: { userId, trainId } },
      });
      if (isExistingBooking) {
        throw new Error("User has already booked seat on this train");
      }

      await tx.train.update({
        where: {
          id: trainId,
          availableSeats: trainDataFromDb.availableSeats,
        },
        data: { availableSeats: trainDataFromDb.availableSeats - 1 },
      });

      const newBookingCreating = await tx.booking.create({
        data: { userId, trainId },
        select: {
          id: true,
          userId: true,
          trainId: true,
          createdAt: true,
        },
      });

      return newBookingCreating;
    },
    {
      isolationLevel: "Serializable",
    }
  );

  return booking;
};

export const getBookingDetails = async (
  userId: number,
  bookingId: number
): Promise<
  Booking & { train: { name: string; source: string; destination: string } }
> => {
  if (!bookingId) {
    throw new Error("Booking ID is required");
  }

  const seatBooking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      train: {
        select: {
          name: true,
          source: true,
          destination: true,
        },
      },
    },
  });

  if (!seatBooking) {
    throw new Error("Seat Booking is not found");
  }
  if (seatBooking.userId !== userId) {
    throw new Error("Unauthorized: You can only view your own bookings");
  }

  return {
    id: seatBooking.id,
    userId: seatBooking.userId,
    trainId: seatBooking.trainId,
    createdAt: seatBooking.createdAt,
    train: {
      name: seatBooking.train.name,
      source: seatBooking.train.source,
      destination: seatBooking.train.destination,
    },
  };
};
