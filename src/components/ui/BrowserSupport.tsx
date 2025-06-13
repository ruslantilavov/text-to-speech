import React from "react";
import { ERROR_MESSAGES } from "../../constants";

export const BrowserSupport: React.FC = () => {
  return (
    <div className="voice-translator">
      <div className="error-message">
        <h2>Browser Not Supported</h2>
        <p>{ERROR_MESSAGES.BROWSER_NOT_SUPPORTED}</p>
        <p>{ERROR_MESSAGES.BROWSER_RECOMMENDATION}</p>
      </div>
    </div>
  );
};
