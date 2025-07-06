export interface Booking {
  id: number;
  userId: number;
  trainId: number;
  createdAt: Date;
}

export interface BookingDetails extends Booking {
  train: {
    name: string;
    source: string;
    destination: string;
  };
}
