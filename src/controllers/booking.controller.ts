import { Request, Response } from "express";
import { bookSeat, getBookingDetails } from "../services/booking.service";

export const seatBooking = async (req: Request, res: Response) => {
  try {
    const { trainId } = req.body;
    const userId = req.user.id;
    const booking = await bookSeat(userId, parseInt(trainId));
    res.status(201).json({ message: "Seat is booked successfully", booking });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getBooking = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.id;
    const booking = await getBookingDetails(userId, parseInt(bookingId));
    res.json({
      message: "Booking details are retrieved successfully",
      booking,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
