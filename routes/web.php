<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\InventoryController; 
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UnitController; 
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    
    // Dashboard Utama
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Profile Management
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // QS Dashboard (Manage Harga)
    Route::get('/qs/dashboard', [InventoryController::class, 'qsDashboard'])->name('qs.dashboard');
    Route::post('/inventory/update-price', [InventoryController::class, 'updatePrice'])->name('inventory.update-price');

    // Inventory System (Log Stok & CRUD Material)
    Route::get('/inventory', [InventoryController::class, 'index'])->name('inventory.index');
    // Ubah baris ini:
Route::post('/inventory/store', [InventoryController::class, 'storeMutation'])->name('inventory.store-mutation');
    Route::post('/inventory/material', [InventoryController::class, 'storeMaterial'])->name('inventory.store-material');
    Route::patch('/inventory/material/{id}', [InventoryController::class, 'updateMaterial'])->name('inventory.material.update');
    Route::delete('/inventory/material/{id}', [InventoryController::class, 'destroyMaterial'])->name('inventory.material.destroy');

    // Unit & Project Progress
    Route::get('/units', [UnitController::class, 'index'])->name('units.index');
    Route::post('/units', [UnitController::class, 'store'])->name('units.store');
    Route::post('/units/{unit}/update', [UnitController::class, 'updateProgress'])->name('units.update-progress');
    Route::delete('/units/{unit}', [UnitController::class, 'destroy'])->name('units.destroy');
});

require __DIR__.'/auth.php';