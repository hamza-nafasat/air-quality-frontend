import React, { useEffect, useRef, useState } from "react";

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
  const canvasRef = useRef(null);
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

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
          const radius = polygon.radius || 60; // Default radius if not provided

          // Create radial gradient
          const gradient = ctx.createRadialGradient(
            centerX,
            centerY,
            0,
            centerX,
            centerY,
            radius
          );
          gradient.addColorStop(0, `${polygon.fillColor || "red"}`);
          gradient.addColorStop(1, `${polygon.fillColor || "red"}00`); // Transparent at edges

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
          className="absolute bg-white p-4 shadow-lg rounded-md w-[300px]"
          style={{
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <h6 className="text-base font-semibold text-center">Details</h6>
          <p className="text-sm">ID: {selectedPolygon.id}</p>
        </div>
      )}
    </div>
  );
};

export default ShowCanvasData;
