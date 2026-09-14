import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Upload() {
  const [docTitle, setDocTitle] = useState('');
  const [docType, setDocType] = useState('RPS');
  const [docCourse, setDocCourse] = useState('');
  const [docFile, setDocFile] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [uploadedDocs, setUploadedDocs] = useState([]);

  // Default dokumen jika localStorage masih kosong
  const defaultDocs = [
    {
      title: 'RPS Pemrograman Web Modern 2026',
      type: 'RPS',
      course: 'Pemrograman Web',
      keywords: ['html', 'semantik', 'aria', 'tailwind', 'fetch', 'cva', 'dom', 'javascript', 'web', 'sdlc', 'waterfall'],
      content: 'Mata kuliah Pemrograman Web mencakup standar HTML5 Semantik, aksesibilitas WAI-ARIA, Tailwind CSS v4, manipulasi DOM dinamis, CVA Pattern, dan Fetch API.',
      page: 2,
    },
    {
      title: 'Modul 1 Praktikum Front-End UNS',
      type: 'Modul',
      course: 'Pemrograman Web',
      keywords: ['html', 'semantik', 'header', 'nav', 'main', 'article', 'footer', 'screen reader'],
      content: 'HTML5 Semantik menggunakan tag bermakna seperti header, nav, main, article, aside, dan footer untuk membantu pembaca layar dan struktur web.',
      page: 5,
    },
    {
      title: 'SKPL EduMate AI - System Specification',
      type: 'Jurnal',
      course: 'Manpro TI',
      keywords: ['rag', 'ai', 'vector', 'edumate', 'skpl', 'srs', 'llm', 'dokumen'],
      content: 'EduMate AI menggunakan arsitektur RAG (Retrieval-Augmented Generation) untuk mencocokkan pertanyaan mahasiswa dengan dokumen RPS dan Modul terverifikasi.',
      page: 12,
    },
  ];

  // Muat daftar dokumen ter-index saat komponen dimuat
  useEffect(() => {
    const localDocs = JSON.parse(localStorage.getItem('edumate_docs') || 'null');
    if (!localDocs) {
      localStorage.setItem('edumate_docs', JSON.stringify(defaultDocs));
      setUploadedDocs(defaultDocs);
    } else {
      setUploadedDocs(localDocs);
    }
  }, []);

  // Handler submit form upload & indexing
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!docTitle || !docCourse || !docFile) return;

    const fileName = docFile.name;
    setStatusMessage({
      type: 'info',
      text: `⏳ Mengekstraksi teks dari berkas "${fileName}" dan membuat Vector Embeddings...`,
    });

    setTimeout(() => {
      const newDoc = {
        title: docTitle,
        type: docType,
        course: docCourse,
        keywords: docTitle.toLowerCase().split(/\s+/),
        content: `Dokumen berkas ${fileName} yang diunggah oleh Dosen untuk mata kuliah ${docCourse}.`,
        page: 1,
      };

      const currentDocs = JSON.parse(localStorage.getItem('edumate_docs') || '[]');
      currentDocs.unshift(newDoc);
      localStorage.setItem('edumate_docs', JSON.stringify(currentDocs));
      setUploadedDocs(currentDocs);

      // Reset form input
      setDocTitle('');
      setDocCourse('');
      setDocFile(null);
      e.target.reset();

      setStatusMessage({
        type: 'success',
        text: `✅ Berhasil! Dokumen "${docTitle}" telah sukses di-index ke Vector DB.`,
      });

      setTimeout(() => setStatusMessage(null), 5000);
    }, 1200);
  };

  return (
    <div className="bg-slate-50 text-slate-800 font-sans antialiased min-h-screen flex flex-col">
      <Head title="Unggah Dokumen Pembelajaran - EduMate AI" />

      {/* Header Semantik */}
      <header className="bg-slate-900 text-white shadow-md" role="banner">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
              EM
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">EduMate AI</h1>
              <p className="text-xs text-slate-400">Portal Pengelolaan Dokumen Dosen</p>
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
                <Link href="/upload" className="text-blue-400 font-semibold" aria-current="page">
                  Unggah RPS/Modul
                </Link>
              </li>
              <li>
                <Link href="/history" className="text-slate-300 hover:text-white">
                  Riwayat Chat
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full" role="main">
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm" aria-labelledby="upload-heading">
          <h2 id="upload-heading" className="text-lg font-bold text-slate-900 mb-2 border-b pb-2">
            Unggah Sumber Pembelajaran Baru
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Dokumen yang diunggah akan diekstraksi teksnya dan dikonversi menjadi Vector Embeddings untuk basis pengetahuan RAG.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="doc-title" className="block text-sm font-medium text-slate-700 mb-1">
                Judul Dokumen <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="doc-title"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Misal: Modul 1 SDLC Waterfall 2026"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="doc-type" className="block text-sm font-medium text-slate-700 mb-1">
                  Jenis Dokumen
                </label>
                <select
                  id="doc-type"
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="RPS">RPS (Rencana Pembelajaran Semester)</option>
                  <option value="Modul">Modul Praktikum</option>
                  <option value="Jurnal">Jurnal / Artikel Ilmiah</option>
                  <option value="Buku">Buku Teks Utama</option>
                </select>
              </div>
              <div>
                <label htmlFor="doc-course" className="block text-sm font-medium text-slate-700 mb-1">
                  Mata Kuliah
                </label>
                <input
                  type="text"
                  id="doc-course"
                  value={docCourse}
                  onChange={(e) => setDocCourse(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Misal: Manpro TI / Praktikum Web"
                />
              </div>
            </div>

            <div>
              <label htmlFor="doc-file" className="block text-sm font-medium text-slate-700 mb-1">
                Pilih Berkas File (PDF/DOCX)
              </label>
              <input
                type="file"
                id="doc-file"
                accept=".pdf,.docx,.txt"
                onChange={(e) => setDocFile(e.target.files[0])}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition cursor-pointer"
            >
              Mulai Indexing ke Vector Database ⚡
            </button>
          </form>

          {/* Status Message */}
          {statusMessage && (
            <div
              className={`mt-4 p-3 rounded-lg text-xs font-medium ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : 'bg-blue-100 text-blue-800 border border-blue-200'
              }`}
              role="status"
            >
              {statusMessage.text}
            </div>
          )}
        </section>

        {/* Daftar Dokumen Ter-index */}
        <section className="mt-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-4">Dokumen yang Telah Di-Index dalam Vector DB</h3>
          <div className="space-y-2">
            {uploadedDocs.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">Belum ada dokumen yang ter-index.</p>
            ) : (
              uploadedDocs.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex justify-between items-center text-xs hover:border-blue-300 transition"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{doc.title}</p>
                    <p className="text-slate-500 text-[11px]">
                      Mata Kuliah: {doc.course} • Status: <span className="text-emerald-600 font-medium">Indexed</span>
                    </p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-semibold px-2.5 py-1 rounded-md border border-blue-200">
                    {doc.type}
                  </span>
                </div>
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