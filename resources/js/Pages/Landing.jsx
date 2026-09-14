import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Landing() {
  return (
    <div className="bg-slate-50 text-slate-800 font-sans antialiased min-h-screen flex flex-col justify-between">
      <Head title="AI Learning Companion RAG SV UNS - EduMate AI" />

      {/* Header / Navbar Semantik */}
      <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50" role="banner">
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

          {/* Navigasi Utama Landing Page */}
          <nav aria-label="Navigasi Utama Landing Page" className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#fitur" className="text-slate-300 hover:text-white transition">Fitur Unggulan</a>
            <a href="#cara-kerja" className="text-slate-300 hover:text-white transition">Cara Kerja RAG</a>
            <a href="#keunggulan" className="text-slate-300 hover:text-white transition">Keunggulan</a>
          </nav>

          {/* Tombol Aksi Masuk / Daftar */}
          <div className="flex items-center space-x-3">
            <Link href="/login" className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 transition">
              Masuk
            </Link>
            <Link href="/register" className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition shadow-sm">
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </header>

      {/* Section Hero Utama */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" role="main">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Vector DB Active & Integrated
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Asisten Pembelajaran Cerdas Berbasis RAG & Dokumen Resmi
          </h1>

          <p className="text-sm md:text-base text-slate-600 leading-relaxed">
            Solusi AI terintegrasi untuk mahasiswa D3 Teknik Informatika SV UNS. Dapatkan jawaban instan dan terverifikasi yang diambil langsung dari RPS, Modul Praktikum, dan Jurnal Dosen.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Link href="/register" className="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl text-sm transition shadow-md shadow-blue-200 flex items-center justify-center gap-2">
              <span>Mulai Percakapan AI</span> 🚀
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto text-center bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium px-6 py-3 rounded-xl text-sm transition">
              Buka Dashboard
            </Link>
          </div>

          {/* Statistik Ringkas */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
            <div>
              <p className="text-lg font-bold text-slate-900">100%</p>
              <p className="text-xs text-slate-500">Terverifikasi RPS</p>
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900">Real-time</p>
              <p className="text-xs text-slate-500">Sitasi Referensi</p>
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900">SV UNS</p>
              <p className="text-xs text-slate-500">Standar Kurikulum</p>
            </div>
          </div>
        </div>

        {/* Visual Mockup Antarmuka Sistem */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xl relative">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">edumate.sv.uns.ac.id</span>
          </div>

          {/* Preview Chat Interactive Mockup */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">AI</div>
              <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none text-xs text-slate-700 max-w-xs leading-relaxed">
                Halo! Ada yang bisa saya bantu terkait modul perkuliahan hari ini?
              </div>
            </div>
            
            <div className="flex items-start gap-3 justify-end">
              <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none text-xs max-w-xs leading-relaxed">
                Apa itu HTML5 Semantik dan contoh tag-nya?
              </div>
              <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-[10px]">M</div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded">RPS Verified</span>
                <span className="text-slate-400">Match: 95%</span>
              </div>
              <p className="text-xs font-semibold text-slate-800">Modul 1 Praktikum Web Modern</p>
              <p className="text-[11px] text-slate-600 italic">"Tag semantik memberikan makna struktural seperti header, nav, main, dan footer..."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Fitur Utama */}
      <section id="fitur" className="bg-white py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Fitur Utama EduMate AI</h2>
            <p className="text-xs text-slate-500">Dirancang khusus untuk mendukung kegiatan akademis dan praktikum secara mandiri.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3 hover:border-blue-300 transition">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center text-lg">💬</div>
              <h3 className="text-base font-bold text-slate-900">Tanya Jawab RAG</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Menggunakan algoritma Retrieval-Augmented Generation untuk menyusun jawaban akurat berbasis konteks dokumen.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3 hover:border-blue-300 transition">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center text-lg">📚</div>
              <h3 className="text-base font-bold text-slate-900">Sitasi Referensi Otomatis</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Setiap jawaban dilengkapi indikator rujukan lengkap dengan nama modul, halaman, dan tingkat kemiripan vektor.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3 hover:border-blue-300 transition">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center text-lg">📂</div>
              <h3 className="text-base font-bold text-slate-900">Portal Pengelolaan Dosen</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Memudahkan dosen mengunggah berkas RPS, Modul, atau Jurnal terbaru untuk di-index ke Vector Database.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Call-to-Action (CTA) */}
      <section className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl font-bold">Siap Memulai Perjalanan Belajar Lebih Efektif?</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Bergabunglah sekarang dan rasakan kemudahan belajar dengan pendamping AI yang terverifikasi.
          </p>
          <div className="pt-2">
            <Link href="/register" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg text-xs transition">
              Buat Akun Mahasiswa
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Semantik */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-4 text-center border-t border-slate-800" role="contentinfo">
        <p>&copy; 2026 D3 Teknik Informatika Sekolah Vokasi UNS. Modul Praktikum Pemrograman Web Modern.</p>
      </footer>
    </div>
  );
}