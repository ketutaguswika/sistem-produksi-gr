<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Unit extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_unit',
        'tipe',
        'progress_persen',
        'status_terakhir'
    ];

    public function progressLogs(): HasMany
    {
        return $this->hasMany(UnitProgressLog::class);
    }

    public function materialMutations() {
        return $this->hasMany(MaterialMutation::class);
    }
    
    public function latestLog(): HasOne
    {
        return $this->hasOne(UnitProgressLog::class)->latestOfMany();
    }

}