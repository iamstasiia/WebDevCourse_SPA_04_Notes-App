import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashRestore, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../contexts/Auth.context.jsx";

function TrashComponent() {
    const { userId } = useContext(AuthContext);
    const [trashedNotes, setTrashedNotes] = useState([]);
    const [noteToRestore, setNoteToRestore] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
    }, [userId, trashedNotes]);

    const handleRestoreClick = (id) => {
        setNoteToRestore(id);
        setIsModalOpen(true);
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
            setIsModalOpen(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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
                                    Moved to trash on{" "}
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
                                            icon={faTrashRestore}
                                        />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {isModalOpen && (
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
        </div>
    );
}

export default TrashComponent;
