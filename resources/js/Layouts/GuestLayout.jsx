import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f9f9f9] relative overflow-hidden">
            {/* Efek Background Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.03]" 
                 style={{ 
                     backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
                     backgroundSize: '40px 40px' 
                 }}>
            </div>

            {/* Container Card Putih */}
            <div className="w-full sm:max-w-md mt-6 px-10 py-12 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden sm:rounded-[40px] z-10 border border-gray-100">
                {children}
            </div>
        </div>
    );
}