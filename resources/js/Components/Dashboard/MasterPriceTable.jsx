import React, { useState } from 'react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';

export default function MasterPriceTable({ materials = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Gunakan useForm dari Inertia untuk handle submit
    const { data, setData, post, processing, reset, errors } = useForm({
        id: '',
        nama_material: '',
        harga_satuan: '',
    });

    const openEditModal = (material) => {
        setData({
            id: material.id,
            nama_material: material.nama_material,
            harga_satuan: material.harga_satuan || 0,
        });
        setIsModalOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('inventory.update-price'), {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            },
        });
    };

    return (
        <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50">
                <h3 className="font-bold text-gray-700">Master Harga Material</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase font-bold">
                        <tr>
                            <th className="px-6 py-3">Material</th>
                            <th className="px-6 py-3">Satuan</th>
                            <th className="px-6 py-3 text-right">Harga Satuan</th>
                            <th className="px-6 py-3 text-right">Total Nilai</th>
                            <th className="px-6 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-sm">
                        {materials.map((m) => (
                            <tr key={m.id} className="hover:bg-gray-50/50 transition">
                                <td className="px-6 py-4 font-semibold text-gray-800">{m.nama_material}</td>
                                <td className="px-6 py-4 text-gray-500">{m.satuan}</td>
                                <td className="px-6 py-4 text-right font-mono text-blue-600">
                                    Rp {new Intl.NumberFormat('id-ID').format(m.harga_satuan || 0)}
                                </td>
                                <td className="px-6 py-4 text-right font-bold text-gray-900">
                                    Rp {new Intl.NumberFormat('id-ID').format((m.harga_satuan || 0) * (m.stok_saat_ini || 0))}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button 
                                        onClick={() => openEditModal(m)}
                                        className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold hover:bg-blue-600 hover:text-white transition"
                                    >
                                        Edit Harga
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Update Harga */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={submit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Update Harga: {data.nama_material}
                    </h2>

                    <div className="mt-6">
                        <InputLabel htmlFor="harga_satuan" value="Harga Satuan (Rp)" />
                        <TextInput
                            id="harga_satuan"
                            type="number"
                            name="harga_satuan"
                            value={data.harga_satuan}
                            onChange={(e) => setData('harga_satuan', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="Contoh: 5000"
                            required
                        />
                        {errors.harga_satuan && <div className="text-red-500 text-xs mt-1">{errors.harga_satuan}</div>}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => setIsModalOpen(false)}>Batal</SecondaryButton>
                        <PrimaryButton className="ml-3" disabled={processing}>
                            Simpan Perubahan
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}