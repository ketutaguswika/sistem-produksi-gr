<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
   public function run(): void
{
    // 1. Buat User Manager (Ganti 'manager' jadi 'manager_produksi')
    \App\Models\User::create([
        'name'     => 'Manager Produksi',
        'email'    => 'manager@gmail.com',
        'password' => \Illuminate\Support\Facades\Hash::make('password'),
        'role'     => 'manager_produksi', // HARUS SESUAI ENUM
    ]);

    // 2. Buat User QS/Staff
    \App\Models\User::create([
        'name'     => 'QS Staff',
        'email'    => 'qs@gmail.com',
        'password' => \Illuminate\Support\Facades\Hash::make('password'),
        'role'     => 'staff', // Gunakan 'staff' jika 'qs' tidak ada di enum
    ]);

    // 3. Buat User Arsitek
    \App\Models\User::create([
        'name'     => 'Arsitek Utama',
        'email'    => 'arsitek@gmail.com',
        'password' => \Illuminate\Support\Facades\Hash::make('password'),
        'role'     => 'arsitek', // Arsitek ada di enum kamu
    ]);

    // 4. Buat User Admin
    \App\Models\User::create([
        'name'     => 'Admin Gudang',
        'email'    => 'admin@gmail.com',
        'password' => \Illuminate\Support\Facades\Hash::make('password'),
        'role'     => 'admin', // Admin ada di enum kamu
    ]);

    // Panggil seeder lainnya
    $this->call([
        UnitSeeder::class,
    ]);

    // Buat Material Awal
    \App\Models\Material::create([
        'kode_material' => 'SMN-001',
        'nama_material' => 'Semen Tiga Roda',
        'satuan'        => 'Sak',
        'stok_saat_ini' => 100,
        'harga_satuan'  => 65000,
        'stok_minimal'  => 10,
    ]);
}
}