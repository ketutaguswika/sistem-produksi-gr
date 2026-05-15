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
    Schema::table('unit_progress_logs', function (Blueprint $table) {
        // Mengapa: after('keterangan') agar posisi kolom rapi di database
        $table->string('foto_path')->nullable()->after('keterangan');
    });
}

public function down(): void
{
    Schema::table('unit_progress_logs', function (Blueprint $table) {
        $table->dropColumn('foto_path');
    });
}
};
