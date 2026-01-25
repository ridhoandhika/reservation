<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('console_room', function (Blueprint $table) {
            $table->uuid('room_id');
            $table->uuid('console_id');

            $table->foreign('room_id')->references('id')->on('rooms')->cascadeOnDelete();
            $table->foreign('console_id')->references('id')->on('consoles')->cascadeOnDelete();

            $table->primary(['room_id', 'console_id']);
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('console_room');
    }
};
