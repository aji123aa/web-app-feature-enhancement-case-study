import React, { useState } from "react";

/**
 * Comment Edit/Delete Demo
 *
 * Confidentiality note:
 * This is a recreated demo implementation using generic naming, mock data,
 * and simplified UI logic. It does not contain company source code,
 * internal APIs, database schema, proprietary product names, or private workflows.
 */

const currentUser = {
    id: "user-101",
    name: "Current User",
};

const initialComments = [
    {
        id: "comment-1",
        userId: "user-101",
        authorName: "Current User",
        content: "This is my comment. I can edit or delete it.",
        createdAt: "2026-06-03T10:00:00Z",
        updatedAt: null,
    },
    {
        id: "comment-2",
        userId: "user-202",
        authorName: "Another User",
        content: "This is another user's comment. I cannot edit or delete it.",
        createdAt: "2026-06-03T10:15:00Z",
        updatedAt: null,
    },
];

const mockUpdateComment = async (commentId, updatedContent) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
        id: commentId,
        content: updatedContent,
        updatedAt: new Date().toISOString(),
    };
};

const mockDeleteComment = async (commentId) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
        success: true,
        deletedCommentId: commentId,
    };
};

const formatDate = (dateValue) => {
    return new Date(dateValue).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

export default function CommentEditorDemo() {
    const [comments, setComments] = useState(initialComments);
    const [editingCommentId, setEditingCommentId] = useState("");
    const [editingContent, setEditingContent] = useState("");
    const [processingCommentId, setProcessingCommentId] = useState("");
    const [message, setMessage] = useState("");

    const isOwnedByCurrentUser = (comment) => {
        return comment.userId === currentUser.id;
    };

    const startEdit = (comment) => {
        setEditingCommentId(comment.id);
        setEditingContent(comment.content);
        setMessage("");
    };

    const cancelEdit = () => {
        setEditingCommentId("");
        setEditingContent("");
        setMessage("");
    };

    const saveEditedComment = async (commentId) => {
        const trimmedContent = editingContent.trim();

        if (!trimmedContent) {
            setMessage("Comment cannot be empty.");
            return;
        }

        setProcessingCommentId(commentId);
        setMessage("");

        try {
            const updatedComment = await mockUpdateComment(commentId, trimmedContent);

            setComments((currentComments) =>
                currentComments.map((comment) =>
                    comment.id === commentId
                        ? {
                            ...comment,
                            content: updatedComment.content,
                            updatedAt: updatedComment.updatedAt,
                        }
                        : comment
                )
            );

            cancelEdit();
            setMessage("Comment updated successfully.");
        } catch (error) {
            setMessage("Failed to update comment.");
        } finally {
            setProcessingCommentId("");
        }
    };

    const deleteComment = async (commentId) => {
        const confirmed = window.confirm("Are you sure you want to delete this comment?");

        if (!confirmed) {
            return;
        }

        setProcessingCommentId(commentId);
        setMessage("");

        try {
            await mockDeleteComment(commentId);

            setComments((currentComments) =>
                currentComments.filter((comment) => comment.id !== commentId)
            );

            if (editingCommentId === commentId) {
                cancelEdit();
            }

            setMessage("Comment deleted successfully.");
        } catch (error) {
            setMessage("Failed to delete comment.");
        } finally {
            setProcessingCommentId("");
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2 style={styles.title}>Comment Edit and Delete Demo</h2>

                <p style={styles.description}>
                    This demo shows how a user can edit or delete only their own comments.
                    Other users' comments are visible but protected from modification.
                </p>

                {message && <div style={styles.message}>{message}</div>}

                <div style={styles.commentList}>
                    {comments.map((comment) => {
                        const isOwner = isOwnedByCurrentUser(comment);
                        const isEditing = editingCommentId === comment.id;
                        const isProcessing = processingCommentId === comment.id;

                        return (
                            <div key={comment.id} style={styles.commentItem}>
                                <div style={styles.commentHeader}>
                                    <div>
                                        <strong>{comment.authorName}</strong>
                                        <div style={styles.dateText}>
                                            {formatDate(comment.createdAt)}
                                            {comment.updatedAt ? " · Edited" : ""}
                                        </div>
                                    </div>

                                    {isOwner && !isEditing && (
                                        <div style={styles.actionGroup}>
                                            <button
                                                type="button"
                                                onClick={() => startEdit(comment)}
                                                disabled={isProcessing}
                                                style={styles.secondaryButton}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => deleteComment(comment.id)}
                                                disabled={isProcessing}
                                                style={styles.dangerButton}
                                            >
                                                {isProcessing ? "Deleting..." : "Delete"}
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {isEditing ? (
                                    <div style={styles.editBox}>
                                        <textarea
                                            value={editingContent}
                                            onChange={(event) => setEditingContent(event.target.value)}
                                            rows={4}
                                            style={styles.textarea}
                                        />

                                        <div style={styles.editActions}>
                                            <button
                                                type="button"
                                                onClick={cancelEdit}
                                                disabled={isProcessing}
                                                style={styles.secondaryButton}
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => saveEditedComment(comment.id)}
                                                disabled={isProcessing}
                                                style={styles.primaryButton}
                                            >
                                                {isProcessing ? "Saving..." : "Save"}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p style={styles.commentText}>{comment.content}</p>
                                )}
                            </div>
                        );
                    })}
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
        maxWidth: "760px",
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
        margin: "0 0 18px",
        color: "#555555",
        lineHeight: 1.5,
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
    commentList: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    },
    commentItem: {
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "16px",
        background: "#fafafa",
    },
    commentHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "12px",
    },
    dateText: {
        marginTop: "4px",
        fontSize: "12px",
        color: "#777777",
    },
    actionGroup: {
        display: "flex",
        gap: "8px",
    },
    commentText: {
        margin: "12px 0 0",
        color: "#333333",
        whiteSpace: "pre-wrap",
        lineHeight: 1.5,
    },
    editBox: {
        marginTop: "12px",
    },
    textarea: {
        width: "100%",
        resize: "vertical",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        padding: "10px",
        fontSize: "14px",
        outline: "none",
        boxSizing: "border-box",
    },
    editActions: {
        marginTop: "10px",
        display: "flex",
        justifyContent: "flex-end",
        gap: "8px",
    },
    primaryButton: {
        padding: "8px 14px",
        borderRadius: "8px",
        border: "none",
        background: "#111111",
        color: "#ffffff",
        cursor: "pointer",
    },
    secondaryButton: {
        padding: "8px 14px",
        borderRadius: "8px",
        border: "1px solid #cccccc",
        background: "#ffffff",
        color: "#333333",
        cursor: "pointer",
    },
    dangerButton: {
        padding: "8px 14px",
        borderRadius: "8px",
        border: "1px solid #f2b8b5",
        background: "#fff5f5",
        color: "#b42318",
        cursor: "pointer",
    },
};