<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\User;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
{
    // Akses penuh untuk Direktur / GM
    Gate::before(function (User $user) {
        if ($user->role === 'gm') return true;
    });

    // Gate khusus departemen Produksi
    Gate::define('manage-inventory', function (User $user) {
        return in_array($user->role, ['manager_produksi', 'purchasing', 'admin']);
    });

    // Gate khusus update progres proyek
    Gate::define('update-progress', function (User $user) {
        return in_array($user->role, ['manager_produksi', 'arsitek', 'site_manager']);
    });
}
}
