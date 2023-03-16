import React, { FunctionComponent, useState } from "react";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  Polyline,
} from "@react-google-maps/api";
import graphlib from "@dagrejs/graphlib";
import { getCityCoordinates } from "./Coordinates";
import cities from "../data/cities.json";
import { FerryRoute, TrainRoute } from "./routes";

type TrainMapProps = {
  trainRoutes: Array<TrainRoute>;
  ferryRoutes: Array<FerryRoute>;
  citiesToVisit: Array<string>;
};

const TrainMap: FunctionComponent<TrainMapProps> = ({
  trainRoutes,
  ferryRoutes,
  citiesToVisit,
}) => {
  const citiesWithCoordinates = Array.from(
    new Set(getCityCoordinates(citiesToVisit))
  );

  const graph = new graphlib.Graph({ directed: false });
  graph.setDefaultEdgeLabel(0);

  const addVertices = () => {
    citiesWithCoordinates
      .map((city) => city.name)
      .forEach((cityName) => {
        graph.setNode(cityName);
      });
  };

  const addEdges = () => {
    trainRoutes.forEach((trainRoute) => {
      graph.setEdge(trainRoute.from, trainRoute.to, trainRoute.distance);
    });

    ferryRoutes.forEach((ferryRoute) => {
      graph.setEdge(ferryRoute.from, ferryRoute.to, ferryRoute.distance);
    });
  };

  addVertices();
  addEdges();

  function permute(cities: string[]): string[][] {
    if (cities.length === 1) {
      return [cities];
    }

    const permutations: string[][] = [];

    for (let i = 0; i < cities.length; i++) {
      const firstCity = cities[i];
      const remainingCities = cities.filter((city) => city !== firstCity);
      const subPermutations = permute(remainingCities);

      for (const subPermutation of subPermutations) {
        permutations.push([firstCity, ...subPermutation]);
      }
    }

    return permutations;
  }

  function getDistance(city1: string, city2: string): number {
    return graph.edge(city1, city2);
  }

  function calculatePathLength(cities: string[]): number {
    let totalDistance = 0;

    for (let i = 0; i < cities.length - 1; i++) {
      const city1 = cities[i];
      const city2 = cities[i + 1];
      const distance = getDistance(city1, city2);
      totalDistance += distance;
    }

    return totalDistance;
  }

  function findShortestPath(): {
    shortestPath: string[];
    shortestPathLength: number;
  } {
    const allPossiblePaths = permute(citiesToVisit);
    let shortestPath: string[] | undefined;
    let shortestPathLength = Infinity;

    for (const path of allPossiblePaths) {
      const pathLength = calculatePathLength(path);

      if (pathLength < shortestPathLength) {
        shortestPath = path;
        shortestPathLength = pathLength;
      }
    }

    return { shortestPath: shortestPath!, shortestPathLength };
  }

  console.log(findShortestPath());

  // Return a Google Map with the shortest route between the citiesToVisit. Draw the cities on the map using the latitude and longitude found in Cities.json. Use Polyline to draw a line between all those cities.
  return (
    <GoogleMap
      mapContainerStyle={{
        width: "100vw",
        height: "100vh",
      }}
      zoom={4.3}
      center={{ lat: 55.0, lng: 35.0 }}
    >
      <Polyline
        path={citiesWithCoordinates.map((city) => {
          return { lat: city.lat, lng: city.lng };
        })}
        options={{
          strokeColor: "#ff2527",
          strokeOpacity: 0.75,
          strokeWeight: 2,
        }}
      ></Polyline>
    </GoogleMap>
  );
};

export default TrainMap;
