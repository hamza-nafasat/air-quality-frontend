import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Helper function to convert hex to rgba with opacity
const convertHexToRgba = (hex, opacity) => {
  const cleanHex = hex.replace("#", "");
  const bigint = parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const ShowHeatmapData = ({ image, polygons, view }) => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  console.log("polygons", polygons);

  // Function to handle polygon click detection
  const handlePolygonClick = (e, polygon) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Get the context and begin a path for the polygon
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(polygon.points[0].x, polygon.points[0].y);
    polygon.points.forEach((point) => ctx.lineTo(point.x, point.y));
    ctx.closePath();

    // Check if the click is inside the polygon path
    const isInside = ctx.isPointInPath(mouseX, mouseY);
    if (isInside) {
      setSelectedPolygon(polygon); // Set selected polygon to display in the popup

      // Calculate the position for the popup near the polygon
      const { x, y } = polygon.points[0]; // Take the first point of the polygon
      const padding = 10; // Adjust padding from the polygon
      setPopupPosition({
        top: y + padding, // Position the popup just below the polygon
        left: x + padding, // Position the popup just to the right of the polygon
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Clear the canvas and draw the image as background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw each polygon
      polygons.forEach((polygon) => {
        if (!polygon || !polygon.points) return;

        ctx.save(); // Save canvas state

        // Apply blur and semi-transparent effect
        ctx.filter = "blur(8px)"; // Adjust blur intensity (e.g., 4px, 8px, etc.)
        ctx.globalAlpha = 0.7; // Adjust opacity (range 0 to 1)

        // Draw the polygon
        ctx.beginPath();
        ctx.moveTo(polygon.points[0].x, polygon.points[0].y);
        polygon.points.forEach((point) => ctx.lineTo(point.x, point.y));
        ctx.closePath();

        // Fill polygon with blur effect
        ctx.fillStyle = polygon.fillColor
          ? convertHexToRgba(polygon.fillColor, 0.5)
          : "rgba(255, 255, 255, 0.5)";
        ctx.fill();

        // Remove blur for the stroke
        ctx.filter = "none";
        ctx.globalAlpha = 1;

        // Draw polygon border
        ctx.strokeStyle = polygon.color || "#000000";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore(); // Restore canvas state
      });
    };
    img.src = image;

    // Cleanup event listener when the component is unmounted
    return () => {
      canvas.removeEventListener("click", handlePolygonClick);
    };
  }, [image, polygons]);

  return (
    <div style={{ position: "relative" }}>
      <canvas
        width={800}
        height={500}
        ref={canvasRef}
        className="border border-primary-lightBlue border-dashed bg-[#03a5e010] rounded-lg"
      />
      {selectedPolygon && (
        <div
          className="absolute bg-white p-4 shadow-lg rounded-md w-[300px]"
          style={{
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {view === "building-view" ? (
            <div>
              <h6 className="text-base font-semibold text-center">
                Floor Details
              </h6>
              <div className="my-4">
                <h6 className="text-sm font-medium">Sensors List:</h6>
                <ul className="text-sm my-1">
                  <li className="list-disc text-gray-700 ml-4">
                    Floor Temperature: 20° C
                  </li>
                  <li className="list-disc text-gray-700 ml-4">CO2: 12 ppm</li>
                  <li className="list-disc text-gray-700 ml-4">
                    Occupancy: 20° C
                  </li>
                  <li className="list-disc text-gray-700 ml-4">
                    Energy: 21 kWh
                  </li>
                </ul>
                <p className="text-sm mt-3">Total sensors: 12</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  className="bg-primary-lightBlue px-4 py-1 rounded-md text-white font-semibold w-full"
                  // onClick={() => navigate(`/dashboard/floor-view/`)}
                >
                  Go to Floor
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md text-white font-semibold w-full"
                  onClick={() => setSelectedPolygon(null)}
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h6 className="text-base font-semibold text-center">
                Sensor Details
              </h6>
              <div className="my-4">
                <h6 className="text-sm">Sensor name: Sensor one</h6>
                <p className="text-sm">CO2: 23 ppm</p>
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md text-white font-semibold w-full"
                  onClick={() => setSelectedPolygon(null)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowHeatmapData;
