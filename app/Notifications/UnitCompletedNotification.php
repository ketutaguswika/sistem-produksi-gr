<?php

namespace App\Notifications;

use App\Models\ProgressReport;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class UnitCompletedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(protected ProgressReport $report) {}

    // Simpan di Database dan (Opsional) kirim Email
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    // Isi data yang disimpan di tabel 'notifications'
    public function toArray(object $notifiable): array
    {
        return [
            'unit_id' => $this->report->unit_id,
            'pesan' => "Unit ID {$this->report->unit_id} telah mencapai progres 100%!",
            'user' => $this->report->user->name ?? 'System',
        ];
    }
}