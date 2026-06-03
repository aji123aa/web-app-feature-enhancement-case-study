import React, { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";

/**
 * Generic profile photo cropper demo.
 *
 * Confidentiality note:
 * This is a recreated demo implementation using generic naming and UI.
 * It does not contain company source code, internal APIs, proprietary UI components,
 * product names, confidential business logic, or private assets.
 */

const loadImage = (imageUrl) =>
    new Promise((resolve, reject) => {
        const image = new Image();

        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", () => reject(new Error("Unable to load image.")));

        image.setAttribute("crossOrigin", "anonymous");
        image.src = imageUrl;
    });

const createCroppedImageFile = async (
    imageUrl,
    cropAreaPixels,
    options = {}
) => {
    const {
        outputWidth = 800,
        outputHeight = 800,
        fileName = "profile-photo.jpg",
        imageType = "image/jpeg",
        imageQuality = 0.9,
    } = options;

    const image = await loadImage(imageUrl);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
        throw new Error("Canvas is not supported in this browser.");
    }

    canvas.width = outputWidth;
    canvas.height = outputHeight;

    context.drawImage(
        image,
        cropAreaPixels.x,
        cropAreaPixels.y,
        cropAreaPixels.width,
        cropAreaPixels.height,
        0,
        0,
        outputWidth,
        outputHeight
    );

    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    reject(new Error("Failed to generate cropped image."));
                    return;
                }

                const croppedFile = new File([blob], fileName, {
                    type: imageType,
                    lastModified: Date.now(),
                });

                resolve(croppedFile);
            },
            imageType,
            imageQuality
        );
    });
};

export default function ProfilePhotoCropperDemo({
    isOpen,
    imageUrl,
    onClose,
    onSave,
}) {
    const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 });
    const [zoomLevel, setZoomLevel] = useState(1);
    const [cropPixels, setCropPixels] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (isOpen) {
            setCropPosition({ x: 0, y: 0 });
            setZoomLevel(1);
            setCropPixels(null);
            setErrorMessage("");
            setIsSaving(false);
        }
    }, [isOpen, imageUrl]);

    const handleCropComplete = useCallback((_, croppedPixels) => {
        setCropPixels(croppedPixels);
    }, []);

    const handleSave = async () => {
        if (!imageUrl || !cropPixels) {
            setErrorMessage("Please select and adjust an image before saving.");
            return;
        }

        setIsSaving(true);
        setErrorMessage("");

        try {
            const croppedImageFile = await createCroppedImageFile(imageUrl, cropPixels, {
                outputWidth: 800,
                outputHeight: 800,
                fileName: "profile-photo.jpg",
            });

            await onSave(croppedImageFile);
        } catch (error) {
            setErrorMessage(error.message || "Something went wrong while cropping the image.");
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Adjust Profile Photo</h2>
                    <button type="button" onClick={onClose} style={styles.closeButton}>
                        ×
                    </button>
                </div>

                <div style={styles.cropContainer}>
                    {imageUrl ? (
                        <Cropper
                            image={imageUrl}
                            crop={cropPosition}
                            zoom={zoomLevel}
                            aspect={1}
                            cropShape="round"
                            showGrid={false}
                            onCropChange={setCropPosition}
                            onZoomChange={setZoomLevel}
                            onCropComplete={handleCropComplete}
                        />
                    ) : (
                        <div style={styles.emptyState}>No image selected</div>
                    )}
                </div>

                <div style={styles.controlGroup}>
                    <label style={styles.label}>Zoom</label>
                    <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.1}
                        value={zoomLevel}
                        onChange={(event) => setZoomLevel(Number(event.target.value))}
                        style={styles.slider}
                    />
                </div>

                <p style={styles.helpText}>
                    Move and zoom the image to fit the profile frame. The final output is
                    generated as a square 800 × 800 image.
                </p>

                {errorMessage && <p style={styles.errorText}>{errorMessage}</p>}

                <div style={styles.footer}>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSaving}
                        style={styles.secondaryButton}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={isSaving || !imageUrl}
                        style={styles.primaryButton}
                    >
                        {isSaving ? "Saving..." : "Save Photo"}
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        zIndex: 1000,
    },
    modal: {
        width: "100%",
        maxWidth: "560px",
        background: "#ffffff",
        borderRadius: "14px",
        padding: "20px",
        boxShadow: "0 12px 35px rgba(0, 0, 0, 0.25)",
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "16px",
    },
    title: {
        fontSize: "20px",
        fontWeight: 700,
        margin: 0,
    },
    closeButton: {
        border: "none",
        background: "transparent",
        fontSize: "26px",
        cursor: "pointer",
    },
    cropContainer: {
        position: "relative",
        height: "380px",
        width: "100%",
        overflow: "hidden",
        borderRadius: "12px",
        background: "#111111",
    },
    emptyState: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
    },
    controlGroup: {
        marginTop: "18px",
    },
    label: {
        display: "block",
        fontSize: "14px",
        fontWeight: 600,
        marginBottom: "8px",
    },
    slider: {
        width: "100%",
    },
    helpText: {
        fontSize: "13px",
        color: "#666666",
        lineHeight: 1.5,
    },
    errorText: {
        fontSize: "13px",
        color: "#b00020",
        marginTop: "8px",
    },
    footer: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        marginTop: "18px",
    },
    secondaryButton: {
        padding: "10px 16px",
        borderRadius: "8px",
        border: "1px solid #cccccc",
        background: "#ffffff",
        cursor: "pointer",
    },
    primaryButton: {
        padding: "10px 16px",
        borderRadius: "8px",
        border: "none",
        background: "#111111",
        color: "#ffffff",
        cursor: "pointer",
    },
};