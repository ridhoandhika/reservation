<?php


namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\BookingRepository;
use App\Repositories\BookingRepositoryImplementation;
use App\Repositories\PlaystationRepository;
use App\Repositories\PlaystationRepositoryImplementation;
use App\Repositories\RoomRepository;
use App\Repositories\RoomRepositoryImplementation;
use App\Repositories\BookingSlotRepository;
use App\Repositories\BookingSlotRepositoryImplementation;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(BookingRepository::class, BookingRepositoryImplementation::class);
        $this->app->bind(PlaystationRepository::class, PlaystationRepositoryImplementation::class);
        $this->app->bind(RoomRepository::class, RoomRepositoryImplementation::class);
        $this->app->bind(
            BookingSlotRepository::class,
            BookingSlotRepositoryImplementation::class
        );
    }

    public function boot(): void
    {
        //
    }
}
