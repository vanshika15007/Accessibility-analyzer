import React, { useState, useEffect } from "react";

function InputForm({ onAnalyze }) {
  const [url, setUrl] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [touched, setTouched] = useState(false);

  const validateUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    setTouched(true);
    setIsValid(validateUrl(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateUrl(url)) {
      onAnalyze(url);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputWrapper}>
          <input
            type="url"
            value={url}
            onChange={handleUrlChange}
            onBlur={() => setTouched(true)}
            placeholder="Enter website URL (e.g., https://example.com)"
            style={{
              ...styles.input,
              ...((!isValid && touched) && styles.inputError)
            }}
            aria-invalid={!isValid}
            aria-describedby="url-error"
          />
          {(!isValid && touched) && (
            <div id="url-error" style={styles.errorMessage}>
              Please enter a valid URL (e.g., https://example.com)
            </div>
          )}
        </div>
        <button 
          type="submit" 
          style={styles.button}
          disabled={!isValid || !url}
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none' viewBox='0 0 24 24'><path stroke='#fff' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' d='M21 21l-4.35-4.35m1.35-5.15a7 7 0 11-14 0 7 7 0 0114 0z'/></svg>
          Analyze
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto",
    background: "transparent",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
    background: "transparent",
  },
  inputWrapper: {
    flex: "1",
    minWidth: "300px",
    maxWidth: "600px",
    background: "transparent",
  },
  input: {
    padding: "16px 20px",
    borderRadius: "12px",
    border: "2.5px solid #00c6ff",
    width: "100%",
    fontSize: "1.1rem",
    transition: "all 0.2s cubic-bezier(.39,.575,.56,1)",
    outline: "none",
    backgroundColor: "#181a20",
    color: "#fff",
    boxShadow: "0 2px 16px 0 #00c6ff22",
    '::placeholder': {
      color: '#00c6ff',
      opacity: 1,
      fontWeight: 600,
      letterSpacing: '0.5px',
    },
    "&:focus": {
      borderColor: "#00ffb8",
      boxShadow: "0 0 0 4px #00ffb855, 0 2px 16px #00c6ff44",
    },
  },
  inputError: {
    borderColor: "#ff4d4f",
    backgroundColor: "#2d1a1a",
    color: "#fff",
  },
  errorMessage: {
    color: "#ff4d4f",
    fontSize: "0.875rem",
    marginTop: "4px",
    padding: "0 4px",
  },
  button: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "16px 32px",
    background: "linear-gradient(90deg, #00c6ff 0%, #00ffb8 100%)",
    color: "#181a20",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: "700",
    letterSpacing: "0.5px",
    transition: "background 0.2s cubic-bezier(.39,.575,.56,1), box-shadow 0.2s cubic-bezier(.39,.575,.56,1)",
    outline: "none",
    boxShadow: "0 2px 16px #00c6ff44",
    "&:hover": {
      background: "linear-gradient(90deg, #00ffb8 0%, #00c6ff 100%)",
      boxShadow: "0 4px 24px #00ffb888, 0 2px 16px #00c6ff44",
    },
    "&:disabled": {
      background: "#23262f",
      color: "#888",
      cursor: "not-allowed",
      boxShadow: "none",
    },
  },
};

export default InputForm;
