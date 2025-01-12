import { ICar, IMotobyke, Item } from "../Type/Type";

export const mapCarDataToItem = (car: ICar): Item => ({
  id: car.id,
  image: car.image,
  title: `${car.mark} ${car.model}`,
  year: car.year,
  cost: car.cost,
  milage: car.milage,
  engine: car.engine,
  checkpoint: car.checkpoint,
  drive: car.drive,
  country: car.country,
});

export const mapMotobikeDataToItem = (bike: IMotobyke): Item => ({
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
});
