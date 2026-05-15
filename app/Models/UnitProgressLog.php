<?php

// File: app/Models/UnitProgressLog.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UnitProgressLog extends Model
{
    // Mass assignment protection
    protected $fillable = [
    'unit_id', 
    'progress_lama', 
    'progress_baru', 
    'keterangan', 
    'foto_path' // Pastikan ini ada
];

    // Relasi balik ke Unit (Setiap log dimiliki oleh satu Unit)
    public function unit(): BelongsTo
    {
        return $this->belongsTo(Unit::class);
    }
    
}