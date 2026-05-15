import React from 'react';
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome - Green Resort Palembang" />
            <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100">
                {/* Navigation */}
                <nav className="flex items-center justify-between p-6 lg:px-8 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                    <div className="flex lg:flex-1">
                        <span className="text-xl font-bold tracking-tight text-emerald-800 uppercase">
                            Green <span className="text-amber-500">Resort</span>
                        </span>
                    </div>
                    <div className="flex gap-x-6">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="text-sm font-semibold leading-6 text-slate-900 hover:text-emerald-700 transition"
                            >
                                Ke Dashboard →
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-sm font-semibold leading-6 text-slate-900 hover:text-emerald-700 transition"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-full bg-emerald-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition"
                                >
                                    Register Account
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Hero Section */}
                <main>
                    <div className="relative isolate px-6 pt-14 lg:px-8">
                        <div className="mx-auto max-center py-24 sm:py-32 lg:py-40 text-center">
                            <div className="mb-8 flex justify-center">
                                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-slate-600 ring-1 ring-slate-900/10 hover:ring-slate-900/20">
                                    Sistem Operasional Produksi Terintegrasi.
                                </div>
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                                Membangun Hunian <span className="text-emerald-800">Eksklusif</span> di Jantung Palembang
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
                                Kelola inventaris material, progres unit pembangunan, hingga manajemen tim dalam satu platform modern yang efisien.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link
                                    href={route('login')}
                                    className="rounded-full bg-emerald-800 px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-emerald-700 transition-all transform hover:scale-105"
                                >
                                    Mulai Kelola Proyek
                                </Link>
                                <a href="#features" className="text-sm font-semibold leading-6 text-slate-900">
                                    Pelajari Fitur <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>

                        {/* Background Decoration */}
                        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                            <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#064e3b] to-[#fbbf24] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div id="features" className="py-24 bg-slate-50">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                                <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
                                    <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 text-emerald-800">
                                        📦
                                    </div>
                                    <h3 className="font-bold text-xl mb-2 text-slate-900">Manajemen Stok</h3>
                                    <p className="text-slate-600">Kontrol real-time mutasi material gudang untuk efisiensi biaya produksi.</p>
                                </div>
                                <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
                                    <div className="h-10 w-10 bg-amber-100 rounded-lg flex items-center justify-center mb-4 text-amber-600">
                                        🏗️
                                    </div>
                                    <h3 className="font-bold text-xl mb-2 text-slate-900">Progres Unit</h3>
                                    <p className="text-slate-600">Pantau tahapan pembangunan setiap unit rumah secara mendetail dan akurat.</p>
                                </div>
                                <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
                                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                                        👥
                                    </div>
                                    <h3 className="font-bold text-xl mb-2 text-slate-900">Kolaborasi Tim</h3>
                                    <p className="text-slate-600">Sinergi antara Manager Produksi, Arsitek, hingga Purchasing dalam satu pintu.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="py-12 border-t border-slate-100 text-center text-slate-500 text-sm">
                    © 2026 Green Resort Palembang. All rights reserved.
                </footer>
            </div>
        </>
    );
}