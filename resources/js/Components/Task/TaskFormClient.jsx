import React, { useState } from 'react';
import { z } from 'zod';

const TaskSchema = z.object({
    title: z.string().min(3, "Judul tugas minimal 3 karakter"),
    subject: z.string().min(2, "Mata kuliah wajib diisi"),
    priority: z.enum(["low", "medium", "high"]),
});

export default function TaskFormClient({ onSuccess }) {
    const [formData, setFormData] = useState({ title: '', subject: '', priority: 'medium' });
    const [errors, setErrors] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = TaskSchema.safeParse(formData);
        
        if (!result.success) {
            setErrors(result.error.errors[0].message);
            return;
        }

        setErrors(null);
        if (onSuccess) onSuccess(result.data);
        setFormData({ title: '', subject: '', priority: 'medium' });
    };

    return (
        <form onSubmit={handleSubmit} className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-slate-800">Tambah Entry Tugas (Client Validated)</h3>
            {errors && <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg">{errors}</div>}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                    type="text"
                    placeholder="Judul Tugas..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="px-3 py-2 border rounded-lg text-sm"
                />
                <input
                    type="text"
                    placeholder="Mata Kuliah..."
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="px-3 py-2 border rounded-lg text-sm"
                />
                <button type="submit" className="bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg text-sm hover:bg-indigo-700">
                    + Simpan Tugas
                </button>
            </div>
        </form>
    );
}