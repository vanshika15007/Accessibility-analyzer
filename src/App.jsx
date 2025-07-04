import React, { useState } from "react";
import InputForm from "./components/InputForm";
import Report from "./components/Report";

function App() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [retries, setRetries] = useState(0);

  const handleAnalyze = async (url, isRetry = false) => {
    if (!isRetry) {
      console.log("Analyzing URL:", url);
    } else {
      console.log("Retrying analysis for:", url);
    }
    
    setLoading(true);
    setError("");
    
    if (!isRetry) {
      setReport(null);
      setRetries(0);
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 40000); // 40 second timeout

      const response = await fetch("https://accessibility-analyzer-backend-tzan.onrender.com/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const data = await response.json();
      setReport(data);
      setRetries(0);
    } catch (err) {
      console.error("Analysis error:", err);
      
      if (err.name === "AbortError") {
        setError("Request timed out. Please try again.");
      } else if (!navigator.onLine) {
        setError("No internet connection. Please check your connection and try again.");
      } else if (err.message.includes("Failed to fetch")) {
        setError("Could not connect to the analysis server. Please ensure it's running.");
      } else {
        setError(err.message || "Something went wrong during analysis.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (retries < 3 && report === null) {
      setRetries(prev => prev + 1);
      handleAnalyze(document.querySelector('input[type="url"]').value, true);
    }
  };

  return (
    <>
      <div style={styles.appBg} />
      <div style={{
        ...styles.container,
        background: "#181a20",
        backgroundColor: "#181a20"
      }}>
        <div style={styles.accentBar}></div>
        <h1 style={styles.heading}>🌐 Accessibility Analyzer</h1>
        <span style={styles.headingAccent}></span>
        <InputForm onAnalyze={handleAnalyze} />
        
        {loading && (
          <div style={styles.loadingPanel}>
            <svg
              width="60"
              height="60"
              viewBox="0 0 54 54"
              style={{
                display: "block",
                margin: "0 auto",
                animation: "spin 1.8s cubic-bezier(.39,.575,.56,1) infinite, globe-glow 1.8s ease-in-out infinite"
              }}
              aria-label="Loading"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="globe-anim"
                cx="27"
                cy="27"
                r="25"
                stroke="#00c6ff"
                strokeWidth="4"
                fill="#e3f6ff"
              />
              <ellipse
                className="globe-anim"
                cx="27"
                cy="27"
                rx="18"
                ry="25"
                stroke="#00c6ff"
                strokeWidth="2"
              />
              <ellipse
                className="globe-anim"
                cx="27"
                cy="27"
                rx="25"
                ry="10"
                stroke="#00c6ff"
                strokeWidth="2"
              />
              <circle cx="27" cy="27" r="2.5" fill="#00c6ff"/>
            </svg>
            <div style={styles.loadingText}>
              <div style={styles.loadingTitle}>Analyzing website…</div>
              <div style={styles.loadingSubtitle}>This may take a few moments</div>
            </div>
          </div>
        )}
        
        {error && (
          <div style={styles.errorContainer}>
            <p style={styles.error}>{error}</p>
            {retries < 3 && (
              <button onClick={handleRetry} style={styles.retryButton}>
                Try Again
              </button>
            )}
          </div>
        )}
        
        {report && <Report report={report} />}
      </div>
    </>
  );
}

const styles = {
  appBg: {
    background: "linear-gradient(135deg, #0f2027 0%, #2c5364 50%, #00c6ff 100%)",
    minHeight: "200vh",
    width: "100vw",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: -1,
    animation: "bgMove 12s ease-in-out infinite alternate",
    backgroundSize: "200% 200%",
    pointerEvents: "none",
  },
  accentBar: {
    width: "100%",
    height: "6px",
    borderTopLeftRadius: "18px",
    borderTopRightRadius: "18px",
    background: "linear-gradient(90deg, #00ffb8 0%, #00c6ff 50%, #ff4d4f 100%)",
    boxShadow: "0 0 16px 2px #00c6ff66, 0 2px 8px #0008",
    marginBottom: "-12px",
    animation: "accentMove 4s linear infinite alternate",
    backgroundSize: "200% 200%",
  },
  container: {
    padding: "2.5rem 2rem 2rem 2rem",
    width: "100%",
    maxWidth: "700px",
    margin: "64px auto",
    fontFamily: "Segoe UI, system-ui, sans-serif",
    borderRadius: "22px",
    boxShadow: "0 8px 40px 0 rgba(0,198,255,0.22), 0 2px 24px 0 #0008",
    border: "2.5px solid #00c6ff",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#fff",
    backdropFilter: "blur(10px)",
    pointerEvents: "auto",
  },
  heading: {
    textAlign: "center",
    marginBottom: "24px",
    color: "#00ffb8",
    fontWeight: 900,
    fontSize: "2.4rem",
    letterSpacing: "1.5px",
    fontFamily: "Segoe UI, SegoeUI-Bold, Arial, sans-serif",
    textShadow: "0 2px 16px #00c6ff99, 0 1px 0 #000a",
    position: "relative",
    zIndex: 2,
  },
  headingAccent: {
    display: "block",
    width: "70px",
    height: "5px",
    margin: "14px auto 0 auto",
    borderRadius: "2px",
    background: "linear-gradient(90deg, #00ffb8 0%, #00c6ff 50%, #ff4d4f 100%)",
    opacity: 0.9,
    boxShadow: "0 0 8px #00c6ff88",
  },
  loadingPanel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    marginTop: "2rem",
  },
  loadingText: {
    textAlign: "center",
  },
  loadingTitle: {
    color: "#00c6ff",
    fontSize: "1.2rem",
    fontWeight: 600,
  },
  loadingSubtitle: {
    color: "#00c6ff",
    fontSize: "1rem",
    fontWeight: 400,
  },
  errorContainer: {
    textAlign: "center",
    marginTop: "2rem",
    padding: "1rem",
    backgroundColor: "#d0f0fd",
    borderRadius: "10px",
    border: "1.5px solid #00c6ff",
  },
  error: {
    color: "#00c6ff",
    fontSize: "1.1rem",
    marginBottom: "1rem",
    fontWeight: 700,
    letterSpacing: "0.5px",
    textShadow: "0 1px 4px #000a",
  },
  retryButton: {
    padding: "12px 28px",
    background: "linear-gradient(90deg, #00c6ff 0%, #00ffb8 100%)",
    color: "#181a20",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: 700,
    transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
    outline: "none",
    boxShadow: "0 2px 12px #00c6ff44",
  },
  '@keyframes bgMove': {
    '0%': { backgroundPosition: '0% 50%' },
    '100%': { backgroundPosition: '100% 50%' },
  },
  '@keyframes accentMove': {
    '0%': { backgroundPosition: '0% 50%' },
    '100%': { backgroundPosition: '100% 50%' },
  },
  spinner: {
    width: "54px",
    height: "54px",
    border: "6px solid rgba(0,198,255,0.10)",
    borderTop: "6px solid",
    borderImage: "linear-gradient(90deg, #00c6ff 0%, #00ffb8 100%) 1",
    borderRadius: "50%",
    boxShadow: "0 0 16px #00c6ff88, 0 2px 8px #00ffb888",
    animation: "spin 1s linear infinite",
    background: "transparent",
  },
};

export default App;
