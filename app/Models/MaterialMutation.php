<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaterialMutation extends Model
{
    protected $fillable = [
        'material_id', 
        'jenis', 
        'jumlah', 
        'unit_id', 
        'user_id', 
        'keterangan'
    ];

    // Relasi ke Material
    public function material() {
        return $this->belongsTo(Material::class);
    }

    // Relasi ke Unit (Rumah)
    public function unit() {
        return $this->belongsTo(Unit::class);
    }
}