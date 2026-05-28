'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Check } from 'lucide-react';

const API_URL = 'http://localhost:5000';

export default function Home() {
  const [todos, setTodos] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  useEffect(() => {
    fetchTodos();
    fetchNotes();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(`${API_URL}/todos`);
    setTodos(res.data);
  };

  const fetchNotes = async () => {
    const res = await axios.get(`${API_URL}/notes`);
    setNotes(res.data);
  };

  const addTodo = async () => {
    if (!newTodo) return;
    await axios.post(`${API_URL}/todos`, { title: newTodo });
    setNewTodo('');
    fetchTodos();
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    await axios.patch(`${API_URL}/todos/${id}`, { completed: !completed });
    fetchTodos();
  };

  const deleteTodo = async (id: string) => {
    await axios.delete(`${API_URL}/todos/${id}`);
    fetchTodos();
  };

  const addNote = async () => {
    if (!newNoteTitle || !newNoteContent) return;
    await axios.post(`${API_URL}/notes`, { title: newNoteTitle, content: newNoteContent });
    setNewNoteTitle('');
    setNewNoteContent('');
    fetchNotes();
  };

  const deleteNote = async (id: string) => {
    await axios.delete(`${API_URL}/notes/${id}`);
    fetchNotes();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">☁️ Cloud Todo & Notes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Todo Section */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-semibold mb-4">✅ Todo List</h2>
            <div className="flex gap-2 mb-4">
              <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} className="flex-1 border rounded-lg px-4 py-2" placeholder="Tambah todo..." />
              <button onClick={addTodo} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"><Plus /></button>
            </div>
            {todos.map((todo) => (
              <div key={todo._id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg mb-2">
                <div className="flex items-center gap-3">
                  <button onClick={() => toggleTodo(todo._id, todo.completed)}>
                    <Check className={todo.completed ? "text-green-500" : "text-gray-300"} />
                  </button>
                  <span className={todo.completed ? "line-through" : ""}>{todo.title}</span>
                </div>
                <button onClick={() => deleteTodo(todo._id)} className="text-red-500"><Trash2 size={18} /></button>
              </div>
            ))}
          </div>

          {/* Notes Section */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-semibold mb-4">📝 Notes</h2>
            <input type="text" value={newNoteTitle} onChange={(e) => setNewNoteTitle(e.target.value)} className="w-full border rounded-lg px-4 py-2 mb-2" placeholder="Judul catatan" />
            <textarea value={newNoteContent} onChange={(e) => setNewNoteContent(e.target.value)} className="w-full border rounded-lg px-4 py-2 mb-2 h-24" placeholder="Isi catatan..." />
            <button onClick={addNote} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">Simpan Note</button>

            <div className="mt-6 space-y-4">
              {notes.map((note) => (
                <div key={note._id} className="border p-4 rounded-lg">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{note.title}</h3>
                    <button onClick={() => deleteNote(note._id)} className="text-red-500"><Trash2 size={18} /></button>
                  </div>
                  <p className="text-gray-600 mt-1">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}