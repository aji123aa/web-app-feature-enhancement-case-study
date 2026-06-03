import React, { useMemo, useState } from "react";

/**
 * Mention Input Demo
 *
 * Confidentiality note:
 * This is a recreated demo implementation using generic mock users and simplified logic.
 * It does not contain company source code, internal APIs, database schema,
 * proprietary product names, or confidential business logic.
 */

const sampleUsers = [
    { id: "user-1", name: "Arun Kumar", role: "Designer" },
    { id: "user-2", name: "Meera Srinivasan", role: "Consultant" },
    { id: "user-3", name: "Rahul Sharma", role: "Content Creator" },
    { id: "user-4", name: "Priya Nair", role: "Reviewer" },
];

const getCurrentMentionQuery = (text) => {
    const cursorText = text;
    const mentionMatch = cursorText.match(/@([a-zA-Z0-9\s]*)$/);

    if (!mentionMatch) {
        return null;
    }

    return mentionMatch[1].toLowerCase();
};

export default function MentionInputDemo() {
    const [content, setContent] = useState("");
    const [selectedMentions, setSelectedMentions] = useState([]);

    const mentionQuery = getCurrentMentionQuery(content);

    const filteredUsers = useMemo(() => {
        if (mentionQuery === null) {
            return [];
        }

        return sampleUsers.filter((user) =>
            user.name.toLowerCase().includes(mentionQuery)
        );
    }, [mentionQuery]);

    const insertMention = (user) => {
        const updatedContent = content.replace(/@([a-zA-Z0-9\s]*)$/, `@${user.name} `);

        setContent(updatedContent);

        setSelectedMentions((currentMentions) => {
            const alreadyAdded = currentMentions.some((item) => item.id === user.id);

            if (alreadyAdded) {
                return currentMentions;
            }

            return [...currentMentions, user];
        });
    };

    const clearDemo = () => {
        setContent("");
        setSelectedMentions([]);
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2 style={styles.title}>Mention Input Demo</h2>

                <p style={styles.description}>
                    Type <strong>@</strong> followed by a name to display user suggestions.
                    Select a user to insert the mention into the text.
                </p>

                <div style={styles.inputWrapper}>
                    <label style={styles.label}>Content</label>

                    <textarea
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        placeholder="Write something and type @ to mention a user..."
                        rows={7}
                        style={styles.textarea}
                    />

                    {filteredUsers.length > 0 && (
                        <div style={styles.suggestionBox}>
                            {filteredUsers.map((user) => (
                                <button
                                    key={user.id}
                                    type="button"
                                    onClick={() => insertMention(user)}
                                    style={styles.suggestionItem}
                                >
                                    <div style={styles.avatar}>{user.name.charAt(0)}</div>

                                    <div>
                                        <div style={styles.userName}>{user.name}</div>
                                        <div style={styles.userRole}>{user.role}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div style={styles.previewBox}>
                    <h3 style={styles.sectionTitle}>Content Preview</h3>
                    <p style={styles.previewText}>
                        {content || "No content added yet."}
                    </p>
                </div>

                <div style={styles.previewBox}>
                    <h3 style={styles.sectionTitle}>Selected Mentions</h3>

                    {selectedMentions.length > 0 ? (
                        <div style={styles.mentionList}>
                            {selectedMentions.map((user) => (
                                <span key={user.id} style={styles.mentionBadge}>
                                    @{user.name}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p style={styles.emptyText}>No users mentioned yet.</p>
                    )}
                </div>

                <div style={styles.actionRow}>
                    <button type="button" onClick={clearDemo} style={styles.secondaryButton}>
                        Clear
                    </button>

                    <button type="button" style={styles.primaryButton}>
                        Save Content
                    </button>
                </div>
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
    inputWrapper: {
        position: "relative",
        marginBottom: "20px",
    },
    label: {
        display: "block",
        marginBottom: "8px",
        fontSize: "14px",
        fontWeight: 600,
    },
    textarea: {
        width: "100%",
        resize: "vertical",
        borderRadius: "10px",
        border: "1px solid #d1d5db",
        padding: "12px",
        fontSize: "15px",
        lineHeight: 1.5,
        outline: "none",
        boxSizing: "border-box",
    },
    suggestionBox: {
        position: "absolute",
        left: 0,
        right: 0,
        top: "100%",
        marginTop: "6px",
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        boxShadow: "0 10px 28px rgba(0, 0, 0, 0.12)",
        overflow: "hidden",
        zIndex: 20,
    },
    suggestionItem: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px",
        border: "none",
        background: "#ffffff",
        cursor: "pointer",
        textAlign: "left",
    },
    avatar: {
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        background: "#eef2ff",
        color: "#3730a3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
    },
    userName: {
        fontSize: "14px",
        fontWeight: 600,
        color: "#111111",
    },
    userRole: {
        marginTop: "2px",
        fontSize: "12px",
        color: "#666666",
    },
    previewBox: {
        marginTop: "18px",
        padding: "14px",
        borderRadius: "10px",
        border: "1px solid #e5e7eb",
        background: "#fafafa",
    },
    sectionTitle: {
        margin: "0 0 10px",
        fontSize: "16px",
    },
    previewText: {
        margin: 0,
        color: "#333333",
        whiteSpace: "pre-wrap",
        lineHeight: 1.5,
    },
    mentionList: {
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
    },
    mentionBadge: {
        padding: "6px 10px",
        borderRadius: "999px",
        background: "#eef6ff",
        color: "#1d4f91",
        fontSize: "13px",
        fontWeight: 600,
    },
    emptyText: {
        margin: 0,
        color: "#777777",
        fontSize: "14px",
    },
    actionRow: {
        marginTop: "22px",
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
    },
    primaryButton: {
        padding: "10px 16px",
        borderRadius: "8px",
        border: "none",
        background: "#111111",
        color: "#ffffff",
        cursor: "pointer",
    },
    secondaryButton: {
        padding: "10px 16px",
        borderRadius: "8px",
        border: "1px solid #cccccc",
        background: "#ffffff",
        color: "#333333",
        cursor: "pointer",
    },
};