<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Material extends Model
{
    use HasFactory;

    protected $fillable = [
        'kode_material', 
        'nama_material', 
        'satuan', 
        'stok_saat_ini',
        'harga_satuan'
    ];
}