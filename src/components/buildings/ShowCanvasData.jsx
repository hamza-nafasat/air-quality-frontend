// import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Button from '../shared/small/Button';
// import { FaXmark } from 'react-icons/fa6';
// import { IoCloseCircle } from 'react-icons/io5';
// import RingMeter from './utils/RingMeter';

// // Helper function to convert hex to rgba with opacity
// const convertHexToRgba = (hex, opacity) => {
//   const cleanHex = hex.replace('#', '');
//   const bigint = parseInt(cleanHex, 16);
//   const r = (bigint >> 16) & 255;
//   const g = (bigint >> 8) & 255;
//   const b = bigint & 255;
//   return `rgba(${r}, ${g}, ${b}, ${opacity})`;
// };

// // Function to get heatmap gradient colors based on temperature
// const getHeatmapColor = (tempValue) => {
//   if (typeof tempValue !== 'number') return 'rgba(200,200,200,0.6)'; // gray for invalid

//   // Create gradient colors similar to your RingMeter but as rgba
//   if (tempValue >= 40) return 'rgba(220, 38, 127, 0.7)'; // hot pink/red
//   if (tempValue >= 35) return 'rgba(239, 68, 68, 0.7)'; // red-600
//   if (tempValue >= 30) return 'rgba(249, 115, 22, 0.7)'; // orange-500
//   if (tempValue >= 25) return 'rgba(234, 179, 8, 0.7)'; // yellow-400
//   if (tempValue >= 20) return 'rgba(163, 230, 53, 0.7)'; // lime-400
//   if (tempValue >= 15) return 'rgba(74, 222, 128, 0.7)'; // green-400
//   if (tempValue >= 10) return 'rgba(34, 197, 94, 0.7)'; // green-500
//   return 'rgba(21, 128, 61, 0.7)'; // green-700 for very cold
// };

// // Function to create gradient fill
// const createGradientFill = (ctx, centerX, centerY, radius, tempValue) => {
//   const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);

//   if (typeof tempValue !== 'number') {
//     gradient.addColorStop(0, 'rgba(200,200,200,0.8)');
//     gradient.addColorStop(1, 'rgba(150,150,150,0.3)');
//     return gradient;
//   }

//   // Create heat gradient from center to edge
//   if (tempValue >= 40) {
//     gradient.addColorStop(0, 'rgba(220, 38, 127, 0.9)'); // hot center
//     gradient.addColorStop(0.6, 'rgba(239, 68, 68, 0.7)');
//     gradient.addColorStop(1, 'rgba(249, 115, 22, 0.4)'); // cooler edge
//   } else if (tempValue >= 35) {
//     gradient.addColorStop(0, 'rgba(239, 68, 68, 0.9)');
//     gradient.addColorStop(0.6, 'rgba(249, 115, 22, 0.7)');
//     gradient.addColorStop(1, 'rgba(234, 179, 8, 0.4)');
//   } else if (tempValue >= 30) {
//     gradient.addColorStop(0, 'rgba(249, 115, 22, 0.9)');
//     gradient.addColorStop(0.6, 'rgba(234, 179, 8, 0.7)');
//     gradient.addColorStop(1, 'rgba(163, 230, 53, 0.4)');
//   } else if (tempValue >= 25) {
//     gradient.addColorStop(0, 'rgba(234, 179, 8, 0.9)');
//     gradient.addColorStop(0.6, 'rgba(163, 230, 53, 0.7)');
//     gradient.addColorStop(1, 'rgba(74, 222, 128, 0.4)');
//   } else if (tempValue >= 20) {
//     gradient.addColorStop(0, 'rgba(163, 230, 53, 0.9)');
//     gradient.addColorStop(0.6, 'rgba(74, 222, 128, 0.7)');
//     gradient.addColorStop(1, 'rgba(34, 197, 94, 0.4)');
//   } else {
//     gradient.addColorStop(0, 'rgba(74, 222, 128, 0.9)');
//     gradient.addColorStop(0.6, 'rgba(34, 197, 94, 0.7)');
//     gradient.addColorStop(1, 'rgba(21, 128, 61, 0.4)');
//   }

//   return gradient;
// };

// // Helper function to generate random destructured/irregular shapes
// const generateRandomShape = (basePolygon, tempValue) => {
//   // Calculate center point of the original polygon
//   const centerX =
//     basePolygon.points.reduce((sum, point) => sum + point.x, 0) / basePolygon.points.length;
//   const centerY =
//     basePolygon.points.reduce((sum, point) => sum + point.y, 0) / basePolygon.points.length;

//   // Base size influenced by temperature (hotter = larger) with more randomness
//   const baseSize = 25 + (tempValue || 0) * 2;
//   const randomSize = baseSize + Math.random() * 30;

//   // Create random number of points (between 5-12 for irregular shapes)
//   const numPoints = Math.floor(Math.random() * 8) + 5;
//   const points = [];

//   // Generate irregular points around the center
//   for (let i = 0; i < numPoints; i++) {
//     const angle = i * (360 / numPoints) * (Math.PI / 180);

//     // Add significant randomness to radius and angle for destructured look
//     const radiusVariation = 0.3 + Math.random() * 0.7; // 30% to 100% of base radius
//     const radius = (randomSize / 2) * radiusVariation;

//     // Add angle variation for more organic/destructured shape
//     const angleVariation = (Math.random() - 0.5) * 0.8; // ±40% angle variation
//     const finalAngle = angle + angleVariation;

//     // Add some noise to make it more irregular
//     const noiseX = (Math.random() - 0.5) * 15;
//     const noiseY = (Math.random() - 0.5) * 15;

//     points.push({
//       x: centerX + radius * Math.cos(finalAngle) + noiseX,
//       y: centerY + radius * Math.sin(finalAngle) + noiseY,
//     });
//   }

