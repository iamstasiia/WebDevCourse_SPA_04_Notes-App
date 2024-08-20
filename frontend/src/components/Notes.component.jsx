import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/User.context.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

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
                        <div className="note-content">
                            <h3>{note.title}</h3>
                            <p>{note.content}</p>
                        </div>
                        <div className="note-menu">
                            <small>created {note.createdAt.slice(0, 10)}</small>
                            <button><FontAwesomeIcon icon={faTrashCan} /></button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NotesComponent;
