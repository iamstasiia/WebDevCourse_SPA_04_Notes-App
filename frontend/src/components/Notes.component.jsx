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
        <div className="list-of-notes">
            <h1>Your MindPad*</h1>
            <ul>
                {notes.map((note) => (
                    <li key={note._id}>
                        <div>
                            <h3>{note.title}</h3>
                            <p>{note.content}</p>
                        </div>
                        <small>created {note.createdAt.slice(0, 10)}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NotesComponent;