//   return {
//     type: 'irregular',
//     centerX,
//     centerY,
//     radius: randomSize / 2,
//     points,
//   };
// };

// // Helper function to draw irregular shapes with gradient
// const drawIrregularShape = (ctx, shape, tempValue, strokeColor) => {
//   if (shape.points.length < 3) return;

//   ctx.beginPath();
//   ctx.moveTo(shape.points[0].x, shape.points[0].y);

//   // Create smooth curves between points for more organic look
//   for (let i = 1; i < shape.points.length; i++) {
//     const currentPoint = shape.points[i];
//     const nextPoint = shape.points[(i + 1) % shape.points.length];

//     // Use quadratic curves for smoother, more organic edges
//     const controlX = (currentPoint.x + nextPoint.x) / 2 + (Math.random() - 0.5) * 10;
//     const controlY = (currentPoint.y + nextPoint.y) / 2 + (Math.random() - 0.5) * 10;

//     ctx.quadraticCurveTo(controlX, controlY, currentPoint.x, currentPoint.y);
//   }

//   // Close the path back to start
//   ctx.closePath();

//   // Create and apply gradient fill
//   const gradient = createGradientFill(ctx, shape.centerX, shape.centerY, shape.radius, tempValue);
//   ctx.fillStyle = gradient;
//   ctx.fill();

//   // Add border with slight transparency
//   // ctx.strokeStyle = strokeColor || 'rgba(0,0,0,0.3)';
//   // ctx.lineWidth = 1.5;
//   ctx.stroke();
// };

// const ShowCanvasData = ({ image, polygons, view, heatmap = false, data = [] }) => {
//   const navigate = useNavigate();
//   const canvasRef = useRef(null);
//   const [selectedPolygon, setSelectedPolygon] = useState(null);
//   const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
//   console.log('polygons', polygons);

//   // Function to handle polygon click detection
//   const handlePolygonClick = (e, polygon) => {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const mouseX = e.clientX - rect.left;
//     const mouseY = e.clientY - rect.top;

//     // Get the context and begin a path for the polygon
//     const ctx = canvas.getContext('2d');
//     ctx.beginPath();
//     ctx.moveTo(polygon.points[0].x, polygon.points[0].y);
//     polygon.points.forEach((point) => ctx.lineTo(point.x, point.y));
//     ctx.closePath();

//     // Check if the click is inside the polygon path
//     const isInside = ctx.isPointInPath(mouseX, mouseY);
//     if (isInside) {
//       setSelectedPolygon(polygon); // Set selected polygon to display in the popup

//       // Calculate the position for the popup near the polygon
//       const { x, y } = polygon.points[0]; // Take the first point of the polygon
//       const padding = 10; // Adjust padding from the polygon
//       setPopupPosition({
//         top: y + padding, // Position the popup just below the polygon
//         left: x + padding, // Position the popup just to the right of the polygon
//       });
//     }
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');

//     // Clear the canvas and draw the image as background
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     const img = new Image();
//     img.onload = () => {
//       ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

//       if (heatmap) {
//         polygons
//           .filter((polygon) =>
//             polygon?.sensorAttached?.latestValues?.some((val) => val.parameter === 'temperature')
//           )
//           .forEach((polygon) => {
//             if (!polygon || !polygon.points) return;

//             const tempValue = polygon.sensorAttached.latestValues.find(
//               (v) => v.parameter === 'temperature'
//             )?.value;

//             // Generate random irregular shape
//             const randomShape = generateRandomShape(polygon, tempValue);

//             // Draw the irregular shape with gradient
//             drawIrregularShape(ctx, randomShape, tempValue, polygon.color);

//             // Click detection for irregular shapes
//             canvas.addEventListener('click', (e) => {
//               const rect = canvas.getBoundingClientRect();
//               const mouseX = e.clientX - rect.left;
//               const mouseY = e.clientY - rect.top;

//               // Check if click is within the irregular shape bounds
//               ctx.beginPath();
//               ctx.moveTo(randomShape.points[0].x, randomShape.points[0].y);
//               randomShape.points.forEach((point) => ctx.lineTo(point.x, point.y));
//               ctx.closePath();
//               const isInside = ctx.isPointInPath(mouseX, mouseY);

//               if (isInside) {
//                 setSelectedPolygon(polygon);

//                 // Position popup at shape center
//                 const padding = 10;
//                 setPopupPosition({
//                   top: randomShape.centerY + padding,
//                   left: randomShape.centerX + padding,
//                 });
//               }
//             });

//             // Label with ID + temperature (positioned at shape center)
//             const labelX = randomShape.centerX;
//             const labelY = randomShape.centerY - 15;

//             if (labelX && labelY) {
//               const padding = 4;
//               const text = `${polygon.id} (${tempValue ?? 'N/A'}°C)`;
//               ctx.font = 'bold 11px Arial';
//               const textWidth = ctx.measureText(text).width;
//               const textHeight = 12;
//               const boxWidth = textWidth + padding * 2;
//               const boxHeight = textHeight + padding * 2;
//               const boxX = labelX - boxWidth / 2;
//               const boxY = labelY - textHeight - padding;

//               // Draw label box background with slight transparency
//               ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
//               ctx.beginPath();
//               ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 3);
//               ctx.fill();

//               // Add subtle border to label
//               ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
//               ctx.lineWidth = 1;
//               ctx.stroke();

//               // Draw text with better contrast
//               ctx.fillStyle = '#1a1a1a';
//               ctx.fillText(text, boxX + padding, boxY + padding + textHeight - 2);
//             }
//           });
//       } else {
//         // Draw normal polygons
//         polygons.forEach((polygon) => {
//           if (!polygon || !polygon.points) return;

