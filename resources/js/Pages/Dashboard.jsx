import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    HomeIcon, CubeIcon, ArrowsRightLeftIcon, BanknotesIcon, ExclamationTriangleIcon, DocumentTextIcon 
} from '@heroicons/react/24/outline';

import ActivityTable from "@/Components/Dashboard/ActivityTable";

export default function Dashboard({ auth, stats }) {
    const user = auth.user;
    const safeStats = stats ?? {};

    const getHeader = () => {
        if (user.role === 'manager_produksi') return 'Production Control';
        if (user.role === 'qs') return 'Budgeting & Volume';
        if (user.role === 'arsitek_drafter') return 'Technical Design';
        return 'Operational Dashboard';
    };

    return (
        <AuthenticatedLayout header={getHeader()}>
            <Head title="Dashboard" />

            <div className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    {['manager_produksi', 'arsitek_drafter', 'qs'].includes(user.role) && (
                        <PastelStatCard 
                            title="Total Budget (RAB)" 
                            value={`Rp ${safeStats.total_rab_value ?? 0}`} 
                            subtitle="+5% dari bulan lalu" 
                            icon={<BanknotesIcon />} 
                            bgClass="bg-[#fff5f4]" 
                            iconBgClass="bg-[#ffe4e1]" 
                            textClass="text-[#ff6b6b]"
                        />
                    )}

                    {['manager_produksi', 'arsitek_drafter', 'qs', 'staff'].includes(user.role) && (
                        <PastelStatCard 
                            title="Unit Pembangunan" 
                            value={safeStats.total_units ?? 0} 
                            subtitle="Sedang berjalan" 
                            icon={<HomeIcon />} 
                            bgClass="bg-[#f0fdf4]" 
                            iconBgClass="bg-[#dcfce7]" 
                            textClass="text-[#22c55e]"
                        />
                    )}

                    {user.role === 'adm_produksi' && (
                        <PastelStatCard 
                            title="Arsip Diterima" 
                            value={safeStats.archive_today ?? 0} 
                            subtitle="Dokumen hari ini" 
                            icon={<DocumentTextIcon />} 
                            bgClass="bg-[#eff6ff]" 
                            iconBgClass="bg-[#dbeafe]" 
                            textClass="text-[#3b82f6]"
                        />
                    )}

                    {['admin', 'purchasing', 'manager_produksi'].includes(user.role) && (
                        <PastelStatCard 
                            title="Stok Material Kritis" 
                            value={safeStats.low_stock_count ?? 0} 
                            subtitle="Butuh pemesanan" 
                            icon={<CubeIcon />} 
                            bgClass="bg-[#eff6ff]" 
                            iconBgClass="bg-[#dbeafe]" 
                            textClass="text-[#3b82f6]"
                        />
                    )}

                    <PastelStatCard 
                        title="Mutasi Logistik" 
                        value={safeStats.today_mutations ?? 0} 
                        subtitle="Aktivitas hari ini" 
                        icon={<ArrowsRightLeftIcon />} 
                        bgClass="bg-[#fffbeb]" 
                        iconBgClass="bg-[#fef3c7]" 
                        textClass="text-[#f59e0b]"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    
                    {['manager_produksi', 'staff', 'arsitek_drafter'].includes(user.role) && (
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Monitoring</h3>
                                    <p className="text-sm text-gray-500 font-medium mt-1">Progres Pembangunan</p>
                                </div>
                                <div className="text-red-500 p-2 bg-red-50 rounded-lg">
                                    <HomeIcon className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="space-y-5 flex-1">
                                {(safeStats.recent_progress ?? []).slice(0, 3).map((unit, index) => (
                                    <SimpleProgress key={index} unit={unit} />
                                ))}
                            </div>
                            <div className="mt-6 flex justify-between items-center text-sm border-t border-gray-100 pt-5">
                                <span className="text-emerald-500 font-bold">+12% vs Minggu lalu</span>
                                <Link href={route('units.index')} className="text-gray-900 font-bold hover:text-red-600 transition-colors">Lihat Detail</Link>
                            </div>
                        </div>
                    )}

                    {/* Card: Alert QS */}
                    {['manager_produksi', 'qs'].includes(user.role) && (
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Budget Alert</h3>
                                    <p className="text-sm text-gray-500 font-medium mt-1">Selisih Volume Struktur</p>
                                </div>
                                <div className="text-amber-500 p-2 bg-amber-50 rounded-lg">
                                    <BanknotesIcon className="w-6 h-6" />
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 flex-1 leading-relaxed">
                                Terdapat anomali pengeluaran material dibandingkan RAB pada pembangunan Blok A minggu ini.
                            </p>
                            <div className="mt-6 flex justify-between items-center text-sm border-t border-gray-100 pt-5">
                                <span className="text-red-500 font-bold">Overbudget Area</span>
                                <Link href={route('qs.dashboard')} className="text-gray-900 font-bold hover:text-red-600 transition-colors">Cek Analisis</Link>
                            </div>
                        </div>
                    )}

                    {/* Card: Alert Logistik */}
                    {['admin', 'purchasing', 'manager_produksi'].includes(user.role) && (
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Stok Material</h3>
                                    <p className="text-sm text-gray-500 font-medium mt-1">Status Menipis</p>
                                </div>
                                <div className="text-red-500 p-2 bg-red-50 rounded-lg">
                                    <CubeIcon className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="space-y-3 flex-1">
                                {(safeStats.critical_materials ?? []).slice(0, 3).map((item, i) => (
                                    <div key={i} className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600 font-semibold">{item.nama}</span>
                                        <span className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded">{item.stok}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 flex justify-between items-center text-sm border-t border-gray-100 pt-5">
                                <span className="text-red-500 font-bold">Priority Restock</span>
                                <Link href={route('inventory.index')} className="text-gray-900 font-bold hover:text-red-600 transition-colors">Proses Order</Link>
                            </div>
                        </div>
                    )}
                </div>

                {['manager_produksi', 'adm_produksi'].includes(user.role) && (
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-base font-bold text-gray-900">Log Aktivitas Terbaru</h3>
                            <button className="text-sm font-semibold text-gray-500 hover:text-gray-900">Filter Data</button>
                        </div>
                        <div className="p-0">
                            <ActivityTable activities={safeStats.staff_activities} />
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

const PastelStatCard = ({ title, value, subtitle, icon, bgClass, iconBgClass, textClass }) => (
    <div className={`rounded-2xl p-6 shadow-sm flex items-center gap-5 border border-transparent ${bgClass}`}>
        <div className={`p-4 rounded-xl shrink-0 ${iconBgClass} ${textClass}`}>
            {React.cloneElement(icon, { className: "w-7 h-7" })}
        </div>
        <div className="flex flex-col">
            <p className="text-gray-600 text-[13px] font-bold mb-1">{title}</p>
            <h3 className="text-2xl font-black text-gray-900 leading-none">{value}</h3>
            <p className={`text-xs font-semibold mt-1.5 ${textClass}`}>{subtitle}</p>
        </div>
    </div>
);

const SimpleProgress = ({ unit }) => (
    <div>
        <div className="flex justify-between text-sm mb-2">
            <span className="font-bold text-gray-700">{unit.nama_unit}</span>
            <span className="font-bold text-gray-900">{unit.progress_persen}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
            <div className="bg-red-500 h-2 rounded-full" style={{ width: `${unit.progress_persen}%` }}></div>
        </div>
    </div>
);