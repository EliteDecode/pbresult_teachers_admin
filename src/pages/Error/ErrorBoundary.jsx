import React, { useState, useEffect, ReactNode } from "react";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  // Custom hook to simulate componentDidCatch behavior
  useEffect(() => {
    const handleError = (event) => {
      console.error("Uncaught error:", event.error, event);
      setHasError(true);
    };

    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  if (hasError) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Something went wrong.</h1>
        <p>Please check your internent connection, refresh and try again.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
