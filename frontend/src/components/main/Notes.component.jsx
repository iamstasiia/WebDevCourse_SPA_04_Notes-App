import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "../../contexts/Auth.context.jsx";

function NotesComponent() {
    const { userId } = useContext(AuthContext);
    const [notes, setNotes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");

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

    const handleMoveToTrash = async () => {
        try {
            const response = await fetch(`http://localhost:3000/notes/${noteToDelete}/moveToTrash`, {
                method: 'PATCH',
            });
            if (response.ok) {
                setNotes(notes.map(note => note._id === noteToDelete ? { ...note, isInTrash: true } : note));
            } else {
                console.error("Failed to move note to trash");
            }
        } catch (error) {
            console.error("Error moving note to trash:", error);
        } finally {
            setIsModalOpen(false);
        }
    };

    const handleDeletePermanently = async () => {
        try {
            const response = await fetch(`http://localhost:3000/notes/${noteToDelete}`, {
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

    const formatContent = (content) => {
        return content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
        ));
    };

    const handleEditClick = (note) => {
        setIsEditMode(true);
        setNoteToEdit(note._id);
        setEditTitle(note.title);
        setEditContent(note.content);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await fetch(`http://localhost:3000/notes/${noteToEdit}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: editTitle, content: editContent }),
            });
            if (response.ok) {
                const updatedNote = await response.json();
                setNotes(notes.map(note => note._id === noteToEdit ? updatedNote.note : note));
            } else {
                console.error("Failed to update note");
            }
        } catch (error) {
            console.error("Error updating note:", error);
        } finally {
            setIsEditMode(false);
            setNoteToEdit(null);
        }
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
        setNoteToEdit(null);
    };

    return (
        <div className="list-of-notes">
            <h1>Your MindPad*</h1>
            {isEditMode ? (
                <div className="edit-form">
                    <label htmlFor="edit-title">Title</label>
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        id="edit-title"
                    />
                    <label htmlFor="edit-content">Content</label>
                    <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        id="edit-content"
                    />
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
            </div>
            ) : ( notes.length === 0 ? (
            <p>Create your first note</p>
            ) : (
            <ul>
                {notes.map((note) => (
                    <li key={note._id}>
                        <div className="note-content">
                            {note.title && (<h3>{note.title}</h3>)}
                            {formatContent(note.content)}
                        </div>
                        <div className="note-menu">
                            <small>
                                {note.updatedAt ? `edited ${formatDate(note.updatedAt)}` : `created ${formatDate(note.createdAt)}`}
                            </small>
                            <div className="btns">
                                <button onClick={() => handleEditClick(note)}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                                <button onClick={() => handleDeleteClick(note._id)}><FontAwesomeIcon icon={faTrashCan} /></button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            ))}

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Move to Trash?</h2>
                        <button onClick={handleMoveToTrash}>Yes</button>
                        <button onClick={handleDeletePermanently}>No, delete permanently</button>
                        <button className="xmark-btn" onClick={handleCloseModal}><FontAwesomeIcon icon={faXmark} /></button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default NotesComponent;

