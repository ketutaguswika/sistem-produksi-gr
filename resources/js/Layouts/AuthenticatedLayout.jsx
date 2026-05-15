import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth = {} } = usePage().props;
    const user = auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-gray-800">
            
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar Navigation */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 
                transform transition-transform duration-300 ease-in-out flex flex-col shadow-sm
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
            `}>
                {/* Logo Area */}
                <div className="flex items-center justify-between h-[72px] border-b border-gray-100 px-6">
                    <div className="flex items-center gap-3">
                        <img 
                            src="/images/logo.png" 
                            alt="Green Resort Logo" 
                            className="h-8 w-auto object-contain rounded-md"
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src = "https://ui-avatars.com/api/?name=GR&background=0D1B2A&color=fff&rounded=true&bold=true";
                            }}
                        />
                        <span className="text-lg font-bold text-gray-900 tracking-tight">Green Resort</span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 py-6 space-y-1 overflow-y-auto scrollbar-hide">
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-6">Main Menu</div>
                    
                    <SidebarLink href={route('dashboard')} active={route().current('dashboard')} icon="home" onClick={() => setIsSidebarOpen(false)}>
                        Dashboard
                    </SidebarLink>
                    
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-8 mb-3 px-6">Modul Produksi</div>

                    {['manager_produksi', 'admin', 'purchasing', 'qs'].includes(user.role) && (
                        <SidebarLink href={route('inventory.index')} active={route().current('inventory.*')} icon="cube" onClick={() => setIsSidebarOpen(false)}>
                            Inventory
                        </SidebarLink>
                    )}
                    
                    {['manager_produksi', 'arsitek_drafter', 'staff'].includes(user.role) && (
                        <SidebarLink href={route('units.index')} active={route().current('units.*')} icon="document" onClick={() => setIsSidebarOpen(false)}>
                            Manajemen Unit
                        </SidebarLink>
                    )}

                    {['manager_produksi', 'qs'].includes(user.role) && (
                        <SidebarLink href={route('qs.dashboard')} active={route().current('qs.*')} icon="calculator" onClick={() => setIsSidebarOpen(false)}>
                            RAB & Volume
                        </SidebarLink>
                    )}
                </nav>

                {/* Bottom Account Section */}
                <div className="pb-6 pt-4 border-t border-gray-100">
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-6">Account</div>
                    <Link 
                        href={route('logout')} 
                        method="post" 
                        as="button" 
                        className="w-full flex items-center px-6 py-3 text-sm font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors border-l-4 border-transparent"
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        Log out
                    </Link>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col overflow-hidden w-full">
                
                {/* Top Header / Navbar */}
                <header className="h-[72px] bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 z-10 shadow-sm">
                    <div className="flex items-center gap-4">
                        {/* Hamburger Menu Button */}
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 lg:hidden focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                        
                        {/* Search Bar (Optional visual element from target design) */}
                        <div className="hidden sm:flex items-center bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            <input type="text" placeholder="Search data..." className="bg-transparent border-none focus:ring-0 text-sm w-48 text-gray-700 placeholder-gray-400" />
                        </div>
                    </div>

                    {/* Notification & User Avatar */}
                    <div className="flex items-center gap-5">
                        <button className="text-gray-400 hover:text-gray-600 relative">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white text-[9px] text-white flex items-center justify-center font-bold">2</span>
                        </button>
                        <div className="flex items-center gap-3 border-l border-gray-200 pl-5">
                            <div className="hidden md:block text-right">
                                <p className="text-sm font-bold text-gray-800 leading-tight">{user?.name ?? 'Guest'}</p>
                                <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">{user.role.replace('_', ' ')}</p>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm border border-red-200">
                                {user?.name?.charAt(0) ?? '?'}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 lg:p-8">
                    <div className="mb-8">
                        <div className="text-2xl font-bold text-gray-900">{header}</div>
                        <p className="text-sm text-gray-500 mt-1">Overview of your current operations</p>
                    </div>
                    {children}
                </main>

            </div>
        </div>
    );
}

// Komponen SidebarLink dengan Left-Border Active State
const SidebarLink = ({ href, active, icon, children, onClick }) => {
    const icons = {
        home: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
        cube: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />,
        document: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
        calculator: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />,
    };

    return (
        <Link 
            href={href} 
            onClick={onClick}
            className={`flex items-center px-6 py-3.5 text-sm font-semibold transition-all duration-200 border-l-4 ${
                active 
                    ? 'bg-red-50 text-red-600 border-red-500' 
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
        >
            <svg className={`w-5 h-5 mr-3 ${active ? 'text-red-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {icons[icon] || icons['home']}
            </svg>
            {children}
        </Link>
    );
};