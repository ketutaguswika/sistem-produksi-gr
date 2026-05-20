import React from 'react';

export default function ActivityTable({ activities = [] }) {
    return (
        <div className="p-0 overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold">
                    <tr>
                        <th className="px-6 py-3">Nama</th>
                        <th className="px-6 py-3">Aksi</th>
                        <th className="px-6 py-3">Jumlah</th>
                        <th className="px-6 py-3">Alasan</th>
                        <th className="px-6 py-3">Waktu</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {activities.map((log, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-900">{log.nama}</td>
                            
                            {/* Kolom Aksi */}
                            <td className="px-6 py-4 font-semibold text-gray-800">
                                {log.aksi}
                            </td>

                            {/* Kolom Jumlah */}
                            <td className="px-6 py-4">
                                {log.jumlah !== '-' ? (
                                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                                        {log.jumlah}
                                    </span>
                                ) : (
                                    <span className="text-gray-300">-</span>
                                )}
                            </td>

                            {/* Kolom Alasan */}
                            <td className="px-6 py-4 text-gray-500 italic text-xs">
                                {log.alasan || '-'}
                            </td>

                            {/* Kolom Waktu */}
                            <td className="px-6 py-4 text-gray-400 text-xs">{log.waktu}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}