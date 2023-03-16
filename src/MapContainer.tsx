import TrainMap from "./TrainMap";
import { getFerryRoutes, getTrainRoutes } from "./routes";

const MapContainer = () => {
  const trainRoutes = getTrainRoutes();
  const ferryRoutes = getFerryRoutes();

  return (
    <TrainMap
      trainRoutes={trainRoutes}
      ferryRoutes={ferryRoutes}
      citiesToVisit={["Amsterdam", "Brussels", "Paris", "Riga"]}
    ></TrainMap>
  );
};

export default MapContainer;
