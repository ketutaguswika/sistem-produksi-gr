<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
           
             
            $table->enum('role', [
                'gm',                 // Direktur / General Manager
                'manager_produksi',   // Manager Produksi
                'arsitek',            // Arsitek / Drafter
                'purchasing',         // Bagian Pembelian
                'site_manager',       // Site Manager Proyek
                'admin',              // Admin Produksi/Finance
                'staff'               // Akses dasar (default)
            ])->default('staff')->after('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
        });
    }
};