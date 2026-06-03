import React, { useState } from "react";

/**
 * Content Scheduling Demo
 *
 * Confidentiality note:
 * This is a recreated demo implementation using generic naming, mock data,
 * and simplified scheduling logic. It does not contain company source code,
 * internal APIs, database schema, proprietary product names, or private workflows.
 */

const addMonths = (date, months) => {
    const nextDate = new Date(date);
    nextDate.setMonth(nextDate.getMonth() + months);
    return nextDate;
};

const mockSaveContent = async (payload) => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    return {
        success: true,
        content: {
            id: "content-101",
            ...payload,
            savedAt: new Date().toISOString(),
        },
    };
};

export default function ContentSchedulerDemo() {
    const [title, setTitle] = useState("");
    const [contentBody, setContentBody] = useState("");
    const [publishMode, setPublishMode] = useState("draft");
    const [scheduledDateTime, setScheduledDateTime] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [savedPreview, setSavedPreview] = useState(null);

    const validateForm = () => {
        if (!title.trim()) {
            return "Title is required.";
        }

        if (!contentBody.trim()) {
            return "Content body is required.";
        }

        if (publishMode === "scheduled") {
            if (!scheduledDateTime) {
                return "Please select a scheduled publish date and time.";
            }

            const selectedDate = new Date(scheduledDateTime);
            const currentDate = new Date();
            const maxAllowedDate = addMonths(currentDate, 3);

            if (Number.isNaN(selectedDate.getTime())) {
                return "Invalid scheduled date and time.";
            }

            if (selectedDate <= currentDate) {
                return "Scheduled publish time must be in the future.";
            }

            if (selectedDate > maxAllowedDate) {
                return "Content can be scheduled only up to 3 months in advance.";
            }
        }

        return "";
    };

    const handleSave = async () => {
        const validationError = validateForm();

        if (validationError) {
            setStatusMessage(validationError);
            setSavedPreview(null);
            return;
        }

        setIsSaving(true);
        setStatusMessage("");

        const payload = {
            title: title.trim(),
            body: contentBody.trim(),
            status: publishMode,
            scheduledPublishAt:
                publishMode === "scheduled" ? new Date(scheduledDateTime).toISOString() : null,
        };

        try {
            const response = await mockSaveContent(payload);

            setSavedPreview(response.content);

            if (publishMode === "published") {
                setStatusMessage("Content published successfully.");
            } else if (publishMode === "scheduled") {
                setStatusMessage("Content scheduled successfully.");
            } else {
                setStatusMessage("Content saved as draft.");
            }
        } catch (error) {
            setStatusMessage("Failed to save content.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2 style={styles.title}>Content Scheduling Demo</h2>

                <p style={styles.description}>
                    This demo shows a generic content publishing workflow where content can
                    be saved as draft, published immediately, or scheduled for a future date.
                </p>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Enter content title"
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Content</label>
                    <textarea
                        value={contentBody}
                        onChange={(event) => setContentBody(event.target.value)}
                        placeholder="Write content here..."
                        rows={7}
                        style={styles.textarea}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Publishing Option</label>

                    <div style={styles.optionGroup}>
                        <label style={styles.radioOption}>
                            <input
                                type="radio"
                                name="publishMode"
                                value="draft"
                                checked={publishMode === "draft"}
                                onChange={(event) => setPublishMode(event.target.value)}
                            />
                            Save as Draft
                        </label>

                        <label style={styles.radioOption}>
                            <input
                                type="radio"
                                name="publishMode"
                                value="published"
                                checked={publishMode === "published"}
                                onChange={(event) => setPublishMode(event.target.value)}
                            />
                            Publish Now
                        </label>

                        <label style={styles.radioOption}>
                            <input
                                type="radio"
                                name="publishMode"
                                value="scheduled"
                                checked={publishMode === "scheduled"}
                                onChange={(event) => setPublishMode(event.target.value)}
                            />
                            Schedule
                        </label>
                    </div>
                </div>

                {publishMode === "scheduled" && (
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Scheduled Publish Date & Time</label>
                        <input
                            type="datetime-local"
                            value={scheduledDateTime}
                            onChange={(event) => setScheduledDateTime(event.target.value)}
                            style={styles.input}
                        />
                        <p style={styles.helpText}>
                            Select a future date and time. This demo allows scheduling up to 3 months ahead.
                        </p>
                    </div>
                )}

                {statusMessage && <div style={styles.message}>{statusMessage}</div>}

                <div style={styles.actionRow}>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={isSaving}
                        style={styles.primaryButton}
                    >
                        {isSaving ? "Saving..." : "Save Content"}
                    </button>
                </div>

                {savedPreview && (
                    <div style={styles.previewBox}>
                        <h3 style={styles.previewTitle}>Saved Payload Preview</h3>
                        <pre style={styles.previewCode}>
                            {JSON.stringify(savedPreview, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
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
    card: {
        maxWidth: "780px",
        margin: "0 auto",
        background: "#ffffff",
        borderRadius: "14px",
        padding: "24px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
    },
    title: {
        margin: "0 0 8px",
        fontSize: "24px",
    },
    description: {
        margin: "0 0 20px",
        color: "#555555",
        lineHeight: 1.5,
    },
    formGroup: {
        marginBottom: "18px",
    },
    label: {
        display: "block",
        fontSize: "14px",
        fontWeight: 600,
        marginBottom: "8px",
    },
    input: {
        width: "100%",
        padding: "11px 12px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        fontSize: "14px",
        boxSizing: "border-box",
    },
    textarea: {
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        fontSize: "14px",
        resize: "vertical",
        boxSizing: "border-box",
    },
    optionGroup: {
        display: "flex",
        flexWrap: "wrap",
        gap: "14px",
    },
    radioOption: {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "14px",
        cursor: "pointer",
    },
    helpText: {
        marginTop: "8px",
        fontSize: "13px",
        color: "#666666",
    },
    message: {
        marginBottom: "16px",
        padding: "10px 12px",
        background: "#eef6ff",
        border: "1px solid #cfe5ff",
        borderRadius: "8px",
        color: "#1d4f91",
        fontSize: "14px",
    },
    actionRow: {
        display: "flex",
        justifyContent: "flex-end",
    },
    primaryButton: {
        padding: "10px 16px",
        borderRadius: "8px",
        border: "none",
        background: "#111111",
        color: "#ffffff",
        cursor: "pointer",
    },
    previewBox: {
        marginTop: "24px",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        padding: "14px",
        background: "#fafafa",
    },
    previewTitle: {
        margin: "0 0 10px",
        fontSize: "16px",
    },
    previewCode: {
        margin: 0,
        overflowX: "auto",
        fontSize: "13px",
    },
};