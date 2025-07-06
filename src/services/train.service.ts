import prisma from "../config/database.config";
import { Train } from "../types/train.type";

export const addTrain = async (trainData: {
  name: string;
  source: string;
  destination: string;
  totalSeats: number;
}): Promise<Train> => {
  if (
    !trainData.name ||
    !trainData.source ||
    !trainData.destination ||
    trainData.totalSeats == null
  ) {
    throw new Error("Name, source, destination, and totalSeats are required");
  }
  if (trainData.source === trainData.destination) {
    throw new Error("Source and destination can't be same");
  }
  if (trainData.totalSeats <= 0) {
    throw new Error("Total seats must be greater than 0");
  }

  const isExistingTrain = await prisma.train.findUnique({
    where: { name: trainData.name },
  });
  if (isExistingTrain) {
    throw new Error("Train name is already existed");
  }

  const trainDataFromDB = await prisma.train.create({
    data: {
      name: trainData.name,
      source: trainData.source,
      destination: trainData.destination,
      totalSeats: trainData.totalSeats,
      availableSeats: trainData.totalSeats,
    },
    select: {
      id: true,
      name: true,
      source: true,
      destination: true,
      totalSeats: true,
      availableSeats: true,
      createdAt: true,
    },
  });

  return trainDataFromDB;
};

export const checkSeatAvailability = async (
  source: string,
  destination: string
): Promise<Train[]> => {
  if (!source || !destination) {
    throw new Error("Source and destination are required");
  }
  if (source === destination) {
    throw new Error("Source and destination can't be the same");
  }

  const trainsDataFromDb = await prisma.train.findMany({
    where: {
      source: {
        equals: source,
        mode: "insensitive",
      },
      destination: {
        equals: destination,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      name: true,
      source: true,
      destination: true,
      totalSeats: true,
      availableSeats: true,
      createdAt: true,
    },
  });

  return trainsDataFromDb;
};