//           ctx.beginPath();
//           ctx.moveTo(polygon.points[0].x, polygon.points[0].y);
//           polygon.points.forEach((point) => ctx.lineTo(point.x, point.y));
//           ctx.closePath();

//           // Fill polygon with a semi-transparent color
//           ctx.fillStyle = polygon.fillColor
//             ? convertHexToRgba(polygon.fillColor, 0.5)
//             : 'rgba(255, 255, 255, 0.5)';
//           ctx.fill();

//           // Draw border of the polygon
//           ctx.strokeStyle = polygon.color || '#000000';
//           ctx.lineWidth = 2;
//           ctx.stroke();
//           // Add event listener for the polygon click detection
//           canvas.addEventListener('click', (e) => handlePolygonClick(e, polygon));

//           // Draw label for the polygon (ID)
//           const labelX = polygon.points[0]?.x;
//           const labelY = polygon.points[0]?.y - 10;
//           if (labelX && labelY) {
//             const padding = 5;
//             const text = polygon.id;
//             ctx.font = '12px Arial';
//             const textWidth = ctx.measureText(text).width;
//             const textHeight = 14;
//             const boxWidth = textWidth + padding * 2;
//             const boxHeight = textHeight + padding * 2;
//             const boxX = labelX - padding;
//             const boxY = labelY - textHeight - padding;

//             // Draw label box background
//             ctx.fillStyle = '#FFFFFF';
//             ctx.beginPath();
//             ctx.moveTo(boxX + 4, boxY);
//             ctx.arcTo(boxX + boxWidth, boxY, boxX + boxWidth, boxY + boxHeight, 4);
//             ctx.arcTo(boxX + boxWidth, boxY + boxHeight, boxX, boxY + boxHeight, 4);
//             ctx.arcTo(boxX, boxY + boxHeight, boxX, boxY, 4);
//             ctx.arcTo(boxX, boxY, boxX + boxWidth, boxY, 4);
//             ctx.closePath();
//             ctx.fill();

//             // Draw the polygon ID inside the label box
//             ctx.fillStyle = '#000000';
//             ctx.fillText(text, boxX + padding, boxY + padding + textHeight - 4);
//           }
//         });
//       }
//     };
//     img.src = image;

//     return () => {
//       canvas.removeEventListener('click', handlePolygonClick);
//     };
//   }, [image, polygons, heatmap]);

//   return (
//     <div style={{ position: 'relative' }}>
//       <canvas
//         width={800}
//         height={500}
//         ref={canvasRef}
//         className="border border-primary-lightBlue border-dashed bg-[#03a5e010] rounded-lg"
//       />
//       {/* Render RingMeter at the center of each heatmap polygon */}

//       {selectedPolygon && (
//         <div
//           className={`absolute  ${
//             view === 'building-view' ? 'bg-[#929292] text-white' : 'bg-[#03A5E0] text-white'
//           } pt-3 shadow-xl rounded-xl w-[300px]`}
//           style={{
//             top: `${popupPosition.top}px`,
//             left: `${popupPosition.left}px`,
//             transform: 'translate(-50%, -50%)',
//           }}
//         >
//           <div className="bg-white rounded-br-xl p-5 rounded-bl-xl">
//             {view === 'building-view' ? (
//               <div>
//                 <div className="flex justify-between items-center">
//                   <h6 className="text-2xl font-bold text-center  grow">Floor Details</h6>
//                   <FaXmark
//                     fontSize={25}
//                     className="cursor-pointer"
//                     onClick={() => setSelectedPolygon(null)}
//                   />
//                 </div>
//                 <div className="my-4 space-y-2">
//                   <h6 className="text-lg font-bold">Sensors List:</h6>
//                   <ul className="text-sm my-1 space-y-2">
//                     <li className="list-disc ml-4">
//                       <span className="font-bold text-base">Floor Temperature:</span> 20° C
//                     </li>
//                     <li className="list-disc ml-4">
//                       {' '}
//                       <span className="font-bold text-base">CO2:</span> 12 ppm
//                     </li>
//                     <li className="list-disc ml-4">
//                       <span className="font-bold text-base">Occupancy:</span> 20° C
//                     </li>
//                     <li className="list-disc ml-4">
//                       <span className="font-bold text-base">Energy:</span> 21 kWh
//                     </li>
//                   </ul>
//                   <p className="text-lg mt-3 font-bold">Total sensors: 12</p>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <Button
//                     text="Go to Floor"
//                     // onClick={() => navigate(`/dashboard/floor-view/`)}
//                   />
//                 </div>
//               </div>
//             ) : (
//               <div className="">
//                 <div className="flex  h-12 w-full  items-center justify-between">
//                   <div>
//                     <h6 className="text-xl text-black font-bold text-center">Sensor Details</h6>
//                   </div>
//                   <div
//                     className=" rounded-full cursor-pointer"
//                     onClick={() => setSelectedPolygon(null)}
//                   >
//                     <IoCloseCircle className="font-bold text-black text-2xl" />
//                   </div>
//                 </div>
//                 <div className="my-4 p-3 gap-3 bg-[#03A5E01A]/10 rounded-md space-y-2">
//                   <h6 className="text-lg text-black font-bold text-center">
//                     {selectedPolygon?.sensorAttached?.name}
//                   </h6>
//                   {selectedPolygon?.sensorAttached?.latestValues?.map((item) => {
//                     const unitMap = {
//                       temperature: '°C',
//                       humidity: '%',
//                       co2: 'ppm',
//                       co: 'ppm',
//                       ch: 'ppm',
//                       tvoc: 'μg/m³',
//                     };

