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
    try {
      const res = await axios.get(`${API_URL}/todos`);
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${API_URL}/notes`);
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      await axios.post(`${API_URL}/todos`, { title: newTodo });
      setNewTodo('');
      fetchTodos();
    } catch (err) {
      alert("❌ Gagal menambahkan Todo - Backend belum siap");
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      await axios.patch(`${API_URL}/todos/${id}`, { completed: !completed });
      fetchTodos();
    } catch (err) {
      alert("Gagal update todo");
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      fetchTodos();
    } catch (err) {
      alert("Gagal menghapus todo");
    }
  };

  const addNote = async () => {
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;
    try {
      await axios.post(`${API_URL}/notes`, { 
        title: newNoteTitle, 
        content: newNoteContent 
      });
      setNewNoteTitle('');
      setNewNoteContent('');
      fetchNotes();
    } catch (err) {
      alert("❌ Gagal menambahkan Note - Backend belum siap");
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/notes/${id}`);
      fetchNotes();
    } catch (err) {
      alert("Gagal menghapus note");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 text-gray-800 flex items-center justify-center gap-3">
          ☁️ Cloud Todo & Notes
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Todo Section */}
          <div className="bg-white p-8 rounded-3xl shadow-xl">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">✅ Todo List</h2>
            
            <div className="flex gap-3 mb-8">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="flex-1 border border-gray-300 rounded-2xl px-5 py-4 text-lg text-black focus:outline-none focus:border-blue-500"
                placeholder="Tambah tugas baru..."
              />
              <button 
                onClick={addTodo} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl transition"
              >
                <Plus size={28} />
              </button>
            </div>

            <div className="space-y-4">
              {todos.map((todo) => (
                <div key={todo._id} className="flex items-center justify-between bg-gray-50 p-5 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <button onClick={() => toggleTodo(todo._id, todo.completed)}>
                      <Check className={todo.completed ? "text-green-500" : "text-gray-400"} size={28} />
                    </button>
                    <span className={`text-lg ${todo.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                      {todo.title}
                    </span>
                  </div>
                  <button onClick={() => deleteTodo(todo._id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={24} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-white p-8 rounded-3xl shadow-xl">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">📝 Notes</h2>
            
            <input
              type="text"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 mb-4 text-lg text-black"
              placeholder="Judul catatan"
            />
            <textarea
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 h-40 mb-4 text-lg text-black"
              placeholder="Isi catatan..."
            />
            <button 
              onClick={addNote} 
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl text-lg font-medium transition"
            >
              Simpan Catatan
            </button>

            <div className="mt-8 space-y-6">
              {notes.map((note) => (
                <div key={note._id} className="border border-gray-200 p-6 rounded-3xl">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-xl text-gray-800">{note.title}</h3>
                    <button onClick={() => deleteNote(note._id)} className="text-red-500">
                      <Trash2 size={24} />
                    </button>
                  </div>
                  <p className="text-gray-700 mt-3 whitespace-pre-wrap">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}