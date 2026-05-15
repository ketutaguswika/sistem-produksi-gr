import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState, useRef } from 'react';

export default function Index({ auth, units }) {
    const [selectedUnit, setSelectedUnit] = useState(null);
    const fileInput = useRef();

    // 1. PERBAIKAN: Tambahkan state 'tipe' di sini
    const addUnitForm = useForm({
        nama_unit: '',
        tipe: '', 
    });

    // Form untuk Update Progres
    const updateProgressForm = useForm({
        progress_baru: '',
        keterangan: '',
        foto_progres: null,
    });

    const submitAddUnit = (e) => {
        e.preventDefault();
        addUnitForm.post(route('units.store'), {
            onSuccess: () => addUnitForm.reset(),
        });
    };

    const submitUpdateProgress = (e) => {
        e.preventDefault();
        // Menggunakan forceFormData karena ada upload file
        updateProgressForm.post(route('units.update-progress', selectedUnit.id), {
            forceFormData: true,
            onSuccess: () => {
                updateProgressForm.reset();
                setSelectedUnit(null);
            }
        });
    };

    const handleDelete = (id) => {
        if (confirm('Hapus unit ini? Seluruh histori log dan foto akan hilang permanen.')) {
            router.delete(route('units.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-bold text-xl text-gray-800">Manajemen Progres Unit</h2>}>
            <Head title="Progres Unit" />
            
            <div className="py-6 sm:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Bagian Tambah Unit Baru - Responsive Flex */}
                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg mb-4 text-gray-700">Daftarkan Unit Baru</h3>
                        <form onSubmit={submitAddUnit} className="flex flex-col sm:flex-row gap-4 items-start">
                            
                            <div className="w-full sm:flex-1">
                                <label className="block text-sm font-medium text-gray-600 mb-1">Nama Unit</label>
                                <input 
                                    type="text" 
                                    className="w-full border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" 
                                    placeholder="Contoh: Unit B-05"
                                    value={addUnitForm.data.nama_unit}
                                    onChange={e => addUnitForm.setData('nama_unit', e.target.value)}
                                />
                                {/* PERBAIKAN: Penampil pesan error */}
                                {addUnitForm.errors.nama_unit && <p className="text-red-500 text-xs mt-1 font-semibold">{addUnitForm.errors.nama_unit}</p>}
                            </div>

                            {/* 2. PERBAIKAN: Tambahkan dropdown input 'tipe' di sini */}
                            <div className="w-full sm:flex-1">
                                <label className="block text-sm font-medium text-gray-600 mb-1">Tipe Unit</label>
                                <select 
                                    className="w-full border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                    value={addUnitForm.data.tipe}
                                    onChange={e => addUnitForm.setData('tipe', e.target.value)}
                                >
                                    <option value="">-- Pilih Tipe --</option>
                                    <option value="Tipe 36">Tipe 36</option>
                                    <option value="Tipe 45">Tipe 45</option>
                                    <option value="Tipe 60">Tipe 60</option>
                                    <option value="Custom">Custom / Lainnya</option>
                                </select>
                                {/* PERBAIKAN: Penampil pesan error */}
                                {addUnitForm.errors.tipe && <p className="text-red-500 text-xs mt-1 font-semibold">{addUnitForm.errors.tipe}</p>}
                            </div>

                            <div className="mt-6 w-full sm:w-auto">
                                <button 
                                    type="submit" 
                                    disabled={addUnitForm.processing}
                                    className="w-full px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm shadow-indigo-200"
                                >
                                    {addUnitForm.processing ? '...' : '+ Tambah Unit'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Tabel Unit - Responsive Wrapper */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[600px]">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama Unit</th>
                                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tipe</th> {/* Tambahan Kolom Tipe di Tabel */}
                                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Progres</th>
                                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Foto</th>
                                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {units.map(unit => (
                                        <tr key={unit.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="font-bold text-gray-800">{unit.nama_unit}</div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="text-sm text-gray-600">{unit.tipe || '-'}</div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 bg-gray-200 rounded-full h-2 min-w-[80px]">
                                                        <div 
                                                            className="bg-indigo-500 h-2 rounded-full transition-all duration-500" 
                                                            style={{ width: `${unit.progress_persen}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-600">{unit.progress_persen}%</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                                    unit.status_terakhir === 'Selesai' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                                                }`}>
                                                    {unit.status_terakhir}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                {unit.foto_terakhir ? (
                                                    <img 
                                                        src={`/storage/${unit.foto_terakhir}`} 
                                                        className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg border border-gray-200 shadow-sm"
                                                        alt="Progres"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center">
                                                        <span className="text-[10px] text-gray-400 italic">No file</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="py-4 px-6 text-right space-x-4">
                                                <button 
                                                    onClick={() => {
                                                        setSelectedUnit(unit);
                                                        updateProgressForm.setData({
                                                            progress_baru: unit.progress_persen,
                                                            keterangan: '',
                                                            foto_progres: null
                                                        });
                                                    }} 
                                                    className="text-indigo-600 hover:text-indigo-900 font-semibold text-sm transition-colors"
                                                >
                                                    Update
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(unit.id)}
                                                    className="text-red-500 hover:text-red-700 font-semibold text-sm transition-colors"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Modal Update Progres */}
                    {selectedUnit && (
                        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl transform transition-all">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-xl text-gray-800">Update: {selectedUnit.nama_unit}</h3>
                                    <button onClick={() => setSelectedUnit(null)} className="text-gray-400 hover:text-gray-600">✕</button>
                                </div>
                                <form onSubmit={submitUpdateProgress} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Persentase Baru (%)</label>
                                        <input 
                                            type="number" 
                                            min="0" max="100"
                                            className="w-full border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500" 
                                            value={updateProgressForm.data.progress_baru} 
                                            onChange={e => updateProgressForm.setData('progress_baru', e.target.value)} 
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 text-indigo-600">📸 Foto Lapangan (Wajib)</label>
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-indigo-400 transition-colors">
                                            <div className="space-y-1 text-center">
                                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <div className="flex text-sm text-gray-600">
                                                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                                                        <span>Upload a file</span>
                                                        <input 
                                                            type="file" 
                                                            ref={fileInput}
                                                            className="sr-only"
                                                            onChange={e => updateProgressForm.setData('foto_progres', e.target.files[0])}
                                                            accept="image/*"
                                                            required
                                                        />
                                                    </label>
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    {updateProgressForm.data.foto_progres ? updateProgressForm.data.foto_progres.name : 'PNG, JPG up to 2MB'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Keterangan Aktivitas</label>
                                        <textarea 
                                            rows="3"
                                            className="w-full border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500" 
                                            value={updateProgressForm.data.keterangan} 
                                            onChange={e => updateProgressForm.setData('keterangan', e.target.value)} 
                                            placeholder="Contoh: Pemasangan keramik lantai 2"
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <button 
                                            type="button" 
                                            onClick={() => setSelectedUnit(null)} 
                                            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                                        >
                                            Batal
                                        </button>
                                        <button 
                                            type="submit" 
                                            disabled={updateProgressForm.processing} 
                                            className="flex-1 px-4 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 transition-all"
                                        >
                                            {updateProgressForm.processing ? 'Menyimpan...' : 'Simpan Progres'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}