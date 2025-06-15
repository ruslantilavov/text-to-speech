import React from "react";
import { UI_CONFIG } from "../../constants";

interface LiveIndicatorProps {
  isVisible: boolean;
  hasTranscript?: boolean;
}

export const LiveIndicator: React.FC<LiveIndicatorProps> = ({
  isVisible,
  hasTranscript = false,
}) => {
  if (!isVisible) return null;

  return (
    <div className="live-indicator">
      <div className="pulse-dot"></div>
      <div className="indicator-content">
        <p className="indicator-main">
          {UI_CONFIG.LIVE_INDICATOR.ICON} {UI_CONFIG.LIVE_INDICATOR.TEXT}
        </p>
        {hasTranscript && (
          <p className="indicator-status">📝 Real-time transcription active</p>
        )}
      </div>
    </div>
  );
};
