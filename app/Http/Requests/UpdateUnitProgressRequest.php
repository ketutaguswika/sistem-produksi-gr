<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUnitProgressRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'progress_baru' => 'required|numeric|min:0|max:100',
            'keterangan' => 'required|string|max:1000',
            'foto_progres' => 'nullable|image|mimes:jpg,jpeg,png|max:2048', 
        ];
    }
}