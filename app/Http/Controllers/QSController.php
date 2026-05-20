<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Inertia\Inertia;
use Illuminate\Http\Request;

class QSController extends Controller
{
    public function index()
    {
        $materials = Material::all();
        
        // 1. Total Valuasi Aset
        $totalValue = $materials->sum(fn($m) => $m->stok_saat_ini * $m->harga_satuan);
        
        // 2. Rata-rata Harga Satuan
        $avgPrice = $materials->avg('harga_satuan');

        // 3. Analisis Pareto (Top 5 High Value Items)
        $highValueItems = $materials->map(function($m) {
            return [
                'nama' => $m->nama_material,
                'total_nilai' => $m->stok_saat_ini * $m->harga_satuan
            ];
        })->sortByDesc('total_nilai')->take(5)->values(); // .values() biar index-nya rapi

        return Inertia::render('QS/Dashboard', [
            'materials' => $materials,
            'stats' => [
                'total_value' => $totalValue,
                'total_items' => $materials->count(),
                'avg_price'   => $avgPrice, // Data ini yang kurang di kodenya
                'low_stock'   => Material::whereColumn('stok_saat_ini', '<=', 'stok_minimal')->count()
            ],
            'high_value_items' => $highValueItems // Data ini yang kurang di kodenya
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

        return redirect()->back()->with('success', 'Harga/Data material diperbarui');
    }
}