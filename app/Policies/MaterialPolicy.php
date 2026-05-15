<?php

// File: app/Policies/MaterialPolicy.php

namespace App\Policies;

use App\Models\User;

class MaterialPolicy
{
    /**
     * Siapa yang bisa melihat daftar stok & riwayat?
     */
    public function viewAny(User $user): bool
    {
        // Manager, Admin, QS, Arsitek, Drafter bisa lihat
        return in_array($user->role, ['manager', 'admin', 'qs', 'arsitek', 'drafter']);
    }

    /**
     * Siapa yang bisa input mutasi (masuk/keluar)?
     */
    public function createMutation(User $user): bool
    {
        // Hanya Manager dan Admin
        return in_array($user->role, ['manager', 'admin']);
    }

    /**
     * Siapa yang bisa mendaftarkan material baru di sistem?
     */
    public function createMaterial(User $user): bool
    {
        // Hanya Manager dan Admin
        return in_array($user->role, ['manager', 'admin']);
    }
}