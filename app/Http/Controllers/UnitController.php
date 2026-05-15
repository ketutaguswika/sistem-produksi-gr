<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use App\Models\Material;
use App\Http\Requests\UpdateUnitProgressRequest; // Import ini
use App\Services\UnitService; // Import ini
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UnitController extends Controller
{
    protected $unitService;

    public function __construct(UnitService $unitService)
    {
        $this->unitService = $unitService;
    }

    public function index()
    {
        $user = Auth::user(); // Ambil object user secara eksplisit

        return Inertia::render('Units/Index', [
            'units' => Unit::with(['latestLog'])->get()->map(fn($unit) => [
                'id' => $unit->id,
                'nama_unit' => $unit->nama_unit,
                
                'tipe' => $unit->tipe, // <--- TAMBAHKAN BARIS INI
                
                'progress_persen' => $unit->progress_persen,
                'status_terakhir' => $unit->status_terakhir,
                'foto_terakhir' => $unit->latestLog?->foto_path,
            ]),
            'materials' => Material::all() ?? [],
            'can' => [
                // Gunakan null safe operator (?) agar VS Code tenang
                'update_progress' => $user?->can('update-progress') ?? false,
                'manage_unit' => $user?->can('manage-inventory') ?? false,
            ]
        ]);
    }

    public function store(Request $request)
    {
        // 1. Tambahkan 'tipe' di dalam blok validasi ini
        $validated = $request->validate([
            'nama_unit' => 'required|string|max:255|unique:units,nama_unit',
            'tipe'      => 'required|string|max:100', // <-- INI YANG TERLEWAT
        ]);

        // 2. Karena $validated sekarang berisi 'nama_unit' dan 'tipe', 
        // keduanya akan otomatis masuk saat create
        Unit::create($validated + [
            'progress_persen' => 0,
            'status_terakhir' => 'Pembangunan'
        ]);

        return back()->with('success', 'Unit berhasil didaftarkan!');
    }

    public function updateProgress(UpdateUnitProgressRequest $request, Unit $unit)
    {
        // Logika pindah ke Service
        $this->unitService->updateProgress($unit, $request->validated());

        return back()->with('success', 'Progress unit berhasil diperbarui!');
    }

    public function destroy(Unit $unit)
    {
        // Logika pindah ke Service
        $this->unitService->deleteUnit($unit);

        return back()->with('success', 'Unit dan data terkait berhasil dihapus.');
    }
}