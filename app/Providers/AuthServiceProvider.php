<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
    // Akses penuh/Hapus (GM & Manager Produksi)
    Gate::define('manage-all', function ($user) {
        return in_array($user->role, ['gm', 'manager_produksi']);
    });

    // Akses Operasional Inventory (Manager, Purchasing, Admin)
    Gate::define('manage-inventory', function ($user) {
        return in_array($user->role, ['gm', 'manager_produksi', 'purchasing', 'admin']);
    });

    // Akses Lihat Saja (Arsitek, Site Manager)
    Gate::define('view-inventory', function ($user) {
        return true; // Semua user yang login bisa lihat
    });
    }
}
