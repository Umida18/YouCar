import { ICar, IMotobyke } from "../Type/Type";

export const mapCarDataToItem = (car: ICar) => ({
  id: car.id,
  color: car.color,
  image: car.image,
  country: car.country,
  year: car.year,
  cost: car.cost,
  milage: car.milage,
  engine: car.engine,
  volume: car.volume,
  horsepower: car.horsepower,
  drive: car.drive,
  checkpoint: car.checkpoint,
  doors: car.doors,
  body: car.body,
  statement: car.statement,
  description: car.description,
  authoremail: car.authoremail,
  rate: car.rate,
  mark: car.mark,
  model: car.model,
  seen: car.seen,
  liked: car.liked,
  liked_user: car.liked_user,
  createdAt: car.createdAt,
  updatedAt: car.updatedAt,
  type: car.type,
});

export const mapMotobikeDataToItem = (bike: IMotobyke) => ({
  id: bike.id,
  image: bike.image,
  title: `${bike.mark} ${bike.model}`,
  year: bike.year,
  cost: bike.cost,
  milage: bike.milage,
  engine: bike.engine,
  checkpoint: bike.body,
  drive: bike.drive,
  country: bike.country,
  mark: bike.mark,
  model: bike.model,
  color: bike.color,
  description: bike.description,
  type: bike.type,
});
