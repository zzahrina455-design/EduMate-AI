import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <div className="bg-slate-50 text-slate-800 font-sans antialiased min-h-screen flex flex-col justify-between">
      <Head title="Masuk Akun - EduMate AI" />

      {/* Header Semantik */}
      <header className="bg-slate-900 text-white shadow-md" role="banner">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl tracking-wider">
              EM
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">EduMate AI</h1>
              <p className="text-xs text-slate-400">AI Learning Companion RAG - SV UNS</p>
            </div>
          </Link>
          <Link href="/" className="text-xs text-slate-300 hover:text-white transition">
            ← Kembali ke Beranda
          </Link>
        </div>
      </header>

      {/* Main Content Login */}
      <main className="max-w-md w-full mx-auto p-4 my-8" role="main">
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
          <div className="mb-6 text-center space-y-1">
            <h2 className="text-xl font-bold text-slate-900">Selamat Datang Kembali</h2>
            <p className="text-xs text-slate-500">Silakan masuk ke akun EduMate AI kamu</p>
          </div>

          {status && (
            <div className="mb-4 font-medium text-xs text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
              {status}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1">
                Email / Username <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Masukkan email atau username"
              />
              {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-slate-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Masukkan password"
              />
              {errors.password && <p className="text-red-500 text-[11px] mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.remember}
                  onChange={(e) => setData('remember', e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-600 text-[11px]">Ingat saya</span>
              </label>
              {canResetPassword && (
                <Link
                  href={route('password.request')}
                  className="text-blue-600 font-medium text-[11px] hover:underline"
                >
                  Lupa password?
                </Link>
              )}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-xs transition duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{processing ? 'Memproses...' : 'Masuk ke Dashboard'}</span> 🚀
            </button>
          </form>

          <div className="relative my-6 flex items-center justify-center">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-[10px] text-slate-400 absolute">atau</span>
          </div>

          <button
            type="button"
            className="w-full border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-2 rounded-lg text-xs flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <span>🔴</span> Masuk dengan Google
          </button>

          <p className="text-center text-xs text-slate-500 mt-6">
            Belum punya akun?{' '}
            <Link href={route('register')} className="text-blue-600 font-semibold hover:underline">
              Daftar di sini
            </Link>
          </p>
        </div>
      </main>

      {/* Footer Semantik */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-4 text-center border-t border-slate-800" role="contentinfo">
        <p>&copy; 2026 D3 Teknik Informatika Sekolah Vokasi UNS. Modul Praktikum Pemrograman Web Modern.</p>
      </footer>
    </div>
  );
}