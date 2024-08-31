import { AuthProvider } from "./contexts/Auth.context.jsx";
import PagesRouter from "./routes/Pages.router.jsx";
import './App.scss';

function App() {

    return (
        <AuthProvider>
            <PagesRouter />
        </AuthProvider>
    );
}

export default App;
