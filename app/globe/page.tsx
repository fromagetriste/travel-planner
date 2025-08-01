"use client";

import { useEffect, useRef } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";

export default function GlobePage() {
    const globeRef = useRef<GlobeMethods | undefined>(undefined);
    
    useEffect(() => {
        if (globeRef.current) {
            globeRef.current.controls().autoRotate = true;
        }
     }, []) 

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-center text-4xl font-bold mb-12">
            Your travel Journey
          </h1>
          <div className="grid grid-cols-1 lg:grid-cold-3 gap-8 items-start">
            <div className="lg:cols-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  See where you've been
                </h2>
                <div className="h-[600px] w-full relative">
                  <Globe
                    ref={globeRef}
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                    backgroundColor="rgba(0,0,0,0)"
                    pointColor={() => "#FF5733"}
                    pointLabel="name"
                    pointsData={locations}
                    pointRadius={0.5}
                    pointAltitude={0.1}
                    pointsMerge={true}
                    width={800}
                    height={600}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
