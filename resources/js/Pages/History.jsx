import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function History() {
  const [historyList, setHistoryList] = useState([]);

  // Load history dari localStorage saat komponen pertama kali dimuat
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('edumate_history') || '[]');
    setHistoryList(localData);
  }, []);

  // Handler untuk menghapus seluruh riwayat
  const handleClearHistory = () => {
    if (confirm('Hapus seluruh riwayat percakapan?')) {
      localStorage.removeItem('edumate_history');
      setHistoryList([]);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 font-sans antialiased min-h-screen flex flex-col justify-between">
      <Head title="Riwayat Percakapan - EduMate AI" />

      {/* Header Semantik */}
      <header className="bg-slate-900 text-white shadow-md" role="banner">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
              EM
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">EduMate AI</h1>
              <p className="text-xs text-slate-400">Riwayat & Log Hasil Pembelajaran</p>
            </div>
          </div>

          {/* Navigasi Utama */}
          <nav aria-label="Navigasi Utama">
            <ul className="flex space-x-6 text-sm font-medium">
              <li>
                <Link href="/dashboard" className="text-slate-300 hover:text-white">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-slate-300 hover:text-white">
                  Tanya-Jawab AI
                </Link>
              </li>
              <li>
                <Link href="/upload" className="text-slate-300 hover:text-white">
                  Unggah RPS/Modul
                </Link>
              </li>
              <li>
                <Link href="/history" className="text-blue-400 font-semibold" aria-current="page">
                  Riwayat Chat
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Konten Utama Riwayat */}
      <main className="max-w-5xl mx-auto px-4 py-8 flex-1 w-full" role="main">
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6 border-b pb-3">
            <h2 className="text-lg font-bold text-slate-900">Riwayat Percakapan Mahasiswa</h2>
            <button
              onClick={handleClearHistory}
              className="text-xs bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-lg cursor-pointer transition"
            >
              🗑️ Hapus Riwayat
            </button>
          </div>

          {/* Container Riwayat Percakapan */}
          <div className="space-y-4">
            {historyList.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-8">
                Belum ada riwayat percakapan tersimpan.
              </p>
            ) : (
              historyList.map((item) => (
                <article
                  key={item.id || item.timestamp}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs"
                >
                  <div className="flex justify-between text-slate-400 font-medium">
                    <span>⏰ {item.timestamp}</span>
                  </div>
                  <div className="font-bold text-slate-900 text-sm">Q: {item.query}</div>
                  <div
                    className="text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-100"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </article>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Footer Semantik */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-4 text-center border-t border-slate-800" role="contentinfo">
        <p>&copy; 2026 EduMate AI - SKPL Version 1.0. Program Studi D3 Teknik Informatika SV UNS Madiun.</p>
      </footer>
    </div>
  );
}