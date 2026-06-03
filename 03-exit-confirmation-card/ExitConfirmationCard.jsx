import React, { useState } from "react";

/**
 * Exit Confirmation Card Demo
 *
 * Confidentiality note:
 * This is a recreated demo implementation using generic naming and mock UI logic.
 * It does not contain company source code, internal routes, private workflows,
 * proprietary product names, or confidential business logic.
 */

export default function ExitConfirmationCardDemo() {
    const [content, setContent] = useState("");
    const [showExitCard, setShowExitCard] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    const hasUnsavedChanges = content.trim().length > 0;

    const handleExitClick = () => {
        if (hasUnsavedChanges) {
            setShowExitCard(true);
            return;
        }

        setStatusMessage("Exited without unsaved changes.");
    };

    const continueEditing = () => {
        setShowExitCard(false);
    };

    const discardAndExit = () => {
        setContent("");
        setShowExitCard(false);
        setStatusMessage("Changes discarded. User exited the editor.");
    };

    const saveAndExit = () => {
        setShowExitCard(false);
        setStatusMessage("Content saved successfully. User exited the editor.");
    };

    return (
        <div style={styles.page}>
            <div style={styles.editorCard}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Content Editor Demo</h2>

                    <button type="button" onClick={handleExitClick} style={styles.exitButton}>
                        Exit
                    </button>
                </div>

                <p style={styles.description}>
                    Type something in the editor and click Exit. If unsaved changes exist,
                    an exit confirmation card will be shown.
                </p>

                <textarea
                    value={content}
                    onChange={(event) => {
                        setContent(event.target.value);
                        setStatusMessage("");
                    }}
                    placeholder="Write your content here..."
                    rows={8}
                    style={styles.textarea}
                />

                {statusMessage && <div style={styles.statusMessage}>{statusMessage}</div>}
            </div>

            {showExitCard && (
                <div style={styles.overlay}>
                    <div style={styles.confirmCard}>
                        <h3 style={styles.confirmTitle}>Unsaved Changes</h3>

                        <p style={styles.confirmText}>
                            You have unsaved changes. Do you want to continue editing, save
                            before exiting, or discard the changes?
                        </p>

                        <div style={styles.actionGroup}>
                            <button type="button" onClick={continueEditing} style={styles.secondaryButton}>
                                Continue Editing
                            </button>

                            <button type="button" onClick={discardAndExit} style={styles.dangerButton}>
                                Discard
                            </button>

                            <button type="button" onClick={saveAndExit} style={styles.primaryButton}>
                                Save & Exit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        background: "#f5f6f8",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
    },
    editorCard: {
        maxWidth: "760px",
        margin: "0 auto",
        background: "#ffffff",
        borderRadius: "14px",
        padding: "24px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "16px",
    },
    title: {
        margin: 0,
        fontSize: "24px",
    },
    description: {
        color: "#555555",
        lineHeight: 1.5,
        margin: "14px 0 18px",
    },
    textarea: {
        width: "100%",
        resize: "vertical",
        borderRadius: "10px",
        border: "1px solid #d1d5db",
        padding: "14px",
        fontSize: "15px",
        outline: "none",
        boxSizing: "border-box",
    },
    exitButton: {
        padding: "9px 16px",
        borderRadius: "8px",
        border: "1px solid #cccccc",
        background: "#ffffff",
        cursor: "pointer",
    },
    statusMessage: {
        marginTop: "16px",
        padding: "10px 12px",
        background: "#eef6ff",
        border: "1px solid #cfe5ff",
        borderRadius: "8px",
        color: "#1d4f91",
        fontSize: "14px",
    },
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
    confirmCard: {
        width: "100%",
        maxWidth: "460px",
        background: "#ffffff",
        borderRadius: "14px",
        padding: "24px",
        boxShadow: "0 12px 35px rgba(0, 0, 0, 0.25)",
    },
    confirmTitle: {
        margin: "0 0 10px",
        fontSize: "22px",
    },
    confirmText: {
        margin: "0 0 20px",
        color: "#555555",
        lineHeight: 1.5,
    },
    actionGroup: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        flexWrap: "wrap",
    },
    primaryButton: {
        padding: "9px 14px",
        borderRadius: "8px",
        border: "none",
        background: "#111111",
        color: "#ffffff",
        cursor: "pointer",
    },
    secondaryButton: {
        padding: "9px 14px",
        borderRadius: "8px",
        border: "1px solid #cccccc",
        background: "#ffffff",
        cursor: "pointer",
    },
    dangerButton: {
        padding: "9px 14px",
        borderRadius: "8px",
        border: "1px solid #f2b8b5",
        background: "#fff5f5",
        color: "#b42318",
        cursor: "pointer",
    },
};