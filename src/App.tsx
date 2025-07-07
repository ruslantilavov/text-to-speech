import { useState } from "react";
import LandingPage from "./components/LandingPage";
import VoiceTranslator from "./components/VoiceTranslator";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState<string>("home");

  const handleNavigate = (section: string) => {
    setCurrentView(section);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "translator":
        return <VoiceTranslator />;
      case "home":
      case "features":
      case "contact":
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="App">
      <Navbar onNavigate={handleNavigate} />
      {renderCurrentView()}
    </div>
  );
}

export default App;
