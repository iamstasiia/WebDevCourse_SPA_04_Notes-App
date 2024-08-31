import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
    RouterProvider,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/Auth.context.jsx";
import WelcomePage from "../pages/welcome/Welcome.page.jsx";
import SignInPage from "../pages/login/SignIn.page.jsx";
import SignUpPage from "../pages/login/SignUp.page.jsx";
import UserPage from "../pages/userpage/User.page.jsx";
import NotesComponent from "../components/main/Notes.component.jsx";
import TrashComponent from "../components/main/Trash.component.jsx";

function PagesRouter() {
    const { isAuthenticated, userId } = useContext(AuthContext);
    const pagesRouter = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/welcome" element={isAuthenticated ? <Navigate to='/notes' /> : <WelcomePage />} />
                <Route path="/auth">
                    <Route path="login" element={isAuthenticated ? <Navigate to='/notes' /> : <SignInPage />} />
                    <Route path="register" element={isAuthenticated ? <Navigate to='/notes' /> : <SignUpPage />} />
                </Route>
                <Route path="/notes" element={isAuthenticated ? <UserPage /> : <Navigate to='/welcome' />}>
                    <Route index element={<NotesComponent />} />
                    <Route path="trash" element={<TrashComponent />} />
                </Route>

                <Route path="*" element={isAuthenticated ? <Navigate to='/notes' /> : <Navigate to='/welcome' />} />
            </>,
        ),
    );
console.log(isAuthenticated);
console.log(userId);

    return (
            <RouterProvider router={pagesRouter} />
    );
}

export default PagesRouter;
