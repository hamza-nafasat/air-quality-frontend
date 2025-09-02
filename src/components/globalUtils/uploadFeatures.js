// Handle image upload and display on the canvas
export const handleImageUpload = (event, setImageSrc, setShowCropper, setIsDrawingEnabled) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      setShowCropper(true);
      setIsDrawingEnabled(true);
    };
    reader.readAsDataURL(file);
  }
};
//  -------------------------------------------------------__start
//  Draw Canvas Content
export const drawCanvas = ({ canvasRef, isDrawingEnabled, image, polygons, currentPolygon }) => {
  const canvas = canvasRef.current;
  if (!canvas || !isDrawingEnabled) return;

  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (image) {
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  }

  polygons.forEach((polygon) => {
    if (!polygon || !polygon.points) return;

    // Start drawing polygon
    context.beginPath();
    context.moveTo(polygon.points[0].x, polygon.points[0].y);
    polygon.points.forEach((point) => context.lineTo(point.x, point.y));
    context.closePath();

    // Fill the polygon with the color
    context.fillStyle = `${polygon.color}${90}` || '#03a5e060';
    context.strokeStyle = polygon.fillColor || '#03a5e0';
    context.fill();

    // Draw the border with the specified color
    context.strokeStyle = polygon.fillColor || polygon.color || '#03a5e060';
    context.lineWidth = 2;
    context.stroke();

    // Determine the label position based on `labelPoint`
    let idX, idY;
    if (polygon?.labelPoint === 'first' && polygon.points[0]) {
      idX = polygon.points[0].x;
      idY = polygon.points[0].y - 5;
    } else if (polygon?.labelPoint === 'second' && polygon.points[1]) {
      idX = polygon.points[1].x;
      idY = polygon.points[1].y - 5;
    } else if (polygon?.labelPoint === 'third' && polygon.points[2]) {
      idX = polygon.points[2].x;
      idY = polygon.points[2].y - 5;
    } else if (polygon?.labelPoint === 'fourth' && polygon.points[3]) {
      idX = polygon.points[3].x;
      idY = polygon.points[3].y - 5;
    }

    const padding = 4;
    const text = polygon.id;

    context.font = '12px Arial';
    const textWidth = context.measureText(text).width;
    const textHeight = 14;
    const boxWidth = textWidth + padding * 2;
    const boxHeight = textHeight + padding * 2;
    const boxX = idX - padding;
    const boxY = idY - textHeight - padding;

    // Draw the box background
    context.fillStyle = '#FFFFFF';
    context.beginPath();
    context.moveTo(boxX + 4, boxY);
    context.arcTo(boxX + boxWidth, boxY, boxX + boxWidth, boxY + boxHeight, 4);
    context.arcTo(boxX + boxWidth, boxY + boxHeight, boxX, boxY + boxHeight, 4);
    context.arcTo(boxX, boxY + boxHeight, boxX, boxY, 4);
    context.arcTo(boxX, boxY, boxX + boxWidth, boxY, 4);
    context.closePath();
    context.fill();

    // Draw the text inside the box
    context.fillStyle = '#000000';
    context.fillText(text, boxX + padding, boxY + padding + textHeight - 4);
  });

  if (currentPolygon.length > 0) {
    context.beginPath();
    context.moveTo(currentPolygon[0].x, currentPolygon[0].y);
    currentPolygon.forEach((point) => context.lineTo(point.x, point.y));
    context.strokeStyle = '#03a5e0';
    context.lineWidth = 2;
    context.stroke();
  }
};

// Add point to current polygon
// export const handleCanvasClick = ({
//   event,
//   canvasRef,
//   isDeleteMode,
//   handleDeletePolygon,
//   isCopyMode,
//   draggedPolygon,
//   polygonCount,
//   polygons,
//   setPolygons,
//   setPolygonCount,
//   setDraggedPolygon,
//   isEditMode,
//   currentPolygon,
//   setCurrentPolygon,
//   openSensorPopup,
//   isUpdateMode,
//   handleReEditPolygon,
//   handlePolygonClick,
//   selectedColor, // Pass selected color here
// }) => {
//   const canvas = canvasRef.current;
//   const rect = canvas.getBoundingClientRect();
//   const x = event.clientX - rect.left;
//   const y = event.clientY - rect.top;

//   if (isUpdateMode) {
//     handleReEditPolygon({ x, y, canvasRef, polygons, handlePolygonClick });
//   }

