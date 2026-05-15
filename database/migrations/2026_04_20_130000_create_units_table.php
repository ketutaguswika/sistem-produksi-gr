<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('units', function (Blueprint $table) {
            $table->id();
            $table->string('nama_unit'); 
            $table->string('tipe');
            $table->integer('progress_persen')->default(0);
            $table->string('status_terakhir')->default('Persiapan');
            $table->timestamps();
        });

        Schema::create('unit_progress_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('unit_id')->constrained('units')->onDelete('cascade');
            $table->integer('progress_lama');
            $table->integer('progress_baru');
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('unit_progress_logs');
        Schema::dropIfExists('units');
    }
};