//                     return (
//                       <div className="flex items-center justify-between" key={item.parameter}>
//                         <div>
//                           <h6 className="text-sm font-medium capitalize text-black">
//                             {item?.parameter}
//                           </h6>
//                         </div>
//                         <div>
//                           <h6 className="text-black">
//                             {item.value} {unitMap[item.parameter] || ''}
//                           </h6>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <div className="flex pb-3 items-center justify-center">
//                   <button
//                     className="bg-white  border-2 border-[#03A5E0] hover:bg-[#a5a5a5] hover:text-white px-4 py-1 rounded-md text-primary-lightBlue font-semibold transition-all "
//                     // onClick={() => setSelectedPolygon(null)}
//                     onClick={() =>
//                       navigate(
//                         `/dashboard/sensors/sensor-detail/${selectedPolygon?.sensorAttached?._id}`
//                       )
//                     }
//                   >
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShowCanvasData;

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../shared/small/Button';
import { FaXmark } from 'react-icons/fa6';
import { IoCloseCircle } from 'react-icons/io5';
import RingMeter from './utils/RingMeter';

// Helper function to convert hex to rgba with opacity
const convertHexToRgba = (hex, opacity) => {
  const cleanHex = hex.replace('#', '');
  const bigint = parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Function to get heatmap gradient colors based on temperature

// Function to create gradient fill based on level: 'Low' | 'Medium' | 'High'
// For 'Medium', if baseColor is provided (e.g., polygon.color), use it as the gradient color
const createGradientFill = (ctx, centerX, centerY, radius, level, baseColor) => {
  const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);

  const levels = {
    Low: ['rgba(59, 130, 246, 0.6)', 'rgba(59, 130, 246, 0.25)', 'rgba(59, 130, 246, 0)'],
    Medium: ['rgba(34, 197, 94, 0.6)', 'rgba(34, 197, 94, 0.25)', 'rgba(34, 197, 94, 0)'],
    High: ['rgba(239, 68, 68, 0.6)', 'rgba(239, 68, 68, 0.25)', 'rgba(239, 68, 68, 0)'],
  };

  let c0;
  let c1;
  let c2;
  if (level === 'Medium' && baseColor) {
    // Use polygon-specific color for Medium level, fading to transparent
    try {
      c0 = convertHexToRgba(baseColor, 0.6);
      c1 = convertHexToRgba(baseColor, 0.25);
      c2 = convertHexToRgba(baseColor, 0.0);
    } catch (e) {
      [c0, c1, c2] = levels.Medium;
    }
  } else {
    [c0, c1, c2] = levels[level] || levels.Medium;
  }
  gradient.addColorStop(0, c0);
  gradient.addColorStop(0.6, c1);
  // subtle warm halo for heatmap feel near the outer edge
  gradient.addColorStop(0.85, 'rgba(250, 204, 21, 0.18)');
  gradient.addColorStop(1, c2);
  return gradient;
};

// Helper function to generate random destructured/irregular shapes
const generateRandomShape = (basePolygon) => {
  // Calculate center point of the original polygon
  const centerX =
    basePolygon.points.reduce((sum, point) => sum + point.x, 0) / basePolygon.points.length;
  const centerY =
    basePolygon.points.reduce((sum, point) => sum + point.y, 0) / basePolygon.points.length;

  // Fixed size for all shapes
  const fixedDiameter = 200; // px
  const randomSize = fixedDiameter;

  // Create random number of points (between 5-12 for irregular shapes)
  const numPoints = Math.floor(Math.random() * 9) + 16; // 16-24 points for smoother outline
  const points = [];

  // Generate irregular points around the center
  for (let i = 0; i < numPoints; i++) {
    const angle = i * (360 / numPoints) * (Math.PI / 180);

    // Add significant randomness to radius and angle for destructured look
    const radiusVariation = 0.6 + Math.random() * 0.5; // 60% to 100% of base radius for less spikiness
    const radius = (randomSize / 2) * radiusVariation;

    // Add angle variation for more organic/destructured shape
    const angleVariation = (Math.random() - 0.5) * 0.3; // ±15% angle variation for smoother edges
    const finalAngle = angle + angleVariation;

    // Add some noise to make it more irregular
    const noiseX = (Math.random() - 0.5) * 4;
    const noiseY = (Math.random() - 0.5) * 4;

    points.push({
      x: centerX + radius * Math.cos(finalAngle) + noiseX,
      y: centerY + radius * Math.sin(finalAngle) + noiseY,
    });
  }

  return {
    type: 'irregular',
    centerX,
    centerY,
    radius: randomSize / 2,
    points,
  };
};

