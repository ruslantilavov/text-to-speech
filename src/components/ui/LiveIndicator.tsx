import React from "react";
import { UI_CONFIG } from "../../constants";

interface LiveIndicatorProps {
  isVisible: boolean;
}

export const LiveIndicator: React.FC<LiveIndicatorProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="live-indicator">
      <div className="pulse-dot"></div>
      <p>
        {UI_CONFIG.LIVE_INDICATOR.ICON} {UI_CONFIG.LIVE_INDICATOR.TEXT}
      </p>
    </div>
  );
};
