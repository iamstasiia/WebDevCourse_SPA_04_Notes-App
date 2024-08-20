import { useState, useEffect } from "react";
import WelcomeComponent from "./components/Welcome.component.jsx";
import AuthComponent from "./components/Auth.component.jsx";
import UserMenuComponent from "./components/UserMenu.component.jsx";
import NotesComponent from "./components/Notes.component.jsx";
import CreateNoteComponent from "./components/CreateNote.component.jsx";
import { UserProvider } from "./contexts/User.context.jsx";
import "./App.scss";

function App() {
    const [step, setStep] = useState(0);

    useEffect(() => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        setStep(2);
      }
    }, []);

    const handleStart = () => {
        setStep(1);
    };

    const handleAuthSuccess = () => {
        setStep(2);
    };

    const handleLogout = () => {
      setStep(1);
    };

    return (
        <UserProvider>
            <h1>MindPad</h1>
            {step === 0 && <WelcomeComponent onStart={handleStart} />}
            {step === 1 && <AuthComponent onAuthSuccess={handleAuthSuccess} />}
            {step === 2 && (
              <>
                <UserMenuComponent onLogout={handleLogout} />
                <NotesComponent />
                <CreateNoteComponent />
              </>
            )}
        </UserProvider>
    );
}

export default App;
