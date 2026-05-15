import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { BanknotesIcon, CircleStackIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import StatCard from "@/Components/Dashboard/StartCard"; 
import MasterPriceTable from "@/Components/Dashboard/MasterPriceTable";

export default function QsDashboard({ auth, materials, stats }) {
    return (
        <AuthenticatedLayout
            header={<h1 className="font-bold text-2xl text-gray-800 tracking-tight">QS / Cost Control</h1>}
        >
            <Head title="QS Dashboard" />

            <div className="py-8 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Ringkasan Biaya */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard 
                            icon={<BanknotesIcon />} 
                            label="Total Aset Stok" 
                            value={`Rp ${new Intl.NumberFormat('id-ID').format(stats.total_value)}`} 
                            sub="Valuasi Gudang" 
                            color="green" 
                        />
                        <StatCard 
                            icon={<CircleStackIcon />} 
                            label="Item Terdaftar" 
                            value={materials.length} 
                            sub="Jenis Material" 
                            color="blue" 
                        />
                        <StatCard 
                            icon={<DocumentTextIcon />} 
                            label="PO Pending" 
                            value={0} 
                            sub="Menunggu Approval" 
                            color="amber" 
                        />
                    </div>

                    {/* Tabel Utama */}
                    <MasterPriceTable materials={materials} />

                </div>
            </div>
        </AuthenticatedLayout>
    );
}