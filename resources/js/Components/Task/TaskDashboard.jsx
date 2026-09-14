import React, { useState } from 'react';

export default function TaskDashboard({ initialTasks = [] }) {
    const [tasks, setTasks] = useState(initialTasks.length > 0 ? initialTasks : [
        { id: 1, title: 'Analisis SRS EduMate-AI', category: 'Proyek Akhir', completed: true },
        { id: 2, title: 'Slicing UI Komponen React 19', category: 'Praktikum', completed: false },
        { id: 3, title: 'Pengujian SonarQube & Zod Validation', category: 'QA', completed: false }
    ]);
    const [filter, setFilter] = useState('all');
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [category, setCategory] = useState('Praktikum');

    // Filter Tasks (Auto-memoized pada React 19)
    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'active') return !task.completed;
        return true;
    });

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;
        setTasks([...tasks, { id: Date.now(), title: newTaskTitle, category, completed: false }]);
        setNewTaskTitle('');
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">EduMate Task Dashboard</h2>
            
            <form onSubmit={handleAddTask} className="flex gap-3 mb-6">
                <input
                    type="text"
                    placeholder="Tambah tugas/materi baru..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                />
                <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-3 py-2 border rounded-lg text-sm bg-slate-50"
                >
                    <option value="Praktikum">Praktikum</option>
                    <option value="Teori">Teori</option>
                    <option value="Proyek Akhir">Proyek Akhir</option>
                </select>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg text-sm hover:bg-indigo-700">
                    Tambah
                </button>
            </form>

            <div className="flex gap-2 mb-4">
                {['all', 'active', 'completed'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${
                            filter === f ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <ul className="space-y-2">
                {filteredTasks.map(task => (
                    <li key={task.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <span className={`text-sm ${task.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                            <strong>[{task.category}]</strong> {task.title}
                        </span>
                        <button
                            onClick={() => toggleTask(task.id)}
                            className={`px-3 py-1 text-xs rounded-md ${
                                task.completed ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                            }`}
                        >
                            {task.completed ? 'Batal' : 'Selesai'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}