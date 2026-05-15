<?php

namespace App\Events;

use App\Models\AuditLog;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AuditPublished implements ShouldBroadcast, ShouldQueue
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Pastikan $audit memiliki relasi 'user' yang sudah terload
     */
    public function __construct(public AuditLog $audit) {}

    public function broadcastOn(): array
    {
        return [
            new Channel('production-audit'),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->audit->id,
            'user' => $this->audit->user ? $this->audit->user->name : 'System',
            'aktivitas' => $this->audit->aktivitas,
            'deskripsi' => $this->audit->deskripsi,
            'waktu' => $this->audit->created_at->diffForHumans(),
        ];
    }
}