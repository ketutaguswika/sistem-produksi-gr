<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class MaterialController extends Controller
{
    public function store(Request $request)
    {
        // Validation Layer: Memastikan data unik dan valid
        $request->validate([
            'kode_material' => 'required|string|max:50|unique:materials,kode_material',
            'nama_material' => 'required|string|max:255',
            'satuan'        => 'required|string|max:20',
            'stok_awal'     => 'nullable|numeric|min:0',
        ]);

        // Simpan data ke database
        Material::create([
            'kode_material' => $request->kode_material,
            'nama_material' => $request->nama_material,
            'satuan'        => $request->satuan,
            'stok_saat_ini' => $request->stok_awal ?? 0, // Inisialisasi stok awal
        ]);

        // Berikan feedback ke Inertia
        return Redirect::back()->with('message', 'Material baru berhasil didaftarkan.');
    }
}