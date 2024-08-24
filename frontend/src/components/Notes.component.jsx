import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/User.context.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

function NotesComponent() {
    const { userId } = useContext(UserContext);
    const [notes, setNotes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);

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

    const handleDeleteClick = (id) => {
        setNoteToDelete(id);
        setIsModalOpen(true);
    };

    const handleMoveToTrash = () => {
        setIsModalOpen(false);
    };

    const handleDeletePermanently = async () => {
        try {
            const response = await fetch(`http://localhost:3000/notes/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setNotes(notes.filter(note => note._id !== noteToDelete));
            } else {
                console.error('Failed to delete note');
            }
        } catch (error) {
            console.error('Error deleting note:', error);
        } finally {
            setIsModalOpen(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const formatDate = (dateString) => {
        // const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-UK', options);
    };

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
                            <small>created {formatDate(note.createdAt)}</small>
                            <button onClick={() => handleDeleteClick(note._id)}><FontAwesomeIcon icon={faTrashCan} /></button>
                        </div>
                    </li>
                ))}
            </ul>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Move to Trash or Delete Permanently?</h2>
                        <button onClick={handleMoveToTrash}>Move to Trash</button>
                        <button onClick={handleDeletePermanently}>Delete Permanently</button>
                        <button onClick={handleCloseModal}>Cancel</button>
                    </div>
                </div>
            )}
            
        </div>
    );
}

export default NotesComponent;
