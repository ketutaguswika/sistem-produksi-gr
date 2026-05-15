<?php

namespace App\Services;

use App\Models\Unit;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class UnitService
{
    public function updateProgress(Unit $unit, array $data)
    {
        return DB::transaction(function () use ($unit, $data) {
            $fotoPath = null;
            if (isset($data['foto_progres'])) {
                $fotoPath = $data['foto_progres']->store('progres', 'public');
            }

            // Simpan Log
            $unit->progressLogs()->create([
                'progress_lama' => $unit->progress_persen,
                'progress_baru' => $data['progress_baru'],
                'keterangan' => $data['keterangan'],
                'foto_path' => $fotoPath,
            ]);

            // Update Master Unit
            return $unit->update([
                'progress_persen' => $data['progress_baru'],
                'status_terakhir' => $data['progress_baru'] == 100 ? 'Selesai' : 'Pembangunan'
            ]);
        });
    }

    public function deleteUnit(Unit $unit)
    {
        DB::transaction(function () use ($unit) {
            // Hapus file fisik
            foreach ($unit->progressLogs as $log) {
                if ($log->foto_path) {
                    Storage::disk('public')->delete($log->foto_path);
                }
            }

            // Hapus relasi
            $unit->progressLogs()->delete();
            DB::table('material_mutations')->where('unit_id', $unit->id)->delete();
            
            // Hapus data utama
            $unit->delete();
        });
    }
}