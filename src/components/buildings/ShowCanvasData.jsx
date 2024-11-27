import React, { useEffect, useRef } from 'react'

const showDrawCanvas = ({ canvasRef, image, polygons }) => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the image as a background
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Draw polygons
    polygons.forEach((polygon) => {
      if (!polygon || !polygon.points) return;

      // Start drawing the polygon
      ctx.beginPath();
      ctx.moveTo(polygon.points[0].x, polygon.points[0].y);
      polygon.points.forEach((point) => ctx.lineTo(point.x, point.y));
      ctx.closePath();

      // Fill the polygon with the `fillColor`
      ctx.fillStyle = polygon?.fillColor;
      ctx.fill();

      // Draw the border using the `color`
      ctx.strokeStyle = polygon?.color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw label box with ID
      let labelX, labelY;

      // Set label position based on `labelPoint`
      if (polygon.labelPoint === "first" && polygon.points[0]) {
        labelX = polygon.points[0].x;
        labelY = polygon.points[0].y - 10;
      } else if (polygon.labelPoint === "second" && polygon.points[1]) {
        labelX = polygon.points[1].x;
        labelY = polygon.points[1].y - 10;
      } else if (polygon.labelPoint === "third" && polygon.points[2]) {
        labelX = polygon.points[2].x;
        labelY = polygon.points[2].y - 10;
      } else if (polygon.labelPoint === "fourth" && polygon.points[3]) {
        labelX = polygon.points[3].x;
        labelY = polygon.points[3].y - 10;
      }

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
        ctx.arcTo(boxX + boxWidth, boxY, boxX + boxWidth, boxY + boxHeight, 4);
        ctx.arcTo(boxX + boxWidth, boxY + boxHeight, boxX, boxY + boxHeight, 4);
        ctx.arcTo(boxX, boxY + boxHeight, boxX, boxY, 4);
        ctx.arcTo(boxX, boxY, boxX + boxWidth, boxY, 4);
        ctx.closePath();
        ctx.fill();

        // Draw the ID text inside the box
        ctx.fillStyle = "#000000";
        ctx.fillText(text, boxX + padding, boxY + padding + textHeight - 4);
      }
    });
  };

  img.src = image;
};



const ShowCanvasData = ({image, polygons}) => {
    const canvasRef = useRef(null);
    // console.log('showcanvasdata', image, polygons)
    useEffect(() => {
      showDrawCanvas({
            canvasRef,
            image,
            polygons,
          });
      }, [image, polygons, canvasRef]);
  return (
    <div>
        <canvas
        width={800}
        height={500}
        ref={canvasRef}
        className="border border-primary-lightBlue border-dashed bg-[#03a5e010] rounded-lg"
      />
    </div>
  )
}

export default ShowCanvasData