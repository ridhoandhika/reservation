<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory, HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'name',
        'playstation_id',
        'price_per_hour'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'room_id', 'id');
    }

    public function playstation()
    {
        return $this->belongsTo(Playstation::class, 'playstation_id', 'id');
    }
}
