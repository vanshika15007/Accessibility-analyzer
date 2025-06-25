import React from "react";

function Report({ report }) {
  const getColor = (impact) => {
    switch (impact) {
      case "critical": return "#e74c3c";
      case "serious": return "#e67e22";
      case "moderate": return "#f1c40f";
      case "minor": return "#2ecc71";
      default: return "#999";
    }
  };

  return (
    <div>
      <h2>🔍 Issues Found: {report.length}</h2>
      {report.map((issue, index) => (
        <div key={index} style={styles.card}>
          <h3 style={styles.title}>
            ⚠️ {issue.help}
          </h3>
          <p><strong>Description:</strong> {issue.description}</p>
          <p><strong>Impact:</strong> {issue.impact}</p>
          <p><strong>Affected Elements:</strong></p>
          <ul>
            {issue.nodes.map((node, i) => (
              <li key={i}><code style={styles.code}>{node.html}</code></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    background: "#e3f6ff",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    marginBottom: "20px",
    color: "#111",
  },
  title: {
    fontSize: "1.2rem",
    marginBottom: "10px",
    color: "#e74c3c",
    fontWeight: "bold",
  },
  code: {
    backgroundColor: "#f4f4f4",
    padding: "6px",
    borderRadius: "4px",
    display: "inline-block",
    fontFamily: "monospace",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    marginTop: "2rem",
    animation: "spin 1s linear infinite",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid rgba(0, 0, 0, 0.1)",
    borderTopColor: "#e74c3c",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

export default Report;
