<?php

// File: app/Http/Controllers/DashboardController.php

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
    return Inertia::render('Dashboard', [
        'stats' => [
            // Karena 'status_terakhir' sudah ditambah lewat migration di atas
            'total_units' => Unit::where('status_terakhir', '!=', 'completed')->count(),
            
            // Hitung material stok rendah (pastikan tabel 'materials' sudah ada)
            'low_stock_count' => Material::where('stok_saat_ini', '<', 10)->count(),
            
            // Mutasi hari ini
            'today_mutations' => MaterialMutation::whereDate('created_at', today())->count(),
            
            // Progress terbaru (mengambil kolom yang baru kita buat)
            'recent_progress' => Unit::orderBy('updated_at', 'desc')
                ->take(5)
                ->get(['nama_unit', 'progress_persen', 'status_terakhir'])
        ]
    ]);
}
}