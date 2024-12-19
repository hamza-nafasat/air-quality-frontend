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

const ShowCanvasData = ({ image, polygons, view }) => {
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

        ctx.beginPath();
        ctx.moveTo(polygon.points[0].x, polygon.points[0].y);
        polygon.points.forEach((point) => ctx.lineTo(point.x, point.y));
        ctx.closePath();

        // Fill polygon with a semi-transparent color
        ctx.fillStyle = polygon.fillColor
          ? convertHexToRgba(polygon.fillColor, 0.5)
          : "rgba(255, 255, 255, 0.5)";
        ctx.fill();

        // Draw border of the polygon
        ctx.strokeStyle = polygon.color || "#000000";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Add event listener for the polygon click detection
        canvas.addEventListener("click", (e) => handlePolygonClick(e, polygon));

        // Draw label for the polygon (ID)
        const labelX = polygon.points[0]?.x;
        const labelY = polygon.points[0]?.y - 10;
        if (labelX && labelY) {
          const padding = 5;
          const text = polygon.id;
          ctx.font = "12px Arial";
          const textWidth = ctx.measureText(text).width;
          const textHeight = 14;
          const boxWidth = textWidth + padding * 2;
          const boxHeight = textHeight + padding * 2;
          const boxX = labelX - padding;
          const boxY = labelY - textHeight - padding;

          // Draw label box background
          ctx.fillStyle = "#FFFFFF";
          ctx.beginPath();
          ctx.moveTo(boxX + 4, boxY);
          ctx.arcTo(
            boxX + boxWidth,
            boxY,
            boxX + boxWidth,
            boxY + boxHeight,
            4
          );
          ctx.arcTo(
            boxX + boxWidth,
            boxY + boxHeight,
            boxX,
            boxY + boxHeight,
            4
          );
          ctx.arcTo(boxX, boxY + boxHeight, boxX, boxY, 4);
          ctx.arcTo(boxX, boxY, boxX + boxWidth, boxY, 4);
          ctx.closePath();
          ctx.fill();

          // Draw the polygon ID inside the label box
          ctx.fillStyle = "#000000";
          ctx.fillText(text, boxX + padding, boxY + padding + textHeight - 4);
        }
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

export default ShowCanvasData;
