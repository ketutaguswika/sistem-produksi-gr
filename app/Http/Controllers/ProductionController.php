<?php

namespace App\Http\Controllers;

use App\Services\ProductionService;
use App\Models\AuditLog;
use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;


class ProductionController extends Controller
{
    public function __construct(
        protected ProductionService $productionService
    ) {}

    public function create()
    {
        return Inertia::render('Production/UpdateProgres', [
            'units' => Unit::select('id', 'nama_unit', 'tipe')->get()
        ]);
    }

    public function audit()
    {
        Gate::authorize('viewAny', AuditLog::class);
        $logs = AuditLog::with('user')->latest()->get();

        return Inertia::render('Production/AuditDashboard', [
            'logs' => $logs,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'unit_id' => 'required|integer|exists:units,id', 
            'progres' => 'required|integer|min:0|max:100',
            'catatan' => 'nullable|string|max:500',
            'foto'    => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        try {
            // Audit: Pakai key 'foto_path' agar sinkron dengan baris 29 di ProductionService
            $validated['foto_path'] = null; 

            if ($request->hasFile('foto')) {
                $path = $request->file('foto')->store('progress-photos', 'public');
                $validated['foto_path'] = $path; // SINKRONKAN DI SINI
            }

            
            // Jangan kirim $validated mentah jika ada key yang tidak dibutuhkan service
            $this->productionService->storeProgress($validated);

            return redirect()->back()->with('message', 'Sukses menyimpan laporan!');
        } catch (\Exception $e) {
            Log::error("Production Store Error: " . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Gagal: ' . $e->getMessage()]);
        }
    }

}