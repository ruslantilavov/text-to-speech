import React from "react";

interface ErrorMessageProps {
  error: string | null;
  title?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  title = "Error",
}) => {
  if (!error) return null;

  return (
    <div className="error-message">
      <h2>{title}</h2>
      <p>{error}</p>
    </div>
  );
};