//   if (isDeleteMode) {
//     handleDeletePolygon(x, y, polygons, setPolygons, canvasRef);
//   } else if (isCopyMode && draggedPolygon) {
//     // Handle copy-pasting of polygons
//     const newPolygon = {
//       ...draggedPolygon,
//       id: `F1-PS${polygonCount}`,
//       points: draggedPolygon.points.map((point) => ({
//         x: point.x + (x - draggedPolygon.points[0].x),
//         y: point.y + (y - draggedPolygon.points[0].y),
//       })),
//       fillColor: draggedPolygon.fillColor, // Copy the color as well
//     };
//     setPolygons([...polygons, newPolygon]);
//     setPolygonCount(polygonCount + 1);
//     setDraggedPolygon(null);
//   } else if (isEditMode) {
//     // Handle creating a new polygon
//     const newPolygon = [...currentPolygon, { x, y }];
//     setCurrentPolygon(newPolygon);

//     if (newPolygon.length === 4) {
//       const polygonWithId = {
//         points: newPolygon,
//         id: `F1-PS${polygonCount}`,
//         color: selectedColor,
//         fillColor: selectedColor,
//       };
//       setPolygons([...polygons, polygonWithId]);
//       setPolygonCount(polygonCount + 1);
//       setCurrentPolygon([]);
//       openSensorPopup(polygonWithId);
//     }
//   }
// };

// Add points until user closes polygon (click near the first point)
export const handleCanvasClick = ({
  event,
  canvasRef,
  isDeleteMode,
  handleDeletePolygon,
  isCopyMode,
  draggedPolygon,
  polygonCount,
  polygons,
  setPolygons,
  setPolygonCount,
  setDraggedPolygon,
  isEditMode,
  currentPolygon,
  setCurrentPolygon,
  openSensorPopup, // modal trigger
  isUpdateMode,
  handleReEditPolygon,
  handlePolygonClick,
  selectedColor,
}) => {
  const canvas = canvasRef.current;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if (isUpdateMode) {
    handleReEditPolygon({ x, y, canvasRef, polygons, handlePolygonClick });
    return;
  }

  if (isDeleteMode) {
    handleDeletePolygon(x, y, polygons, setPolygons, canvasRef);
    return;
  }

  if (isCopyMode && draggedPolygon) {
    const newPolygon = {
      ...draggedPolygon,
      id: `F1-PS${polygonCount}`,
      points: draggedPolygon.points.map((point) => ({
        x: point.x + (x - draggedPolygon.points[0].x),
        y: point.y + (y - draggedPolygon.points[0].y),
      })),
      fillColor: draggedPolygon.fillColor,
    };
    setPolygons([...polygons, newPolygon]);
    setPolygonCount(polygonCount + 1);
    setDraggedPolygon(null);
    return;
  }

  if (isEditMode) {
    const newPoint = { x, y };

    // Check if user clicked near the first point to close polygon
    if (currentPolygon.length >= 3) {
      const firstPoint = currentPolygon[0];
      const distance = Math.sqrt(
        Math.pow(newPoint.x - firstPoint.x, 2) + Math.pow(newPoint.y - firstPoint.y, 2)
      );

      if (distance < 10) {
        // Close polygon
        const polygonWithId = {
          points: [...currentPolygon, firstPoint], // close the shape
          id: `F1-PS${polygonCount}`,
          color: selectedColor,
          fillColor: selectedColor,
        };

        setPolygons([...polygons, polygonWithId]);
        setPolygonCount(polygonCount + 1);
        setCurrentPolygon([]);

        // 🔥 Open modal after closing polygon
        openSensorPopup(polygonWithId);
        return;
      }
    }

    // Otherwise keep adding points
    setCurrentPolygon([...currentPolygon, newPoint]);
  }
};

// Toggle Copy Mode
export const handleCopyMode = ({
  setIsCopyMode,
  setIsEditMode,
  setIsMoveMode,
  setIsDeleteMode,
  setDraggedPolygon,
  setIsUpdateMode,
  isCopyMode,
}) => {
  setIsCopyMode(!isCopyMode);
  setIsEditMode(false);
  setIsMoveMode(false);
  setIsDeleteMode(false);
  setIsUpdateMode(false);
  setDraggedPolygon(null);
};

