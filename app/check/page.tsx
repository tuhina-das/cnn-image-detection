"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaImage } from "react-icons/fa";

const Check = () => {
  const [results, setResults] = useState<{ similarity: number; url: string }[]>(
    []
  );

  useEffect(() => {
    const storedResults = localStorage.getItem("compareResults");
    if (storedResults) {
      try {
        const parsedResults = JSON.parse(storedResults);
        setResults(parsedResults);
      } catch (e) {
        console.error("Error parsing results:", e);
      }
    }

    const img = localStorage.getItem("uploadedImage");
    const previewImg = document.getElementById(
      "preview"
    ) as HTMLImageElement | null;

    if (img && previewImg) {
      previewImg.src = img;
    }
  }, []);

  return (
    <>
      <title>Your Image Search Results...</title>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">
            Has Your Work Been Stolen Online?
          </h1>
          <p className="text-lg my-[3vh]">
            Click on each image in the results section to see a percentage
            match.
          </p>

          <div className="flex flex-row gap-4 p-5 bg-white w-[50vw] min-h-[50vh] mx-auto mt-6 mb-10 rounded md shadow-sm">
            {/* Uploaded Image */}
            <div className="w-1/2">
              <h2 className="text-xl text-black font-semibold mb-2 text-center flex items-center justify-center gap-2">
                <FaImage className="text-black" /> Your Image
              </h2>
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg min-h-[40vh] mb-[2vh]">
                <img id="preview" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Results Section */}
            <div className="w-1/2">
              <h2 className="text-xl text-black font-semibold mb-2 text-center flex items-center justify-center gap-2">
                Images We Found
              </h2>
              <div className="p-4 border-2 border-gray-300 rounded-lg min-h-[40vh] max-h-[40vh] overflow-y-auto">
                <div className="grid grid-cols-3 gap-2">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className="relative group w-full aspect-square bg-gray-100 rounded-md overflow-hidden hover:scale-105 transition-transform duration-200"
                    >
                      <img
                        src={result.url}
                        alt={`Result ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-sm font-medium text-center p-2">
                        {Math.round(result.similarity * 100)}% match
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Check;
