<?php

namespace App\Services;

use App\Models\ProgressReport;
use App\Models\AuditLog;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProductionService
{
   
    public function storeProgress(array $data)
    {
        
        DB::beginTransaction();
       try {
        // Ambil path secara eksplisit
        $pathGambar = isset($data['foto_path']) ? $data['foto_path'] : null;

        $report = ProgressReport::create([
            'unit_id'          => $data['unit_id'],
            'user_id'          => auth()->id(), 
            'progres_saat_ini' => $data['progres'],
            'catatan'          => $data['catatan'] ?? null,
            'foto_bukti'       => $pathGambar, // Gunakan variabel eksplisit
        ]);
            AuditLog::create([
                'user_id' => auth()->id(),
                'unit_id' => $data['unit_id'],
                'activity' => 'Update Progres', // Faktual: Wajib diisi (Required)
                'details' => "Memperbarui progres unit ID {$data['unit_id']} menjadi {$data['progres']}%", 
            ]);

            DB::commit();
            return $report;

        } catch (\Exception $e) {
            DB::rollBack();
            throw $e; // Lempar kembali ke Controller agar dpt ditangkap try-catch di sana
        }
    }
}