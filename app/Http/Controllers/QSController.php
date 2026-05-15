<?php

// File: app/Http/Controllers/QSController.php
namespace App\Http\Controllers;

use App\Models\Material;
use Inertia\Inertia;
use Illuminate\Http\Request;

class QSController extends Controller
{
    public function index()
    {
        return Inertia::render('QS/Dashboard', [
            'materials' => Material::all(),
            'total_aset' => Material::sum(\DB::raw('stok * harga_satuan'))
        ]);
    }

    public function updateHarga(Request $request, $id)
    {
        $request->validate([
            'harga_satuan' => 'required|numeric|min:0',
            'stok_minimal' => 'required|integer'
        ]);

        $material = Material::findOrFail($id);
        $material->update([
            'harga_satuan' => $request->harga_satuan,
            'stok_minimal' => $request->stok_minimal
        ]);

        return redirect()->back()->with('success', 'Harga master berhasil diperbarui');
    }
}