// Helper function to draw irregular shapes with gradient
const drawIrregularShape = (ctx, shape, level, strokeColor) => {
  if (shape.points.length < 3) return;

  ctx.beginPath();
  ctx.moveTo(shape.points[0].x, shape.points[0].y);

  // Create smooth curves between points for more organic look
  for (let i = 1; i < shape.points.length; i++) {
    const currentPoint = shape.points[i];
    const nextPoint = shape.points[(i + 1) % shape.points.length];

    // Use quadratic curves for smoother, more organic edges
    const controlX = (currentPoint.x + nextPoint.x) / 2 + (Math.random() - 0.5) * 10;
    const controlY = (currentPoint.y + nextPoint.y) / 2 + (Math.random() - 0.5) * 10;

    ctx.quadraticCurveTo(controlX, controlY, currentPoint.x, currentPoint.y);
  }

  // Close the path back to start
  ctx.closePath();

  // Create and apply gradient fill
  const gradient = createGradientFill(
    ctx,
    shape.centerX,
    shape.centerY,
    shape.radius,
    level,
    strokeColor
  );
  ctx.save();
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.filter = 'blur(8px)';
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.restore();

  // Inner pass without blur to add saturation back
  ctx.save();
  ctx.filter = 'none';
  ctx.globalAlpha = 0.9;
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();

  // Optional: small white hot core for High to mimic heat concentration
  if (level === 'High') {
    ctx.save();
    ctx.filter = 'blur(6px)';
    const core = ctx.createRadialGradient(
      shape.centerX,
      shape.centerY,
      0,
      shape.centerX,
      shape.centerY,
      Math.max(8, shape.radius * 0.35)
    );
    core.addColorStop(0, 'rgba(255,255,255,0.55)');
    core.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = core;
    ctx.fill();
    ctx.restore();
  }

  // Add a warm outer halo using screen blend for a heatmap glow
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  ctx.filter = 'blur(20px)';
  const halo = ctx.createRadialGradient(
    shape.centerX,
    shape.centerY,
    Math.max(0, shape.radius * 0.55),
    shape.centerX,
    shape.centerY,
    shape.radius * 1.15
  );
  halo.addColorStop(0, 'rgba(0,0,0,0)');
  halo.addColorStop(0.7, 'rgba(250, 204, 21, 0.18)');
  halo.addColorStop(1, 'rgba(250, 204, 21, 0)');
  ctx.fillStyle = halo;
  ctx.fill();
  ctx.restore();
};

