import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../shared/small/Button";
import { FaXmark } from "react-icons/fa6";

// Helper function to convert hex to rgba with opacity
const convertHexToRgba = (hex, opacity) => {
  const cleanHex = hex.replace("#", "");
  const bigint = parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const ShowCanvasData = ({ image, polygons, view, heatmap = false }) => {
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

      if (heatmap) {
        // Draw heatmap-style polygons
        polygons.forEach((polygon) => {
          if (!polygon || !polygon.points) return;

          // Calculate the center of the polygon
          const centerX =
            polygon.points.reduce((sum, p) => sum + p.x, 0) /
            polygon.points.length;
          const centerY =
            polygon.points.reduce((sum, p) => sum + p.y, 0) /
            polygon.points.length;

          // Define gradient size based on polygon's intensity or a default radius
          const radius = polygon.radius || 50; // Default radius if not provided

          // Create radial gradient with polygon color in the center and yellow at the edges
          const gradient = ctx.createRadialGradient(
            centerX,
            centerY,
            0,
            centerX,
            centerY,
            radius
          );

          // Set color stops:
          // - center: polygon's color
          // - outer edge: semi-transparent yellow for blur effect
          gradient.addColorStop(0, polygon.fillColor || "red"); // Center with the polygon color
          gradient.addColorStop(1, "rgba(255, 255, 0, 0.3)"); // Outer edges with semi-transparent yellow for blur effect

          // Draw the gradient
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
          ctx.fillStyle = gradient;
          ctx.fill();
        });
      } else {
        // Draw normal polygons
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
          canvas.addEventListener("click", (e) =>
            handlePolygonClick(e, polygon)
          );

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
      }
    };
    img.src = image;

    return () => {
      canvas.removeEventListener("click", handlePolygonClick);
    };
  }, [image, polygons, heatmap]);
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
          className={`absolute  ${
            view === "building-view"
              ? "bg-[#929292] text-white"
              : "bg-primary-lightBlue text-white"
          } p-4 shadow-xl rounded-md w-[300px]`}
          style={{
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {view === "building-view" ? (
            <div>
              <div className="flex justify-between items-center">
                <h6 className="text-2xl font-bold text-center  grow">
                  Floor Details
                </h6>
                <FaXmark
                  fontSize={25}
                  className="cursor-pointer"
                  onClick={() => setSelectedPolygon(null)}
                />
              </div>
              <div className="my-4 space-y-2">
                <h6 className="text-lg font-bold">Sensors List:</h6>
                <ul className="text-sm my-1 space-y-2">
                  <li className="list-disc ml-4">
                    <span className="font-bold text-base">
                      Floor Temperature:
                    </span>{" "}
                    20° C
                  </li>
                  <li className="list-disc ml-4">
                    {" "}
                    <span className="font-bold text-base">CO2:</span> 12 ppm
                  </li>
                  <li className="list-disc ml-4">
                    <span className="font-bold text-base">Occupancy:</span> 20°
                    C
                  </li>
                  <li className="list-disc ml-4">
                    <span className="font-bold text-base">Energy:</span> 21 kWh
                  </li>
                </ul>
                <p className="text-lg mt-3 font-bold">Total sensors: 12</p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  text="Go to Floor"
                  // onClick={() => navigate(`/dashboard/floor-view/`)}
                />
              </div>
            </div>
          ) : (
            <div>
              <h6 className="text-xl font-bold text-center">Sensor Details</h6>
              <div className="my-4 space-y-2">
                <h6 className="text-base">
                  <span className="font-bold text-base">Sensor Name:</span>{" "}
                  Sensor one
                </h6>
                <p className="text-base">
                  <span className="font-bold text-base">CO2:</span> 23 ppm
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-white hover:bg-[#a5a5a5] hover:text-white px-4 py-1 rounded-md text-primary-lightBlue font-semibold w-full transition-all "
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
