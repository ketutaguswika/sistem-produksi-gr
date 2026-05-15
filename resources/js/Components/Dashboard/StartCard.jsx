import React from 'react';

export default function StatCard({ icon, label, value, sub, color }) {
    const colors = {
        blue: "bg-blue-100 text-blue-600",
        red: "bg-red-100 text-red-600",
        green: "bg-green-100 text-green-600",
        amber: "bg-amber-100 text-amber-600"
    };

    return (
        <div className="bg-white shadow-sm rounded-xl border border-gray-100 p-6 flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${colors[color] || colors.blue}`}>
                {React.cloneElement(icon, { className: "w-8 h-8" })}
            </div>
            <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
                <p className={`text-xl font-black ${color === 'red' ? 'text-red-600' : 'text-gray-900'}`}>{value}</p>
                <p className="text-[10px] text-gray-400 font-medium">{sub}</p>
            </div>
        </div>
    );
}