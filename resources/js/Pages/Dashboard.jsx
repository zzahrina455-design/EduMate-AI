import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
  return (
    <div className="bg-slate-50 text-slate-800 font-sans antialiased min-h-screen flex flex-col justify-between">
      <Head title="Dashboard Utama - EduMate AI" />

      {/* Header Semantik */}
      <header className="bg-slate-900 text-white shadow-md" role="banner">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl tracking-wider">
              EM
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">EduMate AI</h1>
              <p className="text-xs text-slate-400">Dashboard Utama Pembelajaran - SV UNS</p>
            </div>
          </div>

          {/* Navigasi Utama */}
          <nav aria-label="Navigasi Utama">
            <ul className="flex space-x-6 text-sm font-medium">
              <li>
                <Link href="/dashboard" className="text-blue-400 font-semibold" aria-current="page">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-slate-300 hover:text-white transition">
                  Tanya-Jawab AI
                </Link>
              </li>
              <li>
                <Link href="/upload" className="text-slate-300 hover:text-white transition">
                  Unggah RPS/Modul
                </Link>
              </li>
              <li>
                <Link href="/history" className="text-slate-300 hover:text-white transition">
                  Riwayat Chat
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Konten Utama Dashboard */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full space-y-6" role="main">
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">Selamat Datang di EduMate AI 👋</h2>
            <p className="text-xs text-slate-500">
              Siap melanjutkan pembelajaran berbasis dokumen RPS dan Modul hari ini?
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 border border-emerald-200">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Vector DB Ready
            </span>
            <Link
              href="/chat"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-xs transition"
            >
              Mulai Chat AI 🚀
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/chat"
            className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition space-y-2 group"
          >
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition">
              💬
            </div>
            <h3 className="text-sm font-bold text-slate-900">Tanya Jawab AI</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Ajukan pertanyaan terkait materi kuliah dan dapatkan balasan berbasis sitasi RPS/Modul.
            </p>
          </Link>

          <Link
            href="/upload"
            className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition space-y-2 group"
          >
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center font-bold text-lg group-hover:bg-purple-600 group-hover:text-white transition">
              📂
            </div>
            <h3 className="text-sm font-bold text-slate-900">Unggah Dokumen Dosen</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Kelola dan tambahkan berkas RPS atau Modul Praktikum baru ke dalam basis data RAG.
            </p>
          </Link>

          <Link
            href="/history"
            className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition space-y-2 group"
          >
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center font-bold text-lg group-hover:bg-emerald-600 group-hover:text-white transition">
              🕒
            </div>
            <h3 className="text-sm font-bold text-slate-900">Riwayat Percakapan</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Akses kembali log pertanyaan dan jawaban materi yang pernah kamu ajukan sebelumnya.
            </p>
          </Link>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 text-xs py-4 text-center border-t border-slate-800" role="contentinfo">
        <p>&copy; 2026 D3 Teknik Informatika Sekolah Vokasi UNS. Modul Praktikum Pemrograman Web Modern.</p>
      </footer>
    </div>
  );
}