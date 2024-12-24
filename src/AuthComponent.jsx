import React, { useState, useEffect } from 'react';
import './AuthStyles.css';

const AuthComponent = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [notes, setNotes] = useState([]);
    const [noteContent, setNoteContent] = useState('');
    const [filterText, setFilterText] = useState('');
    const [editingNoteId, setEditingNoteId] = useState(null);

    // Check if user is already logged in
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // get the notes of logged-in user
    useEffect(() => {
        if (user) {
            const userNotes = JSON.parse(localStorage.getItem(`notes_${user.email}`)) || [];
            setNotes(userNotes);
        }
    }, [user]);

    // Handle form submission 
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (isLogin) {
            // Login logic
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            const matchedUser = storedUsers.find((u) => u.email === email && u.password === password);
            if (matchedUser) {
                setUser(matchedUser);
                localStorage.setItem('user', JSON.stringify(matchedUser));
                setMessage(`Welcome back, ${matchedUser.name}!`);
            } else {
                setError('Invalid email or password');
            }
        } else {
            // Registration logic
            if (name && email && password) {
                const newUser = { name, email, password };
                const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
                storedUsers.push(newUser);
                localStorage.setItem('users', JSON.stringify(storedUsers));
                setMessage('Successfully Signed Up!');
                setName('');
                setEmail('');
                setPassword('');
            } else {
                setError('Please fill in all fields');
            }
        }
    };

    // Logout functionality
    const handleLogout = () => {
        setUser(null);
        setMessage('');
        localStorage.removeItem('user'); //removes the user from storage
        setNotes([]);
    };

    // Add a note
    const handleAddNote = () => {
        if (!noteContent) return;
        const newNote = { id: Date.now(), content: noteContent };
        const updatedNotes = [...notes, newNote];
        setNotes(updatedNotes);
        localStorage.setItem(`notes_${user.email}`, JSON.stringify(updatedNotes));
        setNoteContent('');
    };

    // Delete a note
    const handleDeleteNote = (id) => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
        localStorage.setItem(`notes_${user.email}`, JSON.stringify(updatedNotes));
    };

    // Edit a note
    const handleEditNote = (id) => {
        const noteToEdit = notes.find((note) => note.id === id);
        setNoteContent(noteToEdit.content);
        setEditingNoteId(id);
    };

    // Update an existing note
    const handleUpdateNote = () => {
        const updatedNotes = notes.map((note) =>
            note.id === editingNoteId ? { ...note, content: noteContent } : note
        );
        setNotes(updatedNotes);
        localStorage.setItem(`notes_${user.email}`, JSON.stringify(updatedNotes));
        setNoteContent('');
        setEditingNoteId(null);
    };

    // Filter notes by content
    const handleFilterNotes = (e) => {
        setFilterText(e.target.value);
    };

    const filteredNotes = notes.filter((note) =>
        note.content.toLowerCase().includes(filterText.toLowerCase())
    );

    // notes dashboard when login
    if (user) {
        return (
            <div className="notesArea">
                <h2 className="UserWelcome">Welcome, {user.name}!</h2> 
                <h2 className="notes-title">Notes</h2>
                <div className="notesDashboard">
                    <div className="note-form">
                        <textarea
                            value={noteContent}
                            onChange={(e) => setNoteContent(e.target.value)}
                            placeholder="Write a note..."
                            className="nInput"
                        />
                        {editingNoteId ? (
                            <button onClick={handleUpdateNote} className="actBtn">Update Note</button>
                        ) : (
                            <button onClick={handleAddNote} className="actBtn">Add Note</button>
                        )}
                    </div>

                    <input
                        type="text"
                        value={filterText}
                        onChange={handleFilterNotes}
                        placeholder="Filter notes"
                        className="filter"
                    />

                    <div className="List">
                        {filteredNotes.map((note) => (
                            <div key={note.id} className="noteData">
                                <p>{note.content}</p>
                                <div className="note-actions">
                                    <button onClick={() => handleEditNote(note.id)} className="editBtn">Edit</button>
                                    <button onClick={() => handleDeleteNote(note.id)} className="deleteBtn">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={handleLogout} className="mainBtn logout-button">Logout</button>
            </div>
        );
    }

    // Login or Sign Up form
    return (
        <div className="MainContainer">
            <div className="loginArea">
                <h2 className="title">{isLogin ? 'Login' : 'Create Account'}</h2>
                {message && (
                    <div className="loginSuccess">
                        <p>{message}</p>
                        {!isLogin && (
                            <button onClick={() => setIsLogin(true)} className="mainBtn login-button">
                                Go to Login
                            </button>
                        )}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="Form">
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="inputLogin"
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="inputLogin"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="inputLogin"
                    />
                    {error && <p className="loginError">{error}</p>}
                    <button type="submit" className="mainBtn">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <p className="LoginSwitch">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button 
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setMessage('');
                            setError('');
                        }} 
                        className="loginSwitchBtn"
                    >
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthComponent;
