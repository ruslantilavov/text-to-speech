import React from "react";
import { UI_CONFIG } from "../../constants";

interface ControlsProps {
  isListening: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  disabled?: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  isListening,
  onStartListening,
  onStopListening,
  disabled = false,
}) => {
  const buttonConfig = isListening
    ? UI_CONFIG.BUTTONS.STOP
    : UI_CONFIG.BUTTONS.START;

  return (
    <div className="controls">
      <button
        onClick={isListening ? onStopListening : onStartListening}
        className={`live-button ${isListening ? "listening" : ""}`}
        disabled={disabled}
      >
        <span className="button-icon">{buttonConfig.ICON}</span>
        {buttonConfig.TEXT}
      </button>
    </div>
  );
};
