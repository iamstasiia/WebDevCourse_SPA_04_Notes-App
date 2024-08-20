import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/User.context.jsx";

function NotesComponent() {
    const { userId } = useContext(UserContext);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:3000/notes/${userId}`)
                .then((response) => response.json())
                .then((data) => setNotes(data.answer))
                .catch((error) =>
                    console.error("Error fetching notes:", error),
                );
        } else {
            console.error("User ID not found");
        }
    }, [userId, notes]);

    return (
        <div style={{ padding: "50px" }}>
            <h2>Your notes</h2>
            <ul>
                {notes.map((note) => (
                    <li key={note._id}>{note.content}</li>
                ))}
            </ul>
        </div>
    );
}

export default NotesComponent;