const ShowCanvasData = ({ image, polygons, view, heatmap = false, data = [] }) => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  console.log('polygons', polygons);

  // Function to handle polygon click detection
  const handlePolygonClick = (e, polygon) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Get the context and begin a path for the polygon
    const ctx = canvas.getContext('2d');
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

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;

  //   const ctx = canvas.getContext('2d');

  //   // Clear the canvas and draw the image as background
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   const img = new Image();
  //   img.onload = () => {
  //     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  //     if (heatmap) {
  //       // Use normal blending so colors remain visible
  //       const previousComposite = ctx.globalCompositeOperation;
  //       ctx.globalCompositeOperation = 'source-over';

  //       // ✅ Priority order
  //       const priority = ['temperature', 'co2', 'humidity', 'tvoc', 'co', 'ch'];

  //       polygons.forEach((polygon) => {
  //         if (!polygon || !polygon.points) return;

  //         // ✅ Pick first available parameter based on priority
  //         let selectedParam = null;
  //         let selectedValue = null;

  //         if (polygon.sensorAttached?.latestValues?.length) {
  //           for (const param of priority) {
  //             const match = polygon.sensorAttached.latestValues.find(
  //               (val) => val.parameter.toLowerCase() === param
  //             );
  //             if (match) {
  //               selectedParam = param;
  //               selectedValue = match.value;
  //               break;
  //             }
  //           }
  //         }

  //         if (!selectedParam) return; // skip if polygon has none of the priority sensors

  //         // Generate random irregular shape
  //         const randomShape = generateRandomShape(polygon, selectedValue);

  //         // Draw the irregular shape with gradient
  //         drawIrregularShape(ctx, randomShape, selectedValue, polygon.color);

  //         // Click detection for irregular shapes
  //         canvas.addEventListener('click', (e) => {
  //           const rect = canvas.getBoundingClientRect();
  //           const mouseX = e.clientX - rect.left;
  //           const mouseY = e.clientY - rect.top;

  //           ctx.beginPath();
  //           ctx.moveTo(randomShape.points[0].x, randomShape.points[0].y);
  //           randomShape.points.forEach((point) => ctx.lineTo(point.x, point.y));
  //           ctx.closePath();
  //           const isInside = ctx.isPointInPath(mouseX, mouseY);

  //           if (isInside) {
  //             setSelectedPolygon(polygon);

  //             // Position popup at shape center
  //             const padding = 10;
  //             setPopupPosition({
  //               top: randomShape.centerY + padding,
  //               left: randomShape.centerX + padding,
  //             });
  //           }
  //         });

  //         // ✅ Label with ID + parameter + value
  //         const labelX = randomShape.centerX;
  //         const labelY = randomShape.centerY - 15;

  //         if (labelX && labelY) {
  //           const padding = 4;
  //           const text = `${polygon.id} (${selectedParam}: ${selectedValue ?? 'N/A'})`;
  //           ctx.font = 'bold 11px Arial';
  //           const textWidth = ctx.measureText(text).width;
  //           const textHeight = 12;
  //           const boxWidth = textWidth + padding * 2;
  //           const boxHeight = textHeight + padding * 2;
  //           const boxX = labelX - boxWidth / 2;
  //           const boxY = labelY - textHeight - padding;

  //           // Draw label box background with slight transparency
  //           ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  //           ctx.beginPath();
  //           ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 3);
  //           ctx.fill();

  //           // Border
  //           ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
  //           ctx.lineWidth = 1;
  //           ctx.stroke();

  //           // Text
  //           ctx.fillStyle = '#0f172a';
  //           ctx.fillText(text, boxX + padding, boxY + padding + textHeight - 2);
  //         }
  //       });

  //       // Restore default blending
  //       ctx.globalCompositeOperation = previousComposite;
  //     } else {
  //       // Draw normal polygons
  //       polygons.forEach((polygon) => {
  //         if (!polygon || !polygon.points) return;

  //         ctx.beginPath();
  //         ctx.moveTo(polygon.points[0].x, polygon.points[0].y);
  //         polygon.points.forEach((point) => ctx.lineTo(point.x, point.y));
  //         ctx.closePath();

  //         // Fill polygon
  //         ctx.fillStyle = polygon.fillColor
  //           ? convertHexToRgba(polygon.fillColor, 0.5)
  //           : 'rgba(255, 255, 255, 0.5)';
  //         ctx.fill();

  //         // Border
  //         ctx.strokeStyle = polygon.color || '#000000';
  //         ctx.lineWidth = 2;
  //         ctx.stroke();

  //         // Click detection
  //         canvas.addEventListener('click', (e) => handlePolygonClick(e, polygon));

  //         // Label
  //         const labelX = polygon.points[0]?.x;
  //         const labelY = polygon.points[0]?.y - 10;
  //         if (labelX && labelY) {
  //           const padding = 5;
  //           const text = polygon.id;
  //           ctx.font = '12px Arial';
  //           const textWidth = ctx.measureText(text).width;
  //           const textHeight = 14;
  //           const boxWidth = textWidth + padding * 2;
  //           const boxHeight = textHeight + padding * 2;
  //           const boxX = labelX - padding;
  //           const boxY = labelY - textHeight - padding;

  //           ctx.fillStyle = '#FFFFFF';
  //           ctx.beginPath();
  //           ctx.moveTo(boxX + 4, boxY);
  //           ctx.arcTo(boxX + boxWidth, boxY, boxX + boxWidth, boxY + boxHeight, 4);
  //           ctx.arcTo(boxX + boxWidth, boxY + boxHeight, boxX, boxY + boxHeight, 4);
  //           ctx.arcTo(boxX, boxY + boxHeight, boxX, boxY, 4);
  //           ctx.arcTo(boxX, boxY, boxX + boxWidth, boxY, 4);
  //           ctx.closePath();
  //           ctx.fill();

  //           ctx.fillStyle = '#000000';
  //           ctx.fillText(text, boxX + padding, boxY + padding + textHeight - 4);
  //         }
  //       });
  //     }
  //   };
  //   img.src = image;

  //   return () => {
  //     canvas.removeEventListener('click', handlePolygonClick);
  //   };
  // }, [image, polygons, heatmap]);
  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;

  //   const ctx = canvas.getContext('2d');

  //   // Clear and reset canvas
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);

  //   const img = new Image();
  //   img.onload = () => {
  //     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  //     if (heatmap) {
  //       const previousComposite = ctx.globalCompositeOperation;
  //       ctx.globalCompositeOperation = 'source-over';

  //       const priority = ['temperature', 'co2', 'humidity', 'tvoc', 'co', 'ch'];
  //       const labels = []; // store label info here

  //       // --- PASS 1: draw all shapes ---
  //       polygons.forEach((polygon) => {
  //         if (!polygon || !polygon.points) return;

  //         let selectedParam = null;
  //         let selectedValue = null;

  //         if (polygon.sensorAttached?.latestValues?.length) {
  //           for (const param of priority) {
  //             const match = polygon.sensorAttached.latestValues.find(
  //               (val) => val.parameter.toLowerCase() === param
  //             );
  //             if (match) {
  //               selectedParam = param;
  //               selectedValue = match.value;
  //               break;
  //             }
  //           }
  //         }

  //         if (!selectedParam) return;

  //         const randomShape = generateRandomShape(polygon, selectedValue);
  //         drawIrregularShape(ctx, randomShape, selectedValue, polygon.color);

  //         // save label info for pass 2
  //         labels.push({
  //           x: randomShape.centerX,
  //           y: randomShape.centerY - 20,
  //           text: `${polygon.id} (${selectedParam}: ${selectedValue ?? 'N/A'})`,
  //         });

  //         // click detection
  //         canvas.addEventListener('click', (e) => {
  //           const rect = canvas.getBoundingClientRect();
  //           const mouseX = e.clientX - rect.left;
  //           const mouseY = e.clientY - rect.top;

  //           ctx.beginPath();
  //           ctx.moveTo(randomShape.points[0].x, randomShape.points[0].y);
  //           randomShape.points.forEach((p) => ctx.lineTo(p.x, p.y));
  //           ctx.closePath();
  //           if (ctx.isPointInPath(mouseX, mouseY)) {
  //             setSelectedPolygon(polygon);
  //             setPopupPosition({
  //               top: randomShape.centerY + 10,
  //               left: randomShape.centerX + 10,
  //             });
  //           }
  //         });
  //       });

  //       // --- PASS 2: draw labels on top ---
  //       labels.forEach(({ x, y, text }) => {
  //         const padding = 4;
  //         ctx.font = 'bold 11px Arial';
  //         const textWidth = ctx.measureText(text).width;
  //         const textHeight = 12;
  //         const boxWidth = textWidth + padding * 2;
  //         const boxHeight = textHeight + padding * 2;
  //         const boxX = x - boxWidth / 2;
  //         const boxY = y - textHeight - padding;

  //         ctx.fillStyle = 'rgba(255,255,255,0.85)';
  //         ctx.beginPath();
  //         ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 3);
  //         ctx.fill();

  //         ctx.strokeStyle = 'rgba(0,0,0,0.25)';
  //         ctx.lineWidth = 1;
  //         ctx.stroke();

  //         ctx.fillStyle = '#0f172a';
  //         ctx.fillText(text, boxX + padding, boxY + padding + textHeight - 2);
  //       });

  //       ctx.globalCompositeOperation = previousComposite;
  //     } else {
  //       // --- normal polygon drawing (unchanged) ---
  //       polygons.forEach((polygon) => {
  //         if (!polygon || !polygon.points) return;

  //         ctx.beginPath();
  //         ctx.moveTo(polygon.points[0].x, polygon.points[0].y);
  //         polygon.points.forEach((point) => ctx.lineTo(point.x, point.y));
  //         ctx.closePath();

  //         ctx.fillStyle = polygon.fillColor
  //           ? convertHexToRgba(polygon.fillColor, 0.5)
  //           : 'rgba(255, 255, 255, 0.5)';
  //         ctx.fill();

  //         ctx.strokeStyle = polygon.color || '#000000';
  //         ctx.lineWidth = 2;
  //         ctx.stroke();

  //         canvas.addEventListener('click', (e) => handlePolygonClick(e, polygon));

  //         const labelX = polygon.points[0]?.x;
  //         const labelY = polygon.points[0]?.y - 10;
  //         if (labelX && labelY) {
  //           const padding = 5;
  //           const text = polygon.id;
  //           ctx.font = '12px Arial';
  //           const textWidth = ctx.measureText(text).width;
  //           const textHeight = 14;
  //           const boxWidth = textWidth + padding * 2;
  //           const boxHeight = textHeight + padding * 2;
  //           const boxX = labelX - padding;
  //           const boxY = labelY - textHeight - padding;

  //           ctx.fillStyle = '#FFFFFF';
  //           ctx.beginPath();
  //           ctx.moveTo(boxX + 4, boxY);
  //           ctx.arcTo(boxX + boxWidth, boxY, boxX + boxWidth, boxY + boxHeight, 4);
  //           ctx.arcTo(boxX + boxWidth, boxY + boxHeight, boxX, boxY + boxHeight, 4);
  //           ctx.arcTo(boxX, boxY + boxHeight, boxX, boxY, 4);
  //           ctx.arcTo(boxX, boxY, boxX + boxWidth, boxY, 4);
  //           ctx.closePath();
  //           ctx.fill();

  //           ctx.fillStyle = '#000000';
  //           ctx.fillText(text, boxX + padding, boxY + padding + textHeight - 4);
  //         }
  //       });
  //     }
  //   };

  //   img.src = image;

  //   return () => {
  //     canvas.removeEventListener('click', handlePolygonClick);
  //   };
  // }, [image, polygons, heatmap]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Clear and reset canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      if (heatmap) {
        const previousComposite = ctx.globalCompositeOperation;
        ctx.globalCompositeOperation = 'source-over';

        const priority = ['temperature', 'co2', 'humidity', 'tvoc', 'co', 'ch'];
        const labels = []; // store label info here

        // helper: classify Low/Medium/High
        // const classifyLevel = (param, value) => {
        //   if (value == null) return 'N/A';

        //   switch (param) {
        //     case 'temperature':
        //       if (value < 20) return 'Low';
        //       if (value < 30) return 'Medium';
        //       return 'High';
        //     case 'co2':
        //       if (value < 800) return 'Low';
        //       if (value < 1200) return 'Medium';
        //       return 'High';
        //     case 'humidity':
        //       if (value < 30) return 'Low';
        //       if (value < 60) return 'Medium';
        //       return 'High';
        //     default:
        //       if (value < 50) return 'Low';
        //       if (value < 100) return 'Medium';
        //       return 'High';
        //   }
        // };
        // helper: classify Low/Medium/High (HARD CODED RANGES)
        const classifyLevel = (param, value) => {
          if (value == null) return 'N/A';

          switch (param) {
            case 'temperature': // Celsius
              if (value < 18) return 'Low'; // < 18°C
              if (value <= 28) return 'Medium'; // 18–28°C
              return 'High'; // > 28°C

            case 'co2': // ppm
              if (value < 800) return 'Low'; // < 800 ppm
              if (value <= 1200) return 'Medium'; // 800–1200 ppm
              return 'High'; // > 1200 ppm

            case 'humidity': // %
              if (value < 30) return 'Low'; // < 30%
              if (value <= 60) return 'Medium'; // 30–60%
              return 'High'; // > 60%

            case 'tvoc': // ppb
              if (value < 200) return 'Low'; // < 200 ppb
              if (value <= 600) return 'Medium'; // 200–600 ppb
              return 'High'; // > 600 ppb

            case 'co': // ppm
              if (value < 5) return 'Low'; // < 5 ppm
              if (value <= 9) return 'Medium'; // 5–9 ppm
              return 'High'; // > 9 ppm

            case 'ch': // ppm (methane or hydrocarbons)
              if (value < 50) return 'Low'; // < 50 ppm
              if (value <= 100) return 'Medium'; // 50–100 ppm
              return 'High'; // > 100 ppm

            default: // fallback
              if (value < 50) return 'Low';
              if (value <= 100) return 'Medium';
              return 'High';
          }
        };

        // --- PASS 1: draw all shapes ---
        polygons.forEach((polygon) => {
          if (!polygon || !polygon.points) return;

          let selectedParam = null;
          let selectedValue = null;

          if (polygon.sensorAttached?.latestValues?.length) {
            for (const param of priority) {
              const match = polygon.sensorAttached.latestValues.find(
                (val) => val.parameter.toLowerCase() === param
              );
              if (match) {
                selectedParam = param;
                selectedValue = match.value;
                break;
              }
            }
          }

          if (!selectedParam) return;

          const randomShape = generateRandomShape(polygon);
          const level = classifyLevel(selectedParam, selectedValue);
          // pass polygon.color as base for Medium level gradient
          drawIrregularShape(ctx, randomShape, level, polygon.color || '#22c55e');

          // save label info for pass 2
          labels.push({
            x: randomShape.centerX,
            y: randomShape.centerY - 20,
            text: `${polygon.id} (${selectedParam}: ${selectedValue ?? 'N/A'}) - ${level}`,
          });

          // click detection
          canvas.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            ctx.beginPath();
            ctx.moveTo(randomShape.points[0].x, randomShape.points[0].y);
            randomShape.points.forEach((p) => ctx.lineTo(p.x, p.y));
            ctx.closePath();
            if (ctx.isPointInPath(mouseX, mouseY)) {
              setSelectedPolygon(polygon);
              setPopupPosition({
                top: randomShape.centerY + 10,
                left: randomShape.centerX + 10,
              });
            }
          });
        });

        // --- PASS 2: draw labels on top ---
        labels.forEach(({ x, y, text }) => {
          const padding = 4;
          ctx.font = 'bold 11px Arial';
          const textWidth = ctx.measureText(text).width;
          const textHeight = 12;
          const boxWidth = textWidth + padding * 2;
          const boxHeight = textHeight + padding * 2;
          const boxX = x - boxWidth / 2;
          const boxY = y - textHeight - padding;

          ctx.fillStyle = 'rgba(255,255,255,0.85)';
          ctx.beginPath();
          ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 3);
          ctx.fill();

          ctx.strokeStyle = 'rgba(0,0,0,0.25)';
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = '#0f172a';
          ctx.fillText(text, boxX + padding, boxY + padding + textHeight - 2);
        });

        ctx.globalCompositeOperation = previousComposite;
      } else {
        // --- normal polygon drawing (unchanged) ---
        polygons.forEach((polygon) => {
          if (!polygon || !polygon.points) return;

          ctx.beginPath();
          ctx.moveTo(polygon.points[0].x, polygon.points[0].y);
          polygon.points.forEach((point) => ctx.lineTo(point.x, point.y));
          ctx.closePath();

          ctx.fillStyle = polygon.fillColor
            ? convertHexToRgba(polygon.fillColor, 0.5)
            : 'rgba(255, 255, 255, 0.5)';
          ctx.fill();

          ctx.strokeStyle = polygon.color || '#000000';
          ctx.lineWidth = 2;
          ctx.stroke();

          canvas.addEventListener('click', (e) => handlePolygonClick(e, polygon));

          const labelX = polygon.points[0]?.x;
          const labelY = polygon.points[0]?.y - 10;
          if (labelX && labelY) {
            const padding = 5;
            const text = polygon.id;
            ctx.font = '12px Arial';
            const textWidth = ctx.measureText(text).width;
            const textHeight = 14;
            const boxWidth = textWidth + padding * 2;
            const boxHeight = textHeight + padding * 2;
            const boxX = labelX - padding;
            const boxY = labelY - textHeight - padding;

            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.moveTo(boxX + 4, boxY);
            ctx.arcTo(boxX + boxWidth, boxY, boxX + boxWidth, boxY + boxHeight, 4);
            ctx.arcTo(boxX + boxWidth, boxY + boxHeight, boxX, boxY + boxHeight, 4);
            ctx.arcTo(boxX, boxY + boxHeight, boxX, boxY, 4);
            ctx.arcTo(boxX, boxY, boxX + boxWidth, boxY, 4);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = '#000000';
            ctx.fillText(text, boxX + padding, boxY + padding + textHeight - 4);
          }
        });
      }
    };

    img.src = image;

    return () => {
      canvas.removeEventListener('click', handlePolygonClick);
    };
  }, [image, polygons, heatmap]);

  return (
    <div style={{ position: 'relative' }}>
      <canvas
        width={800}
        height={500}
        ref={canvasRef}
        className="border border-primary-lightBlue border-dashed bg-[#03a5e010] rounded-lg"
      />
      {/* Render RingMeter at the center of each heatmap polygon */}

      {selectedPolygon && (
        <div
          className={`absolute  ${
            view === 'building-view' ? 'bg-[#929292] text-white' : 'bg-[#03A5E0] text-white'
          } pt-3 shadow-xl rounded-xl w-[300px]`}
          style={{
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="bg-white rounded-br-xl p-5 rounded-bl-xl">
            {view === 'building-view' ? (
              <div>
                <div className="flex justify-between items-center">
                  <h6 className="text-2xl font-bold text-center  grow">Floor Details</h6>
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
                      <span className="font-bold text-base">Floor Temperature:</span> 20° C
                    </li>
                    <li className="list-disc ml-4">
                      {' '}
                      <span className="font-bold text-base">CO2:</span> 12 ppm
                    </li>
                    <li className="list-disc ml-4">
                      <span className="font-bold text-base">Occupancy:</span> 20° C
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
              <div className="">
                <div className="flex  h-12 w-full  items-center justify-between">
                  <div>
                    <h6 className="text-xl text-black font-bold text-center">Sensor Details</h6>
                  </div>
                  <div
                    className=" rounded-full cursor-pointer"
                    onClick={() => setSelectedPolygon(null)}
                  >
                    <IoCloseCircle className="font-bold text-black text-2xl" />
                  </div>
                </div>
                <div className="my-4 p-3 gap-3 bg-[#03A5E01A]/10 rounded-md space-y-2">
                  <h6 className="text-lg text-black font-bold text-center">
                    {selectedPolygon?.sensorAttached?.name}
                  </h6>
                  {selectedPolygon?.sensorAttached?.latestValues?.map((item) => {
                    const unitMap = {
                      temperature: '°C',
                      humidity: '%',
                      co2: 'ppm',
                      co: 'ppm',
                      ch: 'ppm',
                      tvoc: 'μg/m³',
                    };

                    return (
                      <div className="flex items-center justify-between" key={item.parameter}>
                        <div>
                          <h6 className="text-sm font-medium capitalize text-black">
                            {item?.parameter}
                          </h6>
                        </div>
                        <div>
                          <h6 className="text-black">
                            {item.value} {unitMap[item.parameter] || ''}
                          </h6>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex pb-3 items-center justify-center">
                  <button
                    className="bg-white  border-2 border-[#03A5E0] hover:bg-[#a5a5a5] hover:text-white px-4 py-1 rounded-md text-primary-lightBlue font-semibold transition-all "
                    // onClick={() => setSelectedPolygon(null)}
                    onClick={() =>
                      navigate(
                        `/dashboard/sensors/sensor-detail/${selectedPolygon?.sensorAttached?._id}`
                      )
                    }
                  >
                    View Details
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowCanvasData;
