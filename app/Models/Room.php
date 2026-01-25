<?php

namespace App\Models;

use App\Enums\RoomType;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory, HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $casts = [
        'type' => RoomType::class,
        'price_per_hour' => 'integer',
    ];

    protected $fillable = [
        'id',
        'name',
        'type',
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

    public function consoles()
    {
        return $this->belongsToMany(Console::class, 'console_room');
    }

    public function images()
    {
        return $this->hasMany(RoomImage::class);
    }
}
