import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';

const AnnotationLayer = forwardRef(({ activeTool, color = '#ef4444', clearTrigger, width, height, initialData }, ref) => {
    const canvasRef = useRef(null);
    const lastPosRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [texts, setTexts] = useState([]);
    const [currentInput, setCurrentInput] = useState(null);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [snapshot, setSnapshot] = useState(null);
    const [dragState, setDragState] = useState(null); // { id, startX, startY, initialTextX, initialTextY }

    useImperativeHandle(ref, () => ({
        getData: () => {
            const canvas = canvasRef.current;
            return {
                image: canvas ? canvas.toDataURL() : null,
                texts: texts
            };
        }
    }), [texts]);

    // Load initial data
    useEffect(() => {
        if (initialData) {
            setTexts(initialData.texts || []);
            if (initialData.image) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                const img = new Image();
                img.onload = () => {
                    ctx.drawImage(img, 0, 0);
                };
                img.src = initialData.image;
            }
        }
    }, [initialData]);

    // Reset canvas when clearTrigger changes or size changes
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        // Only clear if NOT loading initial data (which is handled by the other effect)
        // But wait, initialData loading happens on mount. 
        // This effect runs on mount too because of width/height.
        // We need to be careful not to wipe initialData.
        // Actually, if we use key={currentSlide}, this component remounts.
        // So we can just clear here, and then the initialData effect (if it runs after) will draw.
        // OR, we check if we just mounted.

        // Simplified: Just clear. The initialData effect will run and draw on top if it's a new mount.
        // However, if width/height changes mid-view, we lose data. That's a known issue with canvas resizing.
        // For now, let's assume this clears on mount (empty) and then initialData draws.

        // If clearTrigger changes, we definitely want to clear.
        if (clearTrigger > 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setSnapshot(null);
            setTexts([]);
            setCurrentInput(null);
            setDragState(null);
        }
    }, [clearTrigger, width, height]);

    // ... (rest of the component)

    // Global drag listeners
    useEffect(() => {
        if (!dragState) return;

        const handleGlobalMouseMove = (e) => {
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;

            const deltaX = currentX - dragState.startX;
            const deltaY = currentY - dragState.startY;

            setTexts(prev => prev.map(t => {
                if (t.id === dragState.id) {
                    return {
                        ...t,
                        x: dragState.initialTextX + deltaX,
                        y: dragState.initialTextY + deltaY
                    };
                }
                return t;
            }));
        };

        const handleGlobalMouseUp = () => {
            setDragState(null);
        };

        window.addEventListener('mousemove', handleGlobalMouseMove);
        window.addEventListener('mouseup', handleGlobalMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            window.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [dragState]);

    const getMousePos = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const handleCanvasClick = (e) => {
        if (activeTool !== 'text') return;

        const pos = getMousePos(e);
        setCurrentInput({
            x: pos.x,
            y: pos.y,
            text: ''
        });
    };

    const handleTextMouseDown = (e, text) => {
        // Only allow dragging if tool is text or none (cursor)
        if (activeTool !== 'text' && activeTool !== 'none') return;

        e.stopPropagation();
        const pos = getMousePos(e);
        setDragState({
            id: text.id,
            startX: pos.x,
            startY: pos.y,
            initialTextX: text.x,
            initialTextY: text.y
        });
    };

    const handleTextSubmit = () => {
        if (currentInput && currentInput.text.trim()) {
            setTexts([...texts, { ...currentInput, id: Date.now() }]);
        }
        setCurrentInput(null);
    };

    const startDrawing = (e) => {
        if (activeTool === 'none' || activeTool === 'text') return;

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
        if (!isDrawing || activeTool === 'none' || activeTool === 'text') return;

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

                // Erase text if hit
                const eraserRadius = 25;
                const textHeight = 30; // Approx for 24px font
                ctx.font = 'bold 24px sans-serif';

                const remainingTexts = texts.filter(t => {
                    const width = ctx.measureText(t.text).width;
                    const isHit = (
                        currPos.x >= t.x - eraserRadius &&
                        currPos.x <= t.x + width + eraserRadius &&
                        currPos.y >= t.y - eraserRadius &&
                        currPos.y <= t.y + textHeight + eraserRadius
                    );
                    return !isHit;
                });

                if (remainingTexts.length !== texts.length) {
                    setTexts(remainingTexts);
                }
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
        <div className="absolute top-0 left-0 w-full h-full z-40 pointer-events-none">
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                onMouseDown={startDrawing}
                onClick={handleCanvasClick}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className={`absolute top-0 left-0 w-full h-full ${activeTool !== 'none' ? 'cursor-crosshair pointer-events-auto' : 'pointer-events-none'
                    }`}
            />
            {/* Render committed texts */}
            {texts.map((t) => (
                <div
                    key={t.id}
                    onMouseDown={(e) => handleTextMouseDown(e, t)}
                    style={{
                        position: 'absolute',
                        left: t.x,
                        top: t.y,
                        color: color,
                        fontSize: '24px',
                        fontFamily: 'sans-serif',
                        fontWeight: 'bold',
                        pointerEvents: (activeTool === 'text' || activeTool === 'none') ? 'auto' : 'none',
                        cursor: (activeTool === 'text' || activeTool === 'none') ? 'move' : 'default',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                        userSelect: 'none'
                    }}
                >
                    {t.text}
                </div>
            ))}
            {/* Render active input */}
            {currentInput && (
                <input
                    autoFocus
                    value={currentInput.text}
                    onChange={(e) => setCurrentInput({ ...currentInput, text: e.target.value })}
                    onBlur={handleTextSubmit}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleTextSubmit();
                    }}
                    style={{
                        position: 'absolute',
                        left: currentInput.x,
                        top: currentInput.y,
                        color: color,
                        fontSize: '24px',
                        fontFamily: 'sans-serif',
                        fontWeight: 'bold',
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        minWidth: '200px',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                        pointerEvents: 'auto'
                    }}
                    placeholder="Type here..."
                />
            )}
        </div>
    );
});

export default AnnotationLayer;
