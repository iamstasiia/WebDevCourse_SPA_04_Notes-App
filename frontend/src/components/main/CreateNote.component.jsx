import { useState, useContext } from "react";
import { UserContext } from "../../contexts/User.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

function CreateNoteComponent() {
    const { userId } = useContext(UserContext);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [newNoteFormOpen, setNewNoteFormOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/notes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, title, content }),
        });
        const data = await response.json();
        console.log(data);

        setTitle("");
        setContent("");
        setNewNoteFormOpen(false);
    };

    return (
        <>
            {newNoteFormOpen && (
                <div className="new-note-overlay">
                    <div className="new-note-content">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <textarea
                                placeholder="Content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <button type="submit">Create Note</button>
                        </form>
                        <button
                            className="xmark-btn"
                            onClick={() => {
                                setNewNoteFormOpen(false);
                            }}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                </div>
            )}

            <button className="plus-btn"
                onClick={() => {
                    setNewNoteFormOpen(true);
                }}
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </>
    );
}

export default CreateNoteComponent;
