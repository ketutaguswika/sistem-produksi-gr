<?php

namespace App\Http\Controllers;

use App\Models\Material;
use App\Models\MaterialMutation;
use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;

class InventoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Inventory/Index', [
            'can' => [
                'manage_inventory' => Auth::user()->can('manage_inventory'),
                'manage_all' => Auth::user()->can('manage-all'),
            ],
            'materials' => Material::select('id', 'kode_material', 'nama_material', 'stok_saat_ini', 'satuan')
                            ->orderBy('nama_material', 'asc')->get(),
            'units' => Unit::select('id', 'nama_unit')
                            ->orderBy('nama_unit', 'asc')->get(),
            'mutations' => MaterialMutation::with([
                                'material:id,kode_material,nama_material,satuan',
                                'unit:id,nama_unit'
                            ])
                            ->latest()
                            ->take(50)
                            ->get(),
        ]);
    }

    public function storeMaterial(Request $request)
    {
        if (Gate::denies('manage-inventory')) {
            return redirect()->back()->withErrors(['error' => 'Anda tidak memiliki akses untuk melakukan aksi ini.']);
        }

        $validated = $request->validate([
            'kode_material' => 'required|string|unique:materials,kode_material|max:50',
            'nama_material' => 'required|string|max:255',
            'satuan'        => 'required|string|max:20',
            'stok_awal'     => 'required|integer|min:0',
        ]);

        Material::create([
            'kode_material' => $validated['kode_material'],
            'nama_material' => $validated['nama_material'],
            'satuan'        => $validated['satuan'],
            'stok_saat_ini' => $validated['stok_awal'],
        ]);

        return redirect()->back()->with('success', 'Material baru berhasil didaftarkan!');
    }

    public function storeMutation(Request $request)
    {
        $validated = $request->validate([
            'material_id' => 'required|exists:materials,id',
            'jenis'       => 'required|in:masuk,keluar',
            'jumlah'      => 'required|integer|min:1',
            'unit_id'     => 'required_if:jenis,keluar|nullable|exists:units,id',
            'keterangan'  => 'nullable|string|max:255',
        ]);

        try {
            DB::transaction(function () use ($validated) {
                $material = Material::lockForUpdate()->findOrFail($validated['material_id']);

                if ($validated['jenis'] === 'masuk') {
                    $material->increment('stok_saat_ini', $validated['jumlah']);
                } else {
                    if ($material->stok_saat_ini < $validated['jumlah']) {
                        throw ValidationException::withMessages([
                            'jumlah' => "Stok {$material->nama_material} tidak mencukupi!"
                        ]);
                    }
                    $material->decrement('stok_saat_ini', $validated['jumlah']);
                }

                MaterialMutation::create([
                    'material_id' => $validated['material_id'],
                    'jenis'       => $validated['jenis'],
                    'jumlah'      => $validated['jumlah'],
                    'unit_id'     => $validated['jenis'] === 'keluar' ? $validated['unit_id'] : null,
                    'user_id'     => Auth::id(), 
                    'keterangan'  => $validated['keterangan'],
                ]);
            });

            return redirect()->back()->with('success', 'Transaksi stok berhasil disimpan!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function qsDashboard()
    {
        $materials = Material::all();
        $totalValue = $materials->sum(fn($m) => $m->stok_saat_ini * ($m->harga_satuan ?? 0));

        return Inertia::render('Inventory/QsDashboard', [
            'materials' => $materials,
            'stats' => [
                'total_value' => $totalValue,
                'total_items' => $materials->count(),
            ]
        ]);
    }

    public function updatePrice(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:materials,id',
            'harga_satuan' => 'required|numeric|min:0',
        ]);

        Material::where('id', $validated['id'])->update(['harga_satuan' => $validated['harga_satuan']]);
        return redirect()->back()->with('success', 'Harga berhasil diperbarui!');
    }

    public function updateMaterial(Request $request, $id)
    {

        if (Gate::denies('manage-inventory')) {
            return redirect()->back()->withErrors(['error' => 'Hanya QS atau Manager yang dapat mengubah data.']);
        }

        $validated = $request->validate([
            'nama_material' => 'required|string|max:255',
            'satuan'        => 'required|string|max:20',
        ]);

        Material::findOrFail($id)->update($validated);
        return redirect()->back()->with('success', 'Data material diperbarui!');
    }

    public function destroyMaterial($id)
    {

        if (Gate::denies('manage-all')) {
            return redirect()->back()->withErrors(['error' => 'Hanya Manager yang diizinkan menghapus data master!']);
        }

        $material = Material::findOrFail($id);
        if ($material->mutations()->exists()) {
            return redirect()->back()->withErrors(['error' => 'Material memiliki riwayat transaksi!']);
        }
        $material->delete();
        return redirect()->back()->with('success', 'Material dihapus!');
    }
}