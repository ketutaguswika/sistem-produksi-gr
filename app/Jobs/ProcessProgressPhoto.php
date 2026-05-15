<?php

namespace App\Jobs;

use App\Models\ProgressReport;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image; // Pastikan sudah install Intervention Image

class ProcessProgressPhoto implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Tentukan jumlah percobaan jika job gagal.
     * Bagian: Reliability Layer - Retry & Failure Handling
     */
    public $tries = 3;
    public $backoff = 60; // Tunggu 60 detik sebelum mencoba lagi

    public function __construct(protected ProgressReport $report) {}

    public function handle(): void
    {
        // 1. Cek apakah file foto ada
        if (!$this->report->foto_bukti || !Storage::disk('public')->exists($this->report->foto_bukti)) {
            Log::warning("Foto tidak ditemukan untuk laporan ID: " . $this->report->id);
            return;
        }

        try {
            Log::info("Memulai optimasi foto untuk laporan ID: " . $this->report->id);

            // 2. Ambil path file asli
            $path = Storage::disk('public')->path($this->report->foto_bukti);

            /**
             * 3. Logic Optimasi (Contoh menggunakan Intervention Image)
             * Mengapa: Mengurangi ukuran file agar load dashboard manager lebih cepat.
             */
            // $image = Image::read($path);
            // $image->scale(width: 800); // Resize ke lebar 800px (proposional)
            // $image->save($path, quality: 70); // Simpan kembali dengan kompresi 70%

            Log::info("Optimasi selesai untuk laporan ID: " . $this->report->id);

        } catch (\Exception $e) {
            Log::error("Gagal memproses foto ID {$this->report->id}: " . $e->getMessage());
            throw $e; // Throw agar sistem retry menjalankan ulang job ini
        }
    }
}