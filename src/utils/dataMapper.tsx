import { ICar, IMotobyke, Item } from "../Type/Type";

export const mapCarDataToItem = (car: ICar): Item => ({
  id: car.id,
  image: car.image,
  title: `${car.mark} ${car.model}`,
  year: car.year,
  cost: car.cost,
  details: [
    `${car.milage.toLocaleString()} км`,
    car.engine,
    car.checkpoint,
    car.drive,
  ],
  location: car.country,
});

export const mapMotobikeDataToItem = (bike: IMotobyke): Item => ({
  id: bike.id,
  image: bike.image,
  title: `${bike.mark} ${bike.model}`,
  year: bike.year,
  cost: bike.cost,
  details: [`${bike.milage} km`, bike.engine],
  location: bike.country,
});
