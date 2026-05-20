<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use App\Models\Material;
use App\Models\MaterialMutation;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Hitung Total RAB (Stok x Harga Satuan)
        $totalRab = Material::all()->sum(function($m) {
            return $m->stok_saat_ini * $m->harga_satuan;
        });

        $criticalMaterials = Material::whereColumn('stok_saat_ini', '<=', 'stok_minimal')
            ->take(5)
            ->get()
            ->map(function($m) {
                return [
                    'nama' => $m->nama_material,
                    'stok' => $m->stok_saat_ini . ' ' . $m->satuan
                ];
            });

        $staffActivities = MaterialMutation::with(['material', 'unit'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function($mut){
                return [
                    'id' => $mut->id,
                    'nama' => 'Staff Gudang',
                    'aksi' => $mut->jenis === 'masuk' ? 'Restock ' . $mut->material->nama_material : 'Distribusi ' . $mut->material->nama_material . ' ke ' . ($mut->unit->nama_unit ?? 'Proyek'),
                    'jumlah' => $mut->jenis === 'keluar' ? ($mut->jumlah . ' ' . $mut->material->satuan) : '-',
                    'alasan' => $mut->keterangan,
                    'waktu' => $mut->created_at->diffForHumans(),
                    'status' => $mut->jenis === 'masuk' ? 'success' : 'warning'
                ];
            });

        return Inertia::render('Dashboard', [
            'stats' => [
                // Metrik Angka
                'total_units'     => Unit::where('status_terakhir', '!=', 'Selesai')->count(),
                'low_stock_count' => Material::whereColumn('stok_saat_ini', '<=', 'stok_minimal')->count(),
                'today_mutations' => MaterialMutation::whereDate('created_at', today())->count(),
                'archive_today'   => 0, // Placeholder untuk admin produksi nanti
                
                // Format angka RAB menjadi format ribuan (ex: 15.000.000)
                'total_rab_value' => number_format($totalRab, 0, ',', '.'),

                // Data Array untuk daftar/tabel
                'recent_progress' => Unit::where('status_terakhir', '!=', 'Selesai')
                                        ->orderBy('updated_at', 'desc')
                                        ->take(3)
                                        ->get(['nama_unit', 'progress_persen', 'status_terakhir']),
                'critical_materials' => $criticalMaterials,
                'staff_activities'   => $staffActivities
            ]
        ]);
    }
}