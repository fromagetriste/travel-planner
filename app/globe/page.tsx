"use client";

import { useEffect, useRef, useState } from "react";
import type { GlobeMethods } from "react-globe.gl";
import dynamic from "next/dynamic";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { MapPin } from "lucide-react";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
});

export interface TransformedLocation {
  lat: number;
  lng: number;
  country: string;
  name: string;
}
export default function GlobePage() {
  const globeRef = useRef<GlobeMethods>(undefined);

  const [visitedCountries, setVisitedCountries] = useState<Set<string>>(
    new Set()
  );
  const [locations, setLocations] = useState<TransformedLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/trips");
        const data = await response.json();
        const countries = new Set<string>(
          data.map((loc: TransformedLocation) => loc.country)
        );
        setVisitedCountries(countries);
        setLocations(data);
      } catch (err) {
        console.error("Error fetching locations:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // rotate the globe with an interval as it needs to load before mounting
  useEffect(() => {
    const interval = setInterval(() => {
      if (globeRef.current) {
        const controls = globeRef.current.controls();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.8;
          clearInterval(interval);
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-center text-4xl font-bold mb-12">
            Your travel Journey
          </h1>
          <div className="grid grid-cols-1 lg:grid-cold-3 gap-8 items-start">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  See where you have been
                </h2>
                <div className="h-[600px] w-full relative">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 "></div>
                    </div>
                  ) : (
                    <div className="w-full h-[400px] sm:h-[600px] relative">
                      <Globe
                        ref={globeRef}
                        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                        backgroundColor="rgba(0,0,0,0)"
                        pointColor={() => "#FF5733"}
                        pointLabel="name"
                        pointsData={locations}
                        pointRadius={0.5}
                        pointAltitude={0.01}
                        pointsMerge={true}
                        width={800}
                        height={600}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Countries Visited</CardTitle>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 "></div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-sm text-blue-800">
                            You have visited{" "}
                            <span className="font-bold">
                              {visitedCountries.size}
                            </span>{" "}
                            countries!
                          </p>
                        </div>
                        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                          {Array.from(visitedCountries)
                            .sort()
                            .map((country) => (
                              <div
                                key={country}
                                className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100 "
                              >
                                <MapPin className="h-4 w-4 text-red-500" />
                                <span className="text-sm font-medium text-gray-800">
                                  {country}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
