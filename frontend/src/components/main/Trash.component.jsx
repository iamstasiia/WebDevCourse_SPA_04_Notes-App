import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/Auth.context.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrashCanArrowUp,
    faTrashCan,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

function TrashComponent() {
    const { userId } = useContext(AuthContext);
    const [trashedNotes, setTrashedNotes] = useState([]);
    const [noteToRestore, setNoteToRestore] = useState(null);
    const [noteToDelete, setNoteToDelete] = useState(null);
    const [isModalToRestoreOpen, setIsModalToRestoreOpen] = useState(false);
    const [isModalToDeleteOpen, setIsModalToDeleteOpen] = useState(false);

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:3000/notes/trash/${userId}`)
                .then((response) => response.json())
                .then((data) => setTrashedNotes(data.answer))
                .catch((error) =>
                    console.error("Error fetching trashed notes:", error),
                );
        } else {
            console.error("User ID not found");
        }
    }, [trashedNotes]);

    const handleRestoreClick = (id) => {
        setNoteToRestore(id);
        setIsModalToRestoreOpen(true);
    };

    const handleRestoreNote = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/notes/${noteToRestore}/restore`,
                {
                    method: "PATCH",
                },
            );
            if (response.ok) {
                setTrashedNotes(
                    trashedNotes.filter((note) => note._id !== noteToRestore),
                );
            } else {
                console.error("Failed to restore note");
            }
        } catch (error) {
            console.error("Error restoring note:", error);
        } finally {
            setIsModalToRestoreOpen(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalToRestoreOpen(false);
        setIsModalToDeleteOpen(false);
    };

    const handleDeleteClick = (id) => {
        setNoteToDelete(id);
        setIsModalToDeleteOpen(true);
    };

    const handleDeletePermanently = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/notes/${noteToDelete}`,
                {
                    method: "DELETE",
                },
            );

            if (response.ok) {
                setTrashedNotes(
                    trashedNotes.filter((note) => note._id !== noteToDelete),
                );
            } else {
                console.error("Failed to delete note");
            }
        } catch (error) {
            console.error("Error deleting note:", error);
        } finally {
            setIsModalToDeleteOpen(false);
        }
    };

    return (
        <div className="list-of-notes">
            <h1>Trash</h1>
            {trashedNotes.length === 0 ? (
                <p>No notes in the trash</p>
            ) : (
                <ul>
                    {trashedNotes.map((note) => (
                        <li key={note._id}>
                            <div className="note-content">
                                {note.title && <h3>{note.title}</h3>}
                                <p>{note.content}</p>
                            </div>
                            <div className="note-menu">
                                <small>
                                    deleted{" "}
                                    {new Date(
                                        note.movedToTrashAt,
                                    ).toLocaleDateString("en-UK")}
                                </small>
                                <div className="btns">
                                    <button
                                        onClick={() =>
                                            handleRestoreClick(note._id)
                                        }
                                    >
                                        <FontAwesomeIcon
                                            icon={faTrashCanArrowUp}
                                        />
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteClick(note._id)
                                        }
                                    >
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {isModalToRestoreOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Restore Note?</h2>
                        <button onClick={handleRestoreNote}>
                            Yes, restore
                        </button>
                        <button
                            className="xmark-btn"
                            onClick={handleCloseModal}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                </div>
            )}

            {isModalToDeleteOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Delete Note permanently?</h2>
                        <button onClick={handleDeletePermanently}>
                            Yes, delete
                        </button>
                        <button
                            className="xmark-btn"
                            onClick={handleCloseModal}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TrashComponent;
