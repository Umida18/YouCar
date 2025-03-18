import type { UploadFile } from "antd/es/upload/interface";

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
  type?: "car" | "moto" | "commerce";
  statement: string;
  description: string;
  authoremail: string;
  rate: string;
  mark_id: string;
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
  type?: string;
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
  mark: string;
  model: string;
  color: string;
  description: string;
}

export interface IRegister {
  role: string;
  id: number;
  name: string;
  email: string;
}

export interface IUser {
  message: string;
  userData: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  yours: {
    result: {
      cars: any[];
      motos: any[];
      commerce: any[];
    };
  };
}

export interface ISingleNews {
  id: number;
  title: string;
  content: string;
  vehicle: boolean;
  author: string;
  image: string;
  createdAt: string;
  updated_at: string;
}

export interface FilteredAuto {
  cars: ICar[];
  motorcycles: IMotobyke[];
  commerce: any[];
  count: number;
}

export interface VehicleData {
  car: string[];
  moto: string[];
  commerce: string[];
}

export interface IMark {
  id: number;
  mark: string;
}

export interface IMarks {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserData {
  createdAt: string;
  email: string;
  id: number;
  name: string;
  password: string;
  role: string;
  updatedAt: string;
  userrate: string;
}

export interface CarFormValues {
  color: string;
  image: UploadFile[];
  country: string;
  year: number;
  cost: number;
  milage: number;
  engine: string;
  volume: number;
  horsepower: number;
  drive: string;
  checkpoint: string;
  doors: number;
  body: string;
  statement: string;
  description: string;
  authoremail: string;
  rate: string;
  mark_id: number;
  model: string;
  [key: string]: any;
}

export interface CustomFile {
  uid: string;
  name: string;
  lastModified: number;
  size: number;
  type: string;
  percent: number;
  originFileObj: File;
}

export interface Message {
  chat_id: string;
  createdAt: string;
  id: number;
  message: string;
  receiver_id: number;
  sender_id: number;
  status: string;
  type: string;
  updatedAt: string;
}

export interface SellerData {
  id: string;
  name: string;
  avatar: string;
}

export interface IData {
  chat_id: string;
  chat_user_id: number;
  create_at: string;
  mute_type: false;
  user_id: number;
}

export interface SendMessage {
  chat_id: string;
  message: string;
  receiverId: number;
  senderId: number;
  status: string;
  timestamp: string;
  type: string;
}

export interface IUser {
  createdAt: string;
  email: string;
  id: number;
  name: string;
  password: string;
  role: string;
  updatedAt: string;
  userrate: string;
}

export interface AllChatsUser {
  chat_id: string;
  chat_user_id: number;
  chat_user_name: string;
  create_at: string;
  mute_type: boolean;
  unread_messages_count: string;
}
