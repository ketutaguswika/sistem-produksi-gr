<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule; // Import Schedule

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
*/

// Command bawaan Laravel
Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

/**
 * Scheduler: Laporan Produksi Harian
 * Dimana: routes/console.php
 * Mengapa: Mengotomatisasi rekap data harian ke Manager setiap jam 5 sore.
 */
Schedule::command('report:daily-production')
    ->dailyAt('17:00')
    ->timezone('Asia/Jakarta') // Pastikan sesuai waktu lokalmu (WIB)
    ->onFailure(function () {
        // Jika gagal, log akan mencatatnya
        \Log::error("Scheduler Daily Production Gagal dijalankan pada " . now());
    });