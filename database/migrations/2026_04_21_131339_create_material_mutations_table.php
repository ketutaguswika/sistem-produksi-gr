<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Tabel Materials
        Schema::create('materials', function (Blueprint $table) {
            $table->id();
            $table->string('kode_material')->unique(); 
            $table->string('nama_material');
            $table->string('satuan'); 
            $table->integer('stok_saat_ini')->default(0); 
            $table->decimal('harga_satuan', 15, 2)->default(0);
            $table->integer('stok_minimal')->default(10);
            $table->timestamps();
        });

        // Tabel Mutasi
        Schema::create('material_mutations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('material_id')->constrained('materials')->onDelete('cascade');
            
            // TAMBAHAN: Kolom unit_id dan user_id
            $table->foreignId('unit_id')->nullable()->constrained('units')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            
            $table->enum('jenis', ['masuk', 'keluar']); 
            $table->integer('jumlah');
            $table->text('keterangan')->nullable();
            $table->timestamps(); 
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('material_mutations');
        Schema::dropIfExists('materials');
    }
};