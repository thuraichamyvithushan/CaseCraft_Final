import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { fetchPhoneModels } from "../api/phoneModelApi.js";
import { useCart } from "../context/CartContext.jsx";
import {
    ZoomIn,
    ZoomOut,
    RotateCw,
    Maximize2,
    Upload,
    ShoppingCart,
    Smartphone,
    ImageIcon,
    Palette,
    FlipHorizontal,
    HelpCircle,
    MousePointer2,
    Layers,
    Lightbulb
} from "lucide-react";

const Designer = () => {
    const canvasEl = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    const { addItem } = useCart();
    const [models, setModels] = useState([]);
    const [selectedModelId, setSelectedModelId] = useState("");
    const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
    const [status, setStatus] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const init = async () => {
            try {
                const loadedModels = await fetchPhoneModels();
                setModels(loadedModels);

                // Check if a model was passed via navigation state
                const initialModelName = location.state?.initialModel;

                if (initialModelName) {
                    const foundModel = loadedModels.find(m => m.name.toLowerCase() === initialModelName.toLowerCase());
                    if (foundModel) {
                        setSelectedModelId(foundModel._id);
                    } else if (loadedModels.length > 0) {
                        setSelectedModelId(loadedModels[0]._id);
                    }
                } else if (loadedModels.length > 0) {
                    setSelectedModelId(loadedModels[0]._id);
                }

                setSelectedTemplateIndex(0);
            } catch (error) {
                console.error(error);
                setStatus("Unable to load phone models. Please contact admin.");
            }
        };

        init();
    }, []);

    const scaleFactorRef = useRef(1);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!canvasEl.current) return;

        const model = models.find((m) => m._id === selectedModelId);
        if (!model) return;

        const templates = getTemplates(model);
        const placeholderSize = { width: 500, height: 750 };
        const templateToLoad = (templates.length > 0 && selectedTemplateIndex < templates.length)
            ? templates[selectedTemplateIndex]
            : null;

        const initCanvas = (width, height) => {
            if (!containerRef.current) return;

            // DYNAMIC SIZING: Calculate based on container and viewport
            const containerWidth = containerRef.current.offsetWidth || 300;
            const viewportHeight = window.innerHeight;

            // On mobile, increase height allowance to use more screen real estate
            const maxAllowedHeight = window.innerWidth < 768 ? viewportHeight * 0.75 : 650;

            // Calculate scale based on which constraint is hit first
            // Reduce padding on mobile (16px vs 32px)
            const horizontalPadding = window.innerWidth < 768 ? 16 : 32;
            const scaleX = (containerWidth - horizontalPadding) / width;
            const scaleY = maxAllowedHeight / height;

            const scaleFactor = Math.min(scaleX, scaleY, 1.0); // Don't upscale past original if it fits
            scaleFactorRef.current = scaleFactor;

            if (canvasRef.current) {
                canvasRef.current.dispose();
            }

            const canvas = new fabric.Canvas(canvasEl.current, {
                width: width * scaleFactor,
                height: height * scaleFactor,
                preserveObjectStacking: true,
                selection: false,
                backgroundColor: "#ffffff"
            });

            canvasRef.current = canvas;

            // Ensure proper centering via CSS (Fabric creates its own wrapper)
            const fabricWrapper = canvas.getElement().parentNode;
            if (fabricWrapper) {
                fabricWrapper.style.margin = "0 auto";
                fabricWrapper.style.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)";
                fabricWrapper.style.borderRadius = "12px";
                fabricWrapper.style.overflow = "hidden";
            }

            if (templateToLoad) {
                loadTemplate(model, templateToLoad);
            }
        };

        const handleResize = () => {
            // Re-run the image loading logic to get dimensions and re-init
            if (templateToLoad) {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = () => initCanvas(img.naturalWidth, img.naturalHeight);
                img.src = templateToLoad;
            } else {
                initCanvas(placeholderSize.width, placeholderSize.height);
            }
        };

        if (templateToLoad) {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
                initCanvas(img.naturalWidth, img.naturalHeight);
            };
            img.onerror = () => {
                console.error("Failed to load template image for dimensions");
                initCanvas(placeholderSize.width, placeholderSize.height);
            };
            img.src = templateToLoad;
        } else {
            initCanvas(placeholderSize.width, placeholderSize.height);
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (canvasRef.current) {
                canvasRef.current.dispose();
                canvasRef.current = null;
            }
        };
    }, [models, selectedModelId, selectedTemplateIndex]);

    const getTemplates = (model) => {
        if (!model) return [];
        return model.templateImages && model.templateImages.length > 0
            ? model.templateImages
            : model.templateImage
                ? [model.templateImage]
                : [];
    };

    const templateObjRef = useRef(null);

    const loadTemplate = (model, templateImage) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const objects = canvas.getObjects();
        objects.forEach((obj) => {
            if (obj.selectable) canvas.remove(obj);
        });

        if (templateImage) {
            fabric.Image.fromURL(
                templateImage,
                (img) => {
                    img.selectable = false;
                    img.evented = false;
                    img.scaleToWidth(canvas.getWidth());
                    img.scaleToHeight(canvas.getHeight());

                    templateObjRef.current = img;

                    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                        originX: "center",
                        originY: "center",
                        left: canvas.width / 2,
                        top: canvas.height / 2,
                        scaleX: canvas.width / img.width,
                        scaleY: canvas.height / img.height
                    });
                },
                { crossOrigin: "anonymous" }
            );
        } else {
            canvas.setBackgroundColor("#ffffff", canvas.renderAll.bind(canvas));
            templateObjRef.current = null;
        }

        if (model?.mockupImage) {
            fabric.Image.fromURL(
                model.mockupImage,
                (img) => {
                    img.selectable = false;
                    img.evented = false;
                    img.scaleToWidth(canvas.getWidth());
                    img.scaleToHeight(canvas.getHeight());
                    canvas.setOverlayImage(img, canvas.renderAll.bind(canvas), {
                        originX: "center",
                        originY: "center",
                        left: canvas.width / 2,
                        top: canvas.height / 2,
                        scaleX: canvas.width / img.width,
                        scaleY: canvas.height / img.height
                    });
                },
                { crossOrigin: "anonymous" }
            );
        } else {
            canvas.setOverlayImage(null, canvas.renderAll.bind(canvas));
        }

        if (model?.cameraOverlay) {
            fabric.Image.fromURL(
                model.cameraOverlay,
                (img) => {
                    img.selectable = false;
                    img.evented = false;
                    img.name = "cameraOverlay";
                    img.scaleToWidth(canvas.getWidth());
                    img.scaleToHeight(canvas.getHeight());

                    const existing = canvas.getObjects().find(obj => obj.name === "cameraOverlay");
                    if (existing) canvas.remove(existing);

                    canvas.add(img);
                    img.bringToFront();
                    canvas.renderAll();
                },
                { crossOrigin: "anonymous" }
            );
        }
    };

    const [userCustomImage, setUserCustomImage] = useState(null);

    const addImageToCanvas = (dataUrl) => {
        const canvas = canvasRef.current;
        if (!canvas || !selectedModelId) return;

        const model = models.find((m) => m._id === selectedModelId);
        if (!model) return;

        setUserCustomImage(dataUrl);

        fabric.Image.fromURL(
            dataUrl,
            (img) => {
                const existingObjects = canvas.getObjects().filter((obj) => obj.selectable);
                existingObjects.forEach((obj) => canvas.remove(obj));

                const coverX = 0;
                const coverY = 0;
                const coverWidth = canvas.width;
                const coverHeight = canvas.height;

                const scaleX = coverWidth / img.width;
                const scaleY = coverHeight / img.height;
                const scale = Math.min(scaleX, scaleY);

                let clipPathObj;
                if (templateObjRef.current) {
                    templateObjRef.current.clone((cloned) => {
                        cloned.set({
                            originX: "center",
                            originY: "center",
                            left: canvas.width / 2,
                            top: canvas.height / 2,
                            absolutePositioned: true
                        });
                        cloned.scaleToWidth(canvas.width);
                        cloned.scaleToHeight(canvas.height);

                        clipPathObj = cloned;
                        applyImageToCanvas();
                    });
                } else {
                    clipPathObj = new fabric.Rect({
                        left: coverX,
                        top: coverY,
                        width: coverWidth,
                        height: coverHeight,
                        absolutePositioned: true,
                    });
                    applyImageToCanvas();
                }

                function applyImageToCanvas() {
                    img.set({
                        // Set origin to CENTER for stable zooming
                        originX: "center",
                        originY: "center",
                        // Position at center of canvas
                        left: canvas.width / 2,
                        top: canvas.height / 2,

                        // User requested to remove orange lines/corners
                        hasBorders: false,
                        hasControls: false,
                        selectable: true,
                        clipPath: clipPathObj,
                    });
                    finishSetup();
                }

                function finishSetup() {
                    img.checkConstraints = () => {
                        const obj = img;
                        const canvasWidth = canvas.width;
                        const canvasHeight = canvas.height;

                        // 1. Min Scale (Contain vs Cover)
                        const minScaleX = canvasWidth / obj.width;
                        const minScaleY = canvasHeight / obj.height;
                        const minScale = Math.min(minScaleX, minScaleY);

                        if (obj.scaleX < minScale || obj.scaleY < minScale) {
                            obj.scale(minScale);
                        }

                        // 2. Boundary Logic (Center Origin)
                        const currentW = obj.width * obj.scaleX;
                        const currentH = obj.height * obj.scaleY;

                        // Calculate boundaries of the image based on center position
                        // obj.left/obj.top is the CENTER
                        const leftEdge = obj.left - currentW / 2;
                        const rightEdge = obj.left + currentW / 2;
                        const topEdge = obj.top - currentH / 2;
                        const bottomEdge = obj.top + currentH / 2;

                        // Horizontal
                        if (currentW > canvasWidth) {
                            // Clamping (No whitespace)
                            if (leftEdge > 0) {
                                obj.left = currentW / 2; // Snap left edge to 0
                            }
                            if (rightEdge < canvasWidth) {
                                obj.left = canvasWidth - currentW / 2; // Snap right edge to canvasWidth
                            }
                        } else {
                            // Containment (Keep inside)
                            if (leftEdge < 0) {
                                obj.left = currentW / 2;
                            }
                            if (rightEdge > canvasWidth) {
                                obj.left = canvasWidth - currentW / 2;
                            }
                        }

                        // Vertical
                        if (currentH > canvasHeight) {
                            // Clamping
                            if (topEdge > 0) {
                                obj.top = currentH / 2;
                            }
                            if (bottomEdge < canvasHeight) {
                                obj.top = canvasHeight - currentH / 2;
                            }
                        } else {
                            // Containment
                            if (topEdge < 0) {
                                obj.top = currentH / 2;
                            }
                            if (bottomEdge > canvasHeight) {
                                obj.top = canvasHeight - currentH / 2;
                            }
                        }
                    };

                    const enforceConstraints = () => img.checkConstraints();

                    img.on("moving", enforceConstraints);
                    img.on("scaling", enforceConstraints);
                    img.on("rotating", enforceConstraints);
                    img.set({ hasRotatingPoint: false });

                    img.scale(scale);
                    enforceConstraints();

                    canvas.add(img);
                    canvas.setActiveObject(img);

                    const cameraOverlay = canvas.getObjects().find(obj => obj.name === "cameraOverlay");
                    if (cameraOverlay) {
                        cameraOverlay.bringToFront();
                    }

                    canvas.renderAll();
                }
            },
            { crossOrigin: "anonymous" }
        );
    };

    const handleUpload = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => addImageToCanvas(reader.result);
        reader.readAsDataURL(file);

        // Reset input so same file can be uploaded again if needed
        if (event.target) event.target.value = "";
    };

    const triggerUpload = () => {
        fileInputRef.current?.click();
    };

    // Editing Tools
    const handleZoomIn = () => {
        const canvas = canvasRef.current;
        const activeObj = canvas?.getActiveObject();
        if (activeObj && activeObj.selectable) {
            // Simple scale works because origin is center
            const newScale = activeObj.scaleX * 1.1;
            activeObj.scale(newScale);
            if (activeObj.checkConstraints) activeObj.checkConstraints();
            canvas.renderAll();
        }
    };

    const handleZoomOut = () => {
        const canvas = canvasRef.current;
        const activeObj = canvas?.getActiveObject();
        if (activeObj && activeObj.selectable) {
            // Simple scale works because origin is center
            const newScale = activeObj.scaleX * 0.9;
            activeObj.scale(newScale);
            if (activeObj.checkConstraints) activeObj.checkConstraints();
            canvas.renderAll();
        }
    };

    const handleFlip = () => {
        const canvas = canvasRef.current;
        const activeObj = canvas?.getActiveObject();
        if (activeObj && activeObj.selectable) {
            activeObj.set("flipX", !activeObj.flipX);
            canvas.renderAll();
        }
    };

    const handleRotate = () => {
        const canvas = canvasRef.current;
        const activeObj = canvas?.getActiveObject();
        if (activeObj && activeObj.selectable) {
            const newAngle = (activeObj.angle || 0) + 15;
            activeObj.rotate(newAngle);
            canvas.renderAll();
        }
    };

    const handleReset = () => {
        if (userCustomImage) {
            addImageToCanvas(userCustomImage);
        }
    };

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            setStatus("Please login to add your design to cart.");
            navigate("/login");
            return;
        }

        const model = models.find((m) => m._id === selectedModelId);
        if (!model) {
            setStatus("Please select a phone model.");
            return;
        }

        if (!canvasRef.current) return;
        setSaving(true);
        setStatus("");

        try {
            const designImage = canvasRef.current.toDataURL({
                format: "png",
                quality: 1,
                multiplier: 1 / scaleFactorRef.current
            });
            const templates = getTemplates(model);
            const selectedTemplate = templates[selectedTemplateIndex] || templates[0];

            addItem({
                productName: model.name,
                productId: model._id,
                price: model.price || 1000,
                designImage,
                templateImage: selectedTemplate,
                userCustomImage: userCustomImage || "",
                quantity: 1,
                category: "phone_case"
            });

            navigate("/checkout");
        } catch {
            setStatus("Unable to add design to cart");
        } finally {
            setSaving(false);
        }
    };

    const selectedModel = models.find((m) => m._id === selectedModelId);
    const templates = selectedModel ? getTemplates(selectedModel) : [];

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-6 lg:py-12">
                {/* Header */}
                <div className="mb-4 sm:mb-6 lg:mb-10">
                    <h1 className="text-2xl font-bold text-[#02225b] sm:text-3xl lg:text-5xl">
                        Design Your Case
                    </h1>
                    <p className="mt-1 text-xs text-slate-600 sm:mt-2 sm:text-sm lg:text-base">Create a personalized phone case in minutes</p>
                </div>

                <div className="grid gap-4 sm:gap-x-6 sm:gap-y-3 lg:gap-y-0 lg:grid-cols-[320px_1fr] xl:grid-cols-[380px_1fr] items-start">
                    {/* Phone Model - FIRST on Mobile, Top Left on Desktop */}
                    <div className="order-1 lg:order-none lg:col-start-1 lg:row-start-1">
                        <div className="rounded-xl bg-white p-3 shadow-lg border border-slate-200 sm:rounded-2xl sm:p-4 lg:p-5 lg:rounded-b-none lg:border-b-0">
                            <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                <Smartphone className="w-4 h-4 text-[#FFC107] sm:w-5 sm:h-5" />
                                <h2 className="font-semibold text-slate-800 text-xs sm:text-sm lg:text-base">Phone Model</h2>
                            </div>
                            <select
                                value={selectedModelId}
                                onChange={(e) => {
                                    setSelectedModelId(e.target.value);
                                    setSelectedTemplateIndex(0);
                                    setUserCustomImage(null);
                                }}
                                className="w-full rounded-lg border-2 border-slate-200 px-3 py-2 text-xs transition-all focus:border-[#FFC107] focus:outline-none focus:ring-2 focus:ring-[#FFC107]/20 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm lg:text-base"
                            >
                                {models.map((m) => (
                                    <option key={m._id} value={m._id}>
                                        {m.name}
                                    </option>
                                ))}
                            </select>
                            {selectedModel && (
                                <div className="mt-3 rounded-lg bg-[#FFC107]/20 p-3 border border-[#FFC107]/40 sm:mt-4 sm:rounded-xl sm:p-4">
                                    <p className="text-xs text-[#02225b] font-medium sm:text-sm">Price</p>
                                    <p className="text-xl font-bold text-[#FFC107] sm:text-2xl lg:text-3xl">
                                        ${selectedModel.price || 1000}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Left Panel - Templates (LAST on mobile, Bottom Left on Desktop) */}
                    <div className="space-y-3 sm:space-y-4 order-3 lg:order-none lg:col-start-1 lg:row-start-2">
                        {/* Templates Card */}
                        {templates.length > 0 && (
                            <div className="rounded-xl bg-white p-3 shadow-lg border border-slate-200 sm:rounded-2xl sm:p-4 lg:p-5 lg:rounded-t-none">
                                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                    <Palette className="w-4 h-4 text-[#FFC107] sm:w-5 sm:h-5" />
                                    <h2 className="font-semibold text-slate-800 text-xs sm:text-sm lg:text-base">Templates</h2>
                                </div>
                                <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-3 sm:gap-2 lg:gap-3">
                                    {templates.map((template, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedTemplateIndex(index)}
                                            className={`group relative aspect-[3/5] overflow-hidden rounded-md transition-all sm:rounded-lg ${selectedTemplateIndex === index
                                                ? "ring-2 scale-105 ring-[#FFC107] sm:ring-4"
                                                : "ring-1 ring-slate-200 hover:ring-[#FFC107]/60 sm:ring-2"
                                                }`}
                                        >
                                            <img
                                                src={template}
                                                alt={`Template ${index + 1}`}
                                                className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                            />
                                            {selectedTemplateIndex === index && (
                                                <div className="absolute inset-0 bg-[#FFC107]/20" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <p className="mt-2 text-center text-xs text-slate-500 sm:mt-3">
                                    {selectedTemplateIndex + 1} of {templates.length}
                                </p>
                            </div>
                        )}

                        {/* Tips Card - New */}
                        <div className="hidden lg:block rounded-xl bg-white p-5 shadow-lg border border-slate-200 sm:rounded-2xl">
                            <div className="flex items-center gap-2 mb-5">
                                <HelpCircle className="w-5 h-5 text-[#FFC107]" />
                                <h2 className="font-bold text-[#02225b]">Design Tips</h2>
                            </div>

                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <div className="h-6 w-6 rounded-lg bg-[#FFC107]/10 flex items-center justify-center flex-shrink-0">
                                        <MousePointer2 className="w-3.5 h-3.5 text-[#FFC107]" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[#02225b]">Select & Move</p>
                                        <p className="text-[10px] text-slate-500 mt-0.5">Click your image on the case to select it, then drag to reposition.</p>
                                    </div>
                                </li>

                                <li className="flex gap-3">
                                    <div className="h-6 w-6 rounded-lg bg-[#124090]/10 flex items-center justify-center flex-shrink-0">
                                        <Layers className="w-3.5 h-3.5 text-[#124090]" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[#02225b]">Stay in Bounds</p>
                                        <p className="text-[10px] text-slate-500 mt-0.5">The visual area represents the print zone. Keep important parts away from edges.</p>
                                    </div>
                                </li>

                                <li className="flex gap-3">
                                    <div className="h-6 w-6 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                                        <Lightbulb className="w-3.5 h-3.5 text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[#02225b]">High Resolution</p>
                                        <p className="text-[10px] text-slate-500 mt-0.5">Use clear, bright photos for the best print finish on your case.</p>
                                    </div>
                                </li>
                            </ul>

                            <div className="mt-6 p-3 rounded-xl bg-slate-50 border border-slate-100 italic">
                                <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                                    "Your masterpiece starts with a single click!"
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Center Panel - Canvas & Tools (Second on Mobile, Right Column on Desktop) */}
                    <div className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2">
                        <div className="rounded-xl bg-white p-1 shadow-lg border border-slate-200 sm:p-2 sm:rounded-2xl lg:p-3">
                            <div className="flex flex-col items-center gap-1.5 sm:gap-2 lg:gap-3">
                                {/* Canvas Container */}
                                <div ref={containerRef} className="relative w-full flex justify-center items-center min-h-[380px] sm:min-h-[550px] overflow-hidden">
                                    <div className="relative group transition-transform duration-500 ease-out">
                                        <canvas ref={canvasEl} className="shadow-2xl" />
                                    </div>
                                </div>

                                {/* Editing Tools */}
                                <div className="flex w-full flex-wrap justify-center gap-1.5 sm:gap-2 lg:gap-3">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept="image/*"
                                        onChange={handleUpload}
                                        className="hidden"
                                    />
                                    <button
                                        onClick={triggerUpload}
                                        className="flex flex-col items-center justify-center gap-1 rounded-xl bg-[#FFC107]/10 px-3 py-2.5 text-[10px] font-bold text-[#02225b] transition-all hover:bg-[#FFC107]/20 active:scale-95 sm:px-5 sm:py-3 sm:text-xs"
                                        title="Upload Image"
                                    >
                                        <Upload className="h-4 w-4 sm:h-5 sm:w-5" />
                                        <span>Upload</span>
                                    </button>

                                    <div className="w-[1px] h-8 bg-slate-200 self-center hidden sm:block mx-1"></div>

                                    <button
                                        onClick={handleZoomIn}
                                        className="flex flex-col items-center justify-center gap-1 rounded-xl bg-slate-100 px-3 py-2.5 text-[10px] font-bold text-slate-700 transition-all hover:bg-slate-200 active:scale-95 sm:px-5 sm:py-3 sm:text-xs"
                                        title="Zoom In"
                                    >
                                        <ZoomIn className="h-4 w-4 sm:h-5 sm:w-5" />
                                        <span>Zoom In</span>
                                    </button>
                                    <button
                                        onClick={handleZoomOut}
                                        className="flex flex-col items-center justify-center gap-1 rounded-xl bg-slate-100 px-3 py-2.5 text-[10px] font-bold text-slate-700 transition-all hover:bg-slate-200 active:scale-95 sm:px-5 sm:py-3 sm:text-xs"
                                        title="Zoom Out"
                                    >
                                        <ZoomOut className="h-4 w-4 sm:h-5 sm:w-5" />
                                        <span>Zoom Out</span>
                                    </button>
                                    <button
                                        onClick={handleFlip}
                                        className="flex flex-col items-center justify-center gap-1 rounded-xl bg-slate-100 px-3 py-2.5 text-[10px] font-bold text-slate-700 transition-all hover:bg-slate-200 active:scale-95 sm:px-5 sm:py-3 sm:text-xs"
                                        title="Flip Horizontal"
                                    >
                                        <FlipHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
                                        <span>Flip</span>
                                    </button>
                                    <button
                                        onClick={handleRotate}
                                        className="flex flex-col items-center justify-center gap-1 rounded-xl bg-slate-100 px-3 py-2.5 text-[10px] font-bold text-slate-700 transition-all hover:bg-slate-200 active:scale-95 sm:px-5 sm:py-3 sm:text-xs"
                                        title="Rotate"
                                    >
                                        <RotateCw className="h-4 w-4 sm:h-5 sm:w-5" />
                                        <span>Rotate</span>
                                    </button>
                                    <button
                                        onClick={handleReset}
                                        className="flex flex-col items-center justify-center gap-1 rounded-xl bg-slate-100 px-3 py-2.5 text-[10px] font-bold text-slate-700 transition-all hover:bg-slate-200 active:scale-95 sm:px-5 sm:py-3 sm:text-xs"
                                        title="Reset Position"
                                    >
                                        <Maximize2 className="h-4 w-4 sm:h-5 sm:w-5" />
                                        <span>Reset</span>
                                    </button>
                                </div>

                                {/* Tips */}
                                <div className="w-full rounded-lg bg-[#02225b]/10 border border-[#02225b]/20 p-2 sm:p-2.5 sm:rounded-xl lg:p-3">
                                    <p className="text-xs text-[#02225b] sm:text-sm">
                                        💡 <strong>Pro tip:</strong> Use high-resolution images for best print quality. Drag to reposition, pinch to zoom.
                                    </p>
                                </div>

                                {/* Status Message */}
                                {status && (
                                    <div className="w-full rounded-lg bg-red-50 border border-red-200 p-2 sm:p-2.5 sm:rounded-xl lg:p-3">
                                        <p className="text-xs text-red-700 sm:text-sm">{status}</p>
                                    </div>
                                )}

                                {/* Add to Cart Button */}
                                <button
                                    onClick={handleAddToCart}
                                    disabled={saving}
                                    className="w-full rounded-lg bg-[#FFC107] px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:bg-[#FFC107]/90 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:rounded-xl sm:px-5 sm:py-3 lg:rounded-2xl lg:px-8 lg:py-4 lg:text-base"
                                >
                                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                                    {saving ? "Adding to Cart..." : "Add to Cart"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Designer;
