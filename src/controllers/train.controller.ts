import { Request, Response } from "express";
import { addTrain, checkSeatAvailability } from "../services/train.service";

export const createTrain = async (req: Request, res: Response) => {
  try {
    const { name, source, destination, totalSeats } = req.body;
    const trainData = await addTrain({ name, source, destination, totalSeats });
    res.status(201).json({ message: "Train is added successfully", trainData });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const checkAvailabilityOfTrain = async (req: Request, res: Response) => {
  try {
    const { source, destination } = req.query as {
      source: string;
      destination: string;
    };
    const trainsData = await checkSeatAvailability(source, destination);
    res.json({ message: "Trains are retrieved successfully", trainsData });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