// Toggle Update Mode
export const handleUpdateMode = ({
  setIsCopyMode,
  setIsEditMode,
  setIsMoveMode,
  setIsDeleteMode,
  setDraggedPolygon,
  setIsUpdateMode,
  isUpdateMode,
}) => {
  setIsCopyMode(false);
  setIsEditMode(false);
  setIsMoveMode(false);
  setIsDeleteMode(false);
  setDraggedPolygon(null);
  setIsUpdateMode(!isUpdateMode);
};

// Toggle Move Mode
export const handleMoveMode = ({
  setIsMoveMode,
  setIsEditMode,
  setIsCopyMode,
  setIsDeleteMode,
  isMoveMode,
  setIsUpdateMode,
  setDraggingPolygon,
}) => {
  setIsMoveMode(!isMoveMode);
  setIsEditMode(false);
  setIsCopyMode(false);
  setIsDeleteMode(false);
  setDraggingPolygon(null);
  setIsUpdateMode(false);
};

// Export SVG functionality
export const exportSVG = async ({ canvasRef, image, polygons }) => {
  const canvas = canvasRef.current;
  if (!canvas || !image) return;

  // Convert blob URL to base64
  const toBase64 = async (blobUrl) => {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  // Convert the image's blob URL to a base64 data URL
  const base64Image = await toBase64(image.src);

  // Create SVG content
  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">`;

  // Embed the base64 image in the SVG
  svgContent += `<image href="${base64Image}" width="${canvas.width}" height="${canvas.height}" />`;

  // Add polygons and text labels to the SVG
  polygons.forEach((polygon) => {
    if (!polygon || !polygon.points) return;

    const fillColor = `${polygon.color}${90}` || '#21db1a';
    const strokeColor = polygon.fillColor || polygon.color || '#03a5e060';

    svgContent += `<polygon points="${polygon.points
      .map((point) => `${point.x},${point.y}`)
      .join(' ')}" id="${polygon.id}" sensorAttached="${
      polygon.sensorAttached || ''
    }" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2"/>`;

    svgContent += `<text x="${polygon.points[0].x}" y="${
      polygon.points[0].y - 10
    }" font-size="12" fill="black">${polygon.id}</text>`;
  });

  svgContent += '</svg>';

  // Create a blob and download the SVG file
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'parking-slot.svg';
  link.click();
  URL.revokeObjectURL(url);
};

// Toggle Delete Mode
export const handleDeleteMode = ({
  setIsDeleteMode,
  isDeleteMode,
  setIsEditMode,
  setIsCopyMode,
  setIsMoveMode,
  setIsUpdateMode,
}) => {
  setIsDeleteMode(!isDeleteMode);
  setIsEditMode(false);
  setIsCopyMode(false);
  setIsMoveMode(false);
  setIsUpdateMode(false);
};

// Handle polygon dragging in Move Mode
export const handleCanvasMouseMove = ({
  event,
  isCopyMode,
  draggingPolygon,
  canvasRef,
  polygons,
  dragOffset,
  setPolygons,
  handlePolygonCopy,
}) => {
  if (isCopyMode) {
    handlePolygonCopy(event);
  } else if (draggingPolygon) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const updatedPolygons = polygons.map((polygon) => {
      if (polygon.id === draggingPolygon.id) {
        const updatedPoints = polygon.points.map((point) => ({
          x: point.x + (x - dragOffset.x - polygon.points[0].x),
          y: point.y + (y - dragOffset.y - polygon.points[0].y),
        }));
        return { ...polygon, points: updatedPoints };
      }
      return polygon;
    });

    setPolygons(updatedPolygons);
  }
};

// Stop dragging on mouse up
export const handleCanvasMouseUp = ({ setDraggingPolygon }) => {
  setDraggingPolygon(null);
};

// Start dragging polygon on mouse down in Move Mode
export const handleCanvasMouseDown = ({
  event,
  isMoveMode,
  canvasRef,
  polygons,
  setDraggingPolygon,
  setDragOffset,
}) => {
  if (!isMoveMode) return;

  const canvas = canvasRef.current;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const selectedPolygon = polygons.find((polygon) => {
    const path = new Path2D();
    path.moveTo(polygon.points[0].x, polygon.points[0].y);
    polygon.points.forEach((point) => path.lineTo(point.x, point.y));
    path.closePath();

    return canvas.getContext('2d').isPointInPath(path, x, y);
  });

  if (selectedPolygon) {
    setDraggingPolygon(selectedPolygon);
    setDragOffset({
      x: x - selectedPolygon.points[0].x,
      y: y - selectedPolygon.points[0].y,
    });
  }
};

