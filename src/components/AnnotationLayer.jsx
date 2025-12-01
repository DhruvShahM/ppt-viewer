import { useRef, useEffect, useState } from 'react';

const AnnotationLayer = ({ activeTool, color = '#ef4444', clearTrigger, width, height }) => {
    const canvasRef = useRef(null);
    const lastPosRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [snapshot, setSnapshot] = useState(null);

    // Reset canvas when clearTrigger changes or size changes
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setSnapshot(null);
    }, [clearTrigger, width, height]);

    const getMousePos = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const startDrawing = (e) => {
        if (activeTool === 'none') return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const pos = getMousePos(e);

        setIsDrawing(true);
        setStartPos(pos);
        lastPosRef.current = pos;
        setSnapshot(ctx.getImageData(0, 0, canvas.width, canvas.height));

        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(pos.x, pos.y); // Draw a dot
        ctx.stroke();
    };

    const draw = (e) => {
        if (!isDrawing || activeTool === 'none') return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const currPos = getMousePos(e);

        if (activeTool === 'pencil' || activeTool === 'eraser') {
            ctx.beginPath();
            ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
            ctx.lineCap = 'round';

            if (activeTool === 'eraser') {
                ctx.globalCompositeOperation = 'destination-out';
                ctx.lineWidth = 50; // Bigger eraser
                ctx.strokeStyle = 'rgba(0,0,0,1)'; // Color doesn't matter for destination-out
            } else {
                // Pencil
                ctx.globalCompositeOperation = 'source-over';
                ctx.lineWidth = 3;
                ctx.strokeStyle = color;
            }

            ctx.lineTo(currPos.x, currPos.y);
            ctx.stroke();

            lastPosRef.current = currPos;

            // Reset context to safe defaults
            ctx.globalCompositeOperation = 'source-over';

        } else if (activeTool === 'rectangle' || activeTool === 'circle') {
            // Restore the snapshot to clear previous frame of the shape
            ctx.putImageData(snapshot, 0, 0);
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = color;

            if (activeTool === 'rectangle') {
                ctx.rect(startPos.x, startPos.y, currPos.x - startPos.x, currPos.y - startPos.y);
            } else if (activeTool === 'circle') {
                const radiusX = Math.abs(currPos.x - startPos.x) / 2;
                const radiusY = Math.abs(currPos.y - startPos.y) / 2;
                const centerX = Math.min(startPos.x, currPos.x) + radiusX;
                const centerY = Math.min(startPos.y, currPos.y) + radiusY;

                ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
            }

            ctx.stroke();
        } else if (activeTool === 'arrow') {
            // Restore the snapshot
            ctx.putImageData(snapshot, 0, 0);
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = color;

            // Draw the line
            ctx.moveTo(startPos.x, startPos.y);
            ctx.lineTo(currPos.x, currPos.y);
            ctx.stroke();

            // Draw the arrow head
            const headLength = 15; // length of head in pixels
            const dx = currPos.x - startPos.x;
            const dy = currPos.y - startPos.y;
            const angle = Math.atan2(dy, dx);

            ctx.beginPath();
            ctx.moveTo(currPos.x, currPos.y);
            ctx.lineTo(currPos.x - headLength * Math.cos(angle - Math.PI / 6), currPos.y - headLength * Math.sin(angle - Math.PI / 6));
            ctx.moveTo(currPos.x, currPos.y);
            ctx.lineTo(currPos.x - headLength * Math.cos(angle + Math.PI / 6), currPos.y - headLength * Math.sin(angle + Math.PI / 6));
            ctx.stroke();
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className={`absolute top-0 left-0 w-full h-full z-40 ${activeTool !== 'none' ? 'cursor-crosshair pointer-events-auto' : 'pointer-events-none'
                }`}
        />
    );
};

export default AnnotationLayer;
