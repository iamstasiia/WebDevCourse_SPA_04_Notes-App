import { useEffect, useState } from "react";

function NotesComponent() {
    const [notes, setNotes] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:3000/notes/${userId}`)
                .then((response) => response.json())
                .then((data) => setNotes(data.answer))
                .catch((error) =>
                    console.error("Error fetching notes:", error),
                );
        }
    }, [userId]);

    return (
        <div>
            <h1>Your Notes</h1>
            {Array.isArray(notes) && notes.length > 0 ? (
                notes.map((note) => (
                    <div key={note._id}>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                        {/* <p>Last edited: {new Date(note.updatedAt).toLocaleString()}</p> */}
                        {/* <button onClick={() => handleDelete(note._id)}>Delete</button>
                        <button onClick={() => handleUpdate(note._id, 'New Title', 'New Content')}>Update</button> */}
                    </div>
                ))
            ) : (
                <p>No notes found</p>
            )}
        </div>
    );
}

export default NotesComponent;
