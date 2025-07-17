// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const [zip, setZip] = useState("");

  const detectZip = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const zipCode = data?.address?.postcode;
          if (zipCode) setZip(zipCode);
        } catch (error) {
          console.error("Error fetching ZIP code:", error);
        }
      });
    }
  };

  useEffect(() => {
    detectZip();
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background Placeholder */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-5">
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/content/Home.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          Find A Stretch Coach
        </h1>
        <form className="flex items-center bg-white rounded-full shadow-md px-4 py-2 w-fit">
          <div className="flex items-center space-x-2 text-gray-700">
            <button type="button" onClick={detectZip}>
              <MapPinIcon className="h-10 w-10 text-cyan-500 hover:text-cyan-700 transition-colors duration-200" />
            </button>
            <input
              type="text"
              placeholder="ZIP"
              value={zip}
              onChange={(e) => {
                const input = e.target.value;
                if (/^\d{0,5}$/.test(input)) setZip(input);
              }}
              className="w-25 text-center bg-transparent focus:outline-none text-2xl font-semibold text-gray-500"
            />
          </div>
          <button
            type="submit"
            className="ml-4 bg-cyan-500 text-white font-semibold px-5 py-2 rounded-full hover:bg-cyan-700 text-xl"
          >
            Search
          </button>
        </form>
        <div className="text-white text-center mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] mt-10">
          <p className="text-xl md:text-4xl mb-3">
          Flexiblity is our Game. 
          </p>
          <p className="text-lg md:text-xl">
          One of our professional coaches will come to your home for a peaceful assisted stretch session. 
          </p>
          </div>
      </div>
    </div>
  );
}
