<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Playstation extends Model
{
    use HasFactory, HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'type',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    // relasi yang benar
    public function rooms()
    {
        return $this->hasMany(Room::class, 'playstation_id', 'id');
    }
}
