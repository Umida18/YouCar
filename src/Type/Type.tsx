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

export interface IMotobyke {
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
  transmission: string;
  body: string;
  condition: string;
  description: string;
  authoremail: string;
  rate: string;
  mark: string;
  model: string;
  createdAt: string;
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

export interface Item {
  id: number;
  image: string[];
  title: string;
  year?: number;
  cost: number;
  engine: string;
  checkpoint: string;
  milage: number;
  location?: string;
  drive: string;
  country: string;
}

export interface IRegister {
  role: string;
  id: number;
  name: string;
  email: string;
}
