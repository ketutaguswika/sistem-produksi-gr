<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // Tambahkan ini
use Illuminate\Support\Facades\Log;  // Tambahkan ini
use Symfony\Component\HttpFoundation\Response;

class AuditLogMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Hanya catat aksi yang mengubah data (POST, DELETE, PATCH, PUT)
        if ($request->isMethod('delete') || $request->isMethod('post') || $request->isMethod('patch')) {
            
            // Menggunakan Auth::id() lebih "disukai" oleh VS Code daripada helper auth()->id()
            $userId = Auth::id() ?? 'Guest/System';
            
            Log::info("User ID {$userId} melakukan aksi di: " . $request->fullUrl(), [
                'method' => $request->method(),
                'ip' => $request->ip(),
                'payload' => $request->except(['password', 'password_confirmation']) // Keamanan: jangan catat password
            ]);
        }

        return $response;
    }
}