import React from 'react';

export default function ActivityTable({ activities = [] }) {
    return (
        <div className="p-0 overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold">
                    <tr>
                        <th className="px-6 py-3">Nama</th>
                        <th className="px-6 py-3">Aksi</th>
                        <th className="px-6 py-3">Waktu</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {activities.map((log, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{log.user_name}</td>
                            <td className="px-6 py-4 text-gray-500">{log.action}</td>
                            <td className="px-6 py-4 text-gray-400 text-xs">{log.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}