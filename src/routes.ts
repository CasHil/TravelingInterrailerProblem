import TrainRoutes from "../data/TrainRoutes.json";
import FerryRoutes from "../data/FerryRoutes.json";

export type TrainRoute = {
  from: string;
  to: string;
  distance: number;
};

export function getTrainRoutes(): Array<TrainRoute> {
  const trainRoutes = JSON.parse(JSON.stringify(TrainRoutes));
  return trainRoutes.map((route: any) => {
    const [from, to] = route.Name.split(" - ");
    const duration = route.description;
    const hours = duration.match(/(\d+)h/);
    const minutes = duration.match(/(\d+)m/);
    const distance =
      (hours ? parseInt(hours[1]) * 60 : 0) +
      (minutes ? parseInt(minutes[1]) : 0);

    return {
      from,
      to,
      distance,
    };
  });
}

export type FerryRoute = {
  from: string;
  to: string;
  distance: number;
};

export function getFerryRoutes(): Array<FerryRoute> {
  const ferryRoutes = JSON.parse(JSON.stringify(FerryRoutes));
  return ferryRoutes.map((route: any) => {
    const [from, to] = route.Name.split(" - ");
    const duration = route.description;
    const hours = duration.match(/(\d+)h/);
    const minutes = duration.match(/(\d+)m/);
    const distance =
      (hours ? parseInt(hours[1]) * 60 : 0) +
      (minutes ? parseInt(minutes[1]) : 0);

    return {
      from,
      to,
      distance,
    };
  });
}
