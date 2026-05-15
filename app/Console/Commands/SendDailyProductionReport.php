<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Models\ProgressReport;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class SendDailyProductionReport extends Command
{
    // Nama perintah yang dipanggil di terminal nanti
    protected $signature = 'report:daily-production';
    protected $description = 'Mengirim ringkasan progres harian ke Manager';

    public function handle()
    {
        // 1. Ambil progres yang dibuat hari ini
        $reportsToday = ProgressReport::whereDate('created_at', today())->get();

        if ($reportsToday->isEmpty()) {
            $this->info('Tidak ada progres hari ini. Laporan dibatalkan.');
            return;
        }

        // 2. Logika pengiriman (Misal: Kirim Notif atau Email)
        $managers = User::where('role', 'manager')->get();
        
        foreach ($managers as $manager) {
            // Di sini kamu bisa memanggil Notification atau Mail
            Log::info("Mengirim laporan harian ke Manager: " . $manager->email);
        }

        $this->info('Laporan harian berhasil diproses!');
    }
}