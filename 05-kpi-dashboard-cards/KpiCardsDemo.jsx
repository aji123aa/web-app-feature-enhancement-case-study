import React from "react";

/**
 * KPI Dashboard Cards Demo
 *
 * Confidentiality note:
 * This is a recreated demo implementation using generic mock data.
 * It does not contain company source code, internal APIs, private database fields,
 * proprietary UI design, product names, or confidential business logic.
 */

const contentItems = [
    { id: 1, title: "Post One", status: "published", views: 1200, comments: 14 },
    { id: 2, title: "Post Two", status: "draft", views: 0, comments: 0 },
    { id: 3, title: "Post Three", status: "scheduled", views: 0, comments: 0 },
    { id: 4, title: "Post Four", status: "published", views: 850, comments: 7 },
    { id: 5, title: "Post Five", status: "published", views: 430, comments: 3 },
];

const calculateKpis = (items) => {
    return {
        totalPosts: items.length,
        publishedPosts: items.filter((item) => item.status === "published").length,
        draftPosts: items.filter((item) => item.status === "draft").length,
        scheduledPosts: items.filter((item) => item.status === "scheduled").length,
        totalViews: items.reduce((total, item) => total + item.views, 0),
        totalComments: items.reduce((total, item) => total + item.comments, 0),
    };
};

const KpiCard = ({ title, value, description }) => {
    return (
        <div style={styles.kpiCard}>
            <p style={styles.cardTitle}>{title}</p>
            <h3 style={styles.cardValue}>{value}</h3>
            <p style={styles.cardDescription}>{description}</p>
        </div>
    );
};

export default function KpiCardsDemo() {
    const kpis = calculateKpis(contentItems);

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h2 style={styles.title}>Content Dashboard KPI Cards</h2>

                <p style={styles.description}>
                    This demo shows how KPI cards can be used to summarize content-related
                    statistics in a dashboard interface.
                </p>

                <div style={styles.grid}>
                    <KpiCard
                        title="Total Posts"
                        value={kpis.totalPosts}
                        description="All created content items"
                    />

                    <KpiCard
                        title="Published"
                        value={kpis.publishedPosts}
                        description="Content currently visible to users"
                    />

                    <KpiCard
                        title="Drafts"
                        value={kpis.draftPosts}
                        description="Content saved but not published"
                    />

                    <KpiCard
                        title="Scheduled"
                        value={kpis.scheduledPosts}
                        description="Content planned for future publishing"
                    />

                    <KpiCard
                        title="Total Views"
                        value={kpis.totalViews.toLocaleString()}
                        description="Combined views across published content"
                    />

                    <KpiCard
                        title="Comments"
                        value={kpis.totalComments}
                        description="Total user interactions through comments"
                    />
                </div>

                <div style={styles.tableCard}>
                    <h3 style={styles.sectionTitle}>Sample Content List</h3>

                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Title</th>
                                <th style={styles.th}>Status</th>
                                <th style={styles.th}>Views</th>
                                <th style={styles.th}>Comments</th>
                            </tr>
                        </thead>

                        <tbody>
                            {contentItems.map((item) => (
                                <tr key={item.id}>
                                    <td style={styles.td}>{item.title}</td>
                                    <td style={styles.td}>
                                        <span style={styles.statusBadge}>{item.status}</span>
                                    </td>
                                    <td style={styles.td}>{item.views}</td>
                                    <td style={styles.td}>{item.comments}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
    container: {
        maxWidth: "1050px",
        margin: "0 auto",
    },
    title: {
        margin: "0 0 8px",
        fontSize: "26px",
    },
    description: {
        margin: "0 0 24px",
        color: "#555555",
        lineHeight: 1.5,
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px",
    },
    kpiCard: {
        background: "#ffffff",
        borderRadius: "14px",
        padding: "20px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
        border: "1px solid #eeeeee",
    },
    cardTitle: {
        margin: "0 0 10px",
        fontSize: "14px",
        color: "#666666",
        fontWeight: 600,
    },
    cardValue: {
        margin: "0 0 8px",
        fontSize: "30px",
    },
    cardDescription: {
        margin: 0,
        fontSize: "13px",
        color: "#777777",
        lineHeight: 1.4,
    },
    tableCard: {
        marginTop: "28px",
        background: "#ffffff",
        borderRadius: "14px",
        padding: "20px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
        overflowX: "auto",
    },
    sectionTitle: {
        margin: "0 0 16px",
        fontSize: "18px",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
    th: {
        textAlign: "left",
        padding: "12px",
        borderBottom: "1px solid #e5e7eb",
        fontSize: "14px",
        color: "#444444",
    },
    td: {
        padding: "12px",
        borderBottom: "1px solid #f0f0f0",
        fontSize: "14px",
        color: "#333333",
    },
    statusBadge: {
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: "999px",
        background: "#f1f5f9",
        textTransform: "capitalize",
        fontSize: "12px",
        fontWeight: 600,
    },
};