// Delete polygon
export const handleDeletePolygon = (x, y, polygons, setPolygons, canvasRef) => {
  const canvas = canvasRef.current;
  const updatedPolygons = polygons.filter((polygon) => {
    const path = new Path2D();
    path.moveTo(polygon.points[0].x, polygon.points[0].y);
    polygon.points.forEach((point) => path.lineTo(point.x, point.y));
    path.closePath();

    // Check if the clicked point is inside the polygon
    return !canvas.getContext('2d').isPointInPath(path, x, y);
  });
  setPolygons(updatedPolygons);
};

// Polygon Label Position
export const polygonsLabelHandler = (selectedOption, selectedPolygon, polygons, setPolygons) => {
  let selectedPolygonId = selectedPolygon.id;
  setPolygons(
    polygons.map((poly) => {
      if (poly.id === selectedPolygonId) {
        poly.labelPoint = selectedOption.value;
        return poly;
      } else return poly;
    })
  );
};

export const sensorInfoSubmitHandler = (
  floorName,
  polygons,
  selectedPolygon,
  currentSensor,
  color,
  setPolygons,
  setSensorPopup,
  setCurrentSensor
) => {
  if (floorName) {
    const updatedPolygons = polygons.map((polygon) =>
      polygon.id === selectedPolygon.id
        ? {
            ...polygon,
            id: floorName,
            sensorAttached: currentSensor,
            color: color,
            fillColor: color,
            labelPoint: polygon.labelPoint || 'first',
          }
        : polygon
    );
    setPolygons(updatedPolygons);
    setCurrentSensor(null);
    setSensorPopup(false);
  } else {
    alert('without sensor id and sensor name polygon not draw');
  }
};

// Re-Edit Polygon
export const handleReEditPolygon = ({ x, y, canvasRef, polygons, handlePolygonClick }) => {
  const canvas = canvasRef.current;
  const clickedPolygon = polygons.find((polygon) => {
    const path = new Path2D();
    path.moveTo(polygon.points[0].x, polygon.points[0].y);
    polygon.points.forEach((point) => path.lineTo(point.x, point.y));
    path.closePath();
    return canvas.getContext('2d').isPointInPath(path, x, y);
  });
  if (clickedPolygon) {
    handlePolygonClick(clickedPolygon.id, clickedPolygon.sensorAttached);
  }
};

// Modal Update Handler
export const sensorInfoUpdateHandler = (
  setPolygons,
  selectedPolygon,
  selectedPolygonId,
  selectedPolygonSensor,
  selectedSensor,
  selectedPolygonColor,
  setReEditModalOpen
) => {
  setPolygons((prevPolygons) =>
    prevPolygons.map((polygon) =>
      polygon.id === selectedPolygon.id
        ? {
            ...polygon,
            id: selectedPolygonId,
            sensorAttached: selectedPolygonSensor || selectedSensor,
            color: selectedPolygonColor,
            fillColor: selectedPolygonColor,
            position: selectedPolygon.position,
            labelPoint: selectedPolygon.labelPoint,
          }
        : polygon
    )
  );
  if (setReEditModalOpen) {
    setReEditModalOpen(false); // Close the modal
  } else {
    console.error('setReEditModalOpen is not a function');
  }
};

export const handleCancelPolygon = (
  setSensorPopup,
  setPolygons,
  selectedPolygon,
  setCurrentPolygon,
  setSelectedPolygon
) => {
  setSensorPopup(false);
  setPolygons((prevPolygons) =>
    prevPolygons.filter((polygon) => polygon.id !== selectedPolygon?.id)
  );
  setCurrentPolygon([]);
  setSelectedPolygon(null);
};

export const convertImageSrcToFile = async (imageSrc, fileName = 'image.png') => {
  const res = await fetch(imageSrc);
  const blob = await res.blob();
  return new File([blob], fileName, { type: 'image/png' });
};

// export const convertImageSrcToFile = async (imageSrc, fileName = "image.png", fileType = "image/png") => {
//   const res = await fetch(imageSrc);
//   if (!res.ok) throw new Error("Failed to fetch image.");

//   const blob = await res.blob();
//   return new File([blob], fileName, { type: fileType });
// };
