export interface Car {
  id: string;
  name: string;
  model: string;
  year: number;
}

export interface ICar {
  id: number;
  color: string;
  image: string[];
  country: string;
  year: number;
  cost: number;
  milage: number;
  engine: string;
  volume: string;
  horsepower: number;
  drive: string;
  checkpoint: string;
  doors: number;
  body: string;
  statement: string;
  description: string;
  authoremail: string;
  rate: string;
  mark: string;
  model: string;
  seen: number;
  liked: number;
  liked_user: string[];
  createdAt: string;
  updatedAt: string;
}

export interface INews {
  id: number;
  title: string;
  content: string;
  vehicle: false;
  author: string;
  image: string;
  created_at: string;
  updated_at: string;
}
