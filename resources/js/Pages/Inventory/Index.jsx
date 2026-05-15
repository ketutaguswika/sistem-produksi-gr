import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState, useMemo } from 'react';

export default function Index({ auth, materials, units, mutations }) {
    const { flash = {} } = usePage().props; 
    
    // State untuk Modals
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [filterJenis, setFilterJenis] = useState('semua');

    // Form untuk Mutasi Stok
    const { data, setData, post, processing, reset, errors } = useForm({
        material_id: '',
        jenis: 'masuk',
        jumlah: '',
        unit_id: '',
        keterangan: '',
    });

    // Form untuk Material Baru
    const materialForm = useForm({
        kode_material: '',
        nama_material: '',
        satuan: '',
        stok_awal: 0,
    });

    // Form untuk Edit Material
    const editForm = useForm({
        nama_material: '',
        satuan: '',
    });

    const filteredMaterials = useMemo(() => {
        return materials.filter(m => 
            m.nama_material.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.kode_material.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, materials]);

    const submitMutasi = (e) => {
        e.preventDefault();
        // PERBAIKAN 1: Nama route disesuaikan dengan fungsi Mutasi
        post(route('inventory.store-mutation'), {
            onSuccess: () => reset(),
        });
    };

    const submitMaterialBaru = (e) => {
        e.preventDefault();
        materialForm.post(route('inventory.store-material'), {
            onSuccess: () => {
                materialForm.reset();
                setIsModalOpen(false);
            },
        });
    };

    // Fungsi membuka modal edit
    const openEditModal = (material) => {
        setSelectedMaterial(material);
        editForm.setData({
            nama_material: material.nama_material,
            satuan: material.satuan,
        });
        setIsEditModalOpen(true);
    };

    const submitUpdateMaterial = (e) => {
        e.preventDefault();
        editForm.patch(route('inventory.material.update', selectedMaterial.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                editForm.reset();
            },
        });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            // Ubah h2 menjadi div agar tidak bentrok (validateDOMNesting error) jika layout memakai h1
            header={<div className="text-xl font-semibold leading-tight text-gray-800">Manajemen Stok Material Produksi</div>}
        >
            <Head title="Inventory Stok" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    
                    {flash?.success && (
                        <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg shadow-sm border border-green-200" role="alert">
                            <span className="font-bold">Berhasil!</span> {flash.success}
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 shadow sm:rounded-lg gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Daftar Inventaris Gudang</h3>
                            <p className="text-sm text-gray-500">Kelola material produksi dan stok real-time.</p>
                        </div>
                        
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="w-full md:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-indigo-700 transition shadow-md"
                        >
                            + Daftarkan Material Baru
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Tabel Stok Saat Ini */}
                        <div className="p-6 bg-white shadow sm:rounded-lg overflow-x-auto border-t-4 border-green-500">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-900">Stok Saat Ini</h3>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="Cari material..."
                                        className="text-xs border-gray-300 rounded-md pl-8"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            
                            <table className="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-600 uppercase text-xs">
                                        <th className="px-4 py-3 border">Material</th>
                                        <th className="px-4 py-3 border text-center">Stok</th>
                                        <th className="px-4 py-3 border text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMaterials.map((m) => (
                                        <tr key={m.id} className="hover:bg-gray-50 transition">
                                            <td className="px-4 py-2 border">
                                                <div className="font-mono text-[10px] text-indigo-600">{m.kode_material}</div>
                                                <div className="font-bold">{m.nama_material}</div>
                                            </td>
                                            <td className={`px-4 py-2 border text-center font-bold ${m.stok_saat_ini < 10 ? 'bg-red-50 text-red-600' : 'text-green-600'}`}>
                                                {m.stok_saat_ini} <span className="text-xs font-normal text-gray-500">{m.satuan}</span>
                                            </td>
                                            <td className="px-4 py-2 border text-center">
                                                <button 
                                                    onClick={() => openEditModal(m)}
                                                    className="text-indigo-600 hover:text-indigo-900 text-xs font-bold underline"
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Log Transaksi */}
                        <div className="p-6 bg-white shadow sm:rounded-lg overflow-x-auto border-t-4 border-gray-500">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-900">Log Transaksi</h3>
                                <select 
                                    className="text-xs border-gray-300 rounded-md"
                                    value={filterJenis}
                                    onChange={(e) => setFilterJenis(e.target.value)}
                                >
                                    <option value="semua">Semua</option>
                                    <option value="masuk">Masuk</option>
                                    <option value="keluar">Keluar</option>
                                </select>
                            </div>
                            
                            <table className="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-600 uppercase text-xs">
                                        <th className="px-4 py-3 border">Detail</th>
                                        <th className="px-4 py-3 border">Lokasi/Ket</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mutations
                                        .filter(mut => filterJenis === 'semua' || mut.jenis === filterJenis)
                                        .map((mut) => (
                                        <tr key={mut.id} className="hover:bg-gray-50 border-b">
                                            <td className="px-4 py-2">
                                                <div className="text-[10px] text-gray-400 font-mono">{new Date(mut.created_at).toLocaleString('id-ID')}</div>
                                                <div className="font-semibold">{mut.material?.nama_material}</div>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${mut.jenis === 'masuk' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {mut.jenis === 'masuk' ? 'IN' : 'OUT'}: {mut.jumlah} {mut.material?.satuan}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 text-xs">
                                                <div className="font-medium">{mut.unit ? mut.unit.nama_unit : 'Gudang Utama'}</div>
                                                <div className="text-gray-400 italic">{mut.keterangan || '-'}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Form Mutasi Stok */}
                    <div className="p-6 bg-white shadow sm:rounded-lg border-t-4 border-indigo-500">
                        <h3 className="mb-4 text-lg font-bold text-gray-900 flex items-center">
                            <span className="bg-indigo-100 text-indigo-700 p-1 rounded mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8 5a1 1 0 100 2h5.586L1.293 19.293a1 1 0 101.414 1.414L15 8.414V14a1 1 0 112 0V5a1 1 0 00-1-1H8z" />
                                </svg>
                            </span>
                            Input Mutasi Material
                        </h3>

                        {/* PERBAIKAN 2: Penampil Pesan Error Global (Misal: Exception dari Controller) */}
                        {errors.error && (
                            <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg shadow-sm border border-red-300">
                                <span className="font-bold">Gagal Disimpan:</span> {errors.error}
                            </div>
                        )}

                        <form onSubmit={submitMutasi} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Pilih Material</label>
                                <select 
                                    className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500"
                                    value={data.material_id}
                                    onChange={e => setData('material_id', e.target.value)}
                                    required
                                >
                                    <option value="">-- Pilih Barang --</option>
                                    {materials.map(m => (
                                        <option key={m.id} value={m.id}>{m.kode_material} - {m.nama_material}</option>
                                    ))}
                                </select>
                                {/* PERBAIKAN 3: Penampil Error per Input */}
                                {errors.material_id && <p className="text-red-500 text-xs mt-1">{errors.material_id}</p>}
                            </div>

                           <div>
                                <label className="block text-sm font-medium text-gray-700">Jenis Transaksi</label>
                                <select 
                                    className={`w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 font-bold ${
                                        data.jenis === 'masuk' ? 'text-green-600' : 'text-red-600'
                                    }`}
                                    value={data.jenis}
                                    onChange={e => {
                                        setData('jenis', e.target.value);
                                        if (e.target.value === 'masuk') setData('unit_id', '');
                                    }}
                                >
                                    <option value="masuk">Barang Masuk (Tambah Stok)</option>
                                    <option value="keluar">Barang Keluar (Pakai di Unit)</option>
                                </select>
                                {errors.jenis && <p className="text-red-500 text-xs mt-1">{errors.jenis}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Jumlah/Qty</label>
                                <input 
                                    type="number"
                                    className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500"
                                    value={data.jumlah}
                                    onChange={e => setData('jumlah', e.target.value)}
                                    min="1"
                                    required
                                />
                                {errors.jumlah && <p className="text-red-500 text-xs mt-1">{errors.jumlah}</p>}
                            </div>

                            {data.jenis === 'keluar' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Unit Tujuan (Lokasi)</label>
                                    <select 
                                        className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 border-red-300"
                                        value={data.unit_id}
                                        onChange={e => setData('unit_id', e.target.value)}
                                        required={data.jenis === 'keluar'}
                                    >
                                        <option value="">-- Pilih Unit --</option>
                                        {units?.map(u => (
                                            <option key={u.id} value={u.id}>{u.nama_unit}</option>
                                        ))}
                                    </select>
                                    {errors.unit_id && <p className="text-red-500 text-xs mt-1">{errors.unit_id}</p>}
                                </div>
                            )}

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Keterangan Tambahan</label>
                                <input 
                                    type="text"
                                    className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500"
                                    value={data.keterangan}
                                    onChange={e => setData('keterangan', e.target.value)}
                                    placeholder="Contoh: Pengadaan Vendor X"
                                />
                                {errors.keterangan && <p className="text-red-500 text-xs mt-1">{errors.keterangan}</p>}
                            </div>

                            <div className="md:col-span-2 mt-2">
                                <button 
                                    disabled={processing}
                                    className="w-full md:w-auto inline-flex justify-center items-center px-6 py-2 bg-indigo-600 text-white rounded-md font-bold uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 disabled:opacity-50 transition shadow-lg"
                                >
                                    {processing ? 'Proses...' : 'Simpan Transaksi Stok'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* MODAL: DAFTAR MATERIAL BARU */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <h3 className="text-lg font-bold mb-4">Daftarkan Material Baru</h3>
                        <form onSubmit={submitMaterialBaru} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Kode Material</label>
                                <input type="text" className="w-full mt-1 border-gray-300 rounded-md" value={materialForm.data.kode_material} onChange={e => materialForm.setData('kode_material', e.target.value)} required />
                                {materialForm.errors.kode_material && <p className="text-red-500 text-xs mt-1">{materialForm.errors.kode_material}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Nama Material</label>
                                <input type="text" className="w-full mt-1 border-gray-300 rounded-md" value={materialForm.data.nama_material} onChange={e => materialForm.setData('nama_material', e.target.value)} required />
                                {materialForm.errors.nama_material && <p className="text-red-500 text-xs mt-1">{materialForm.errors.nama_material}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Satuan</label>
                                <input type="text" className="w-full mt-1 border-gray-300 rounded-md" value={materialForm.data.satuan} onChange={e => materialForm.setData('satuan', e.target.value)} required />
                                {materialForm.errors.satuan && <p className="text-red-500 text-xs mt-1">{materialForm.errors.satuan}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Stok Awal</label>
                                <input type="number" className="w-full mt-1 border-gray-300 rounded-md" value={materialForm.data.stok_awal} onChange={e => materialForm.setData('stok_awal', e.target.value)} />
                                {materialForm.errors.stok_awal && <p className="text-red-500 text-xs mt-1">{materialForm.errors.stok_awal}</p>}
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md">Batal</button>
                                <button type="submit" disabled={materialForm.processing} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL: EDIT MATERIAL */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 border-t-4 border-indigo-600">
                        <h3 className="text-lg font-bold mb-4">Edit Info Material</h3>
                        <p className="text-xs text-gray-500 mb-4">Mengedit material: <span className="font-mono text-indigo-600">{selectedMaterial?.kode_material}</span></p>
                        <form onSubmit={submitUpdateMaterial} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Nama Material</label>
                                <input 
                                    type="text" 
                                    className="w-full mt-1 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                                    value={editForm.data.nama_material} 
                                    onChange={e => editForm.setData('nama_material', e.target.value)} 
                                    required 
                                />
                                {editForm.errors.nama_material && <p className="text-red-500 text-xs mt-1">{editForm.errors.nama_material}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Satuan</label>
                                <input 
                                    type="text" 
                                    className="w-full mt-1 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                                    value={editForm.data.satuan} 
                                    onChange={e => editForm.setData('satuan', e.target.value)} 
                                    required 
                                />
                                {editForm.errors.satuan && <p className="text-red-500 text-xs mt-1">{editForm.errors.satuan}</p>}
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button 
                                    type="button" 
                                    onClick={() => setIsEditModalOpen(false)} 
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                >
                                    Batal
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={editForm.processing}
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {editForm.processing ? 'Menyimpan...' : 'Update Material'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}