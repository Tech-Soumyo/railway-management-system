export interface Train {
  id: number;
  name: string;
  source: string;
  destination: string;
  totalSeats: number;
  availableSeats: number;
  createdAt: Date;
}
