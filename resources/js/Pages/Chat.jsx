import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Chat() {
  const [userQuery, setUserQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Halo! Saya EduMate AI. Silakan ajukan pertanyaan terkait materi kuliah Anda. Saya akan memberikan jawaban yang diverifikasi langsung dari RPS dan Modul Dosen.',
    },
  ]);
  const [citations, setCitations] = useState([]);
  const [statusFeedback, setStatusFeedback] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Helper untuk escape HTML sederhana
  const escapeHtml = (str) => {
    return str.replace(/[&<>"']/g, (m) => {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
  };

  // Algoritma RAG Scoring dari app.js
  const processPreciseRag = (query) => {
    const lowerQuery = query.toLowerCase();
    const queryWords = lowerQuery.split(/\s+/).filter((w) => w.length > 2);

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

    const docs = JSON.parse(localStorage.getItem('edumate_docs') || 'null') || defaultDocs;
    let scoredDocs = [];

    docs.forEach((doc) => {
      let score = 0;
      const title = doc.title.toLowerCase();
      const content = (doc.content || '').toLowerCase();
      const course = (doc.course || '').toLowerCase();
      const keywords = doc.keywords || [];

      queryWords.forEach((word) => {
        if (title.includes(word)) score += 3;
        if (keywords.includes(word)) score += 3;
        if (content.includes(word)) score += 1;
        if (course.includes(word)) score += 1;
      });

      if (score > 0) {
        scoredDocs.push({ doc, score });
      }
    });

    scoredDocs.sort((a, b) => b.score - a.score);
    const matchedDocs = scoredDocs.slice(0, 2).map((item) => item.doc);

    // Penentuan jawaban akurat
    let answerText = `Mengenai <strong>"${escapeHtml(query)}"</strong>: Topik ini berkaitan dengan materi pengembangan web modern. Silakan ajukan pertanyaan spesifik seperti tentang <em>HTML Semantik</em>, <em>Tailwind CSS</em>, <em>Fetch API</em>, atau <em>Arsitektur RAG EduMate AI</em>.`;
    
    if (lowerQuery.includes('html') || lowerQuery.includes('semantik') || lowerQuery.includes('tag')) {
      answerText = '<strong>HTML5 Semantik</strong> adalah teknik penulisan kode web menggunakan tag yang memiliki arti struktural yang jelas, seperti <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>, dan <code>&lt;footer&gt;</code>.';
    } else if (lowerQuery.includes('rag') || lowerQuery.includes('edumate') || lowerQuery.includes('ai')) {
      answerText = '<strong>Retrieval-Augmented Generation (RAG)</strong> pada EduMate AI adalah arsitektur yang menggabungkan pencarian dokumen acuan (seperti RPS dan Modul Dosen) dengan pemrosesan bahasa AI untuk menyajikan jawaban faktual.';
    } else if (lowerQuery.includes('sdlc') || lowerQuery.includes('waterfall')) {
      answerText = '<strong>SDLC Waterfall</strong> adalah model alur kerja pengembangan perangkat lunak secara sekuensial linier (Analisis, Desain, Pengkodean, Pengujian, Pemeliharaan) yang tercantum dalam RPS Rekayasa Perangkat Lunak.';
    }

    const matchedCitations = matchedDocs.map((doc, idx) => ({
      type: doc.type || 'Modul',
      title: doc.title,
      snippet: doc.content || `Dokumen acuan mata kuliah ${doc.course}`,
      page: doc.page || idx + 1,
      course: doc.course || 'Teknik Informatika',
      score: Math.min(0.99, 0.75 + (scoredDocs[idx]?.score || 1) * 0.05).toFixed(2),
    }));

    let fullAnswer = `<p class="leading-relaxed text-slate-800 mb-3">${answerText}</p>`;

    if (matchedCitations.length > 0) {
      const formattedCitations = matchedCitations
        .map(
          (c) =>
            `<li>📄 <strong>[${c.type}] ${c.title}</strong> (Hal. ${c.page}) — <em>"${c.snippet}"</em></li>`
        )
        .join('');

      fullAnswer += `
        <div class="bg-blue-50/80 p-3 rounded-lg border border-blue-200 text-xs text-blue-950 space-y-1.5 mt-2">
          <p class="font-bold flex items-center gap-1 text-blue-900">
            <span>📚</span> Sumber Rujukan Relevan (${matchedCitations.length} Dokumen Cocok):
          </p>
          <ul class="list-none space-y-1 pl-1 text-slate-700">
            ${formattedCitations}
          </ul>
        </div>
      `;
    } else {
      fullAnswer += `
        <div class="bg-slate-100 p-2.5 rounded-lg border border-slate-200 text-xs text-slate-600 mt-2">
          ⚠️ <em>Catatan: Tidak ditemukan dokumen RPS/Modul unggahan dosen yang secara spesifik mencakup pertanyaan ini. Jawaban di atas disusun menggunakan pengetahuan standar.</em>
        </div>
      `;
    }

    return { answer: fullAnswer, citations: matchedCitations };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userQuery.trim() || isProcessing) return;

    const query = userQuery;
    setUserQuery('');
    setIsProcessing(true);

    // Tambahkan pesan user
    const userMessage = { id: Date.now(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMessage]);

    // Tambahkan status loading
    setStatusFeedback({ type: 'info', msg: '⏳ EduMate AI sedang melakukan verifikasi relevansi dokumen...' });

    setTimeout(() => {
      const ragResult = processPreciseRag(query);

      // Tambahkan pesan AI
      const aiMessage = { id: Date.now() + 1, sender: 'ai', htmlText: ragResult.answer };
      setMessages((prev) => [...prev, aiMessage]);
      setCitations(ragResult.citations);

      // Simpan ke local history
      const localHistory = JSON.parse(localStorage.getItem('edumate_history') || '[]');
      localHistory.unshift({
        id: Date.now(),
        query: query,
        answer: ragResult.answer,
        timestamp: new Date().toLocaleString(),
      });
      localStorage.setItem('edumate_history', JSON.stringify(localHistory));

      if (ragResult.citations.length > 0) {
        setStatusFeedback({ type: 'success', msg: '✅ Ditemukan sumber referensi yang relevan!' });
      } else {
        setStatusFeedback({ type: 'info', msg: 'ℹ️ Jawaban diberikan berdasarkan pengetahuan umum.' });
      }

      setIsProcessing(false);
      setTimeout(() => setStatusFeedback(null), 4000);
    }, 1000);
  };

  return (
    <div className="bg-slate-50 text-slate-800 font-sans antialiased min-h-screen flex flex-col justify-between">
      <Head title="Tanya Jawab AI - EduMate AI" />

      {/* Header Semantik */}
      <header className="bg-slate-900 text-white shadow-md" role="banner">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl tracking-wider">
              EM
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">EduMate AI</h1>
              <p className="text-xs text-slate-400">AI Learning Companion RAG - SV UNS</p>
            </div>
          </div>

          {/* Navigasi Utama */}
          <nav aria-label="Navigasi Utama Sistem">
            <ul className="flex space-x-6 text-sm font-medium">
              <li>
                <Link href="/dashboard" className="text-slate-300 hover:text-white transition">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-blue-400 font-semibold" aria-current="page">
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

      {/* Konten Utama Semantik */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full grid grid-cols-1 lg:grid-cols-3 gap-6" role="main">
        {/* Kolom Chat Utama (2 Kolom) */}
        <section
          className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[700px]"
          aria-labelledby="chat-heading"
        >
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 rounded-t-xl">
            <div>
              <h2 id="chat-heading" className="text-base font-bold text-slate-900">
                Sesi Asisten Pembelajaran
              </h2>
              <p className="text-xs text-slate-500">Pertanyaan dijawab berbasis RAG dari RPS & Modul Resmi</p>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Vector DB Active
            </span>
          </div>

          {/* Area Tampilan Chat */}
          <div
            id="chat-container"
            className="flex-1 p-4 overflow-y-auto space-y-4"
            aria-label="Riwayat Percakapan Chat"
            aria-live="polite"
          >
            {messages.map((m) => (
              <article key={m.id} className={`flex items-start gap-3 ${m.sender === 'user' ? 'justify-end' : ''}`}>
                {m.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    AI
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl max-w-xl text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-slate-100 text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  {m.text && <div>{m.text}</div>}
                  {m.htmlText && <div dangerouslySetInnerHTML={{ __html: m.htmlText }} />}
                </div>
                {m.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    M
                  </div>
                )}
              </article>
            ))}
            {isProcessing && (
              <article className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  AI
                </div>
                <div className="bg-slate-100 p-3.5 rounded-2xl rounded-tl-none max-w-xl text-sm text-slate-500 border border-slate-200 animate-pulse">
                  ⚡ Memeriksa kata kunci & menyusuri dokumen yang cocok...
                </div>
              </article>
            )}
          </div>

          {/* Status / Feedback */}
          {statusFeedback && (
            <div
              className={`mx-4 p-3 rounded-lg text-xs font-medium block ${
                statusFeedback.type === 'success'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : 'bg-blue-100 text-blue-800 border border-blue-200'
              }`}
              role="status"
            >
              {statusFeedback.msg}
            </div>
          )}

          {/* Form Input Pertanyaan */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-xl flex gap-2">
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              required
              className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              placeholder="Ketik pertanyaan Anda (misal: Apa itu SDLC Waterfall?)..."
              aria-label="Input Pertanyaan"
            />
            <button
              type="submit"
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isProcessing ? 'Memproses...' : 'Kirim'}</span> 🚀
            </button>
          </form>
        </section>

        {/* Sidebar Panel Citations (1 Kolom) */}
        <aside
          className="lg:col-span-1 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col h-[700px]"
          aria-labelledby="citation-heading"
        >
          <h2 id="citation-heading" className="text-base font-bold text-slate-900 border-b pb-3 mb-4 flex items-center gap-2">
            <span>📚</span> Sumber Referensi (Sitasi RAG)
          </h2>

          <div className="flex-1 overflow-y-auto space-y-3" aria-label="Daftar Sitasi Dokumen">
            {citations.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-10">
                Belum ada rujukan. Ajukan pertanyaan untuk melihat sitasi dokumen sumber dari RPS/Modul.
              </p>
            ) : (
              citations.map((c, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1 hover:border-blue-300 transition">
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded-md border bg-blue-100 text-blue-800 border-blue-200">
                      {c.type}
                    </span>
                    <span className="text-[10px] text-slate-400">Match Rate: {(c.score * 100).toFixed(0)}%</span>
                  </div>
                  <h3 className="font-semibold text-xs text-slate-900">{c.title}</h3>
                  <p className="text-[11px] text-slate-600 italic">"{c.snippet}"</p>
                  <div className="text-[10px] text-blue-600 font-medium">📍 Halaman {c.page} • Matkul: {c.course}</div>
                </div>
              ))
            )}
          </div>

          <div className="mt-auto pt-4 border-t border-slate-100 text-xs text-slate-500">
            <p className="font-medium text-slate-700">Catatan Etika AI:</p>
            <p className="mt-1">Jawaban dihasilkan via RAG. Selalu lakukan verifikasi mandiri menggunakan halaman rujukan yang tertera.</p>
          </div>
        </aside>
      </main>

      {/* Footer Semantik */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-4 text-center border-t border-slate-800" role="contentinfo">
        <p>&copy; 2026 EduMate AI - SKPL Version 1.0. Program Studi D3 Teknik Informatika SV UNS Madiun.</p>
      </footer>
    </div>
  );
}