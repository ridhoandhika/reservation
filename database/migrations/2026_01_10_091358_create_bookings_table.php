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
        Schema::create('bookings', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('room_id')->constrained('rooms')->cascadeOnDelete();
            $table->string('name');
            $table->string('email');
            $table->string('phone_number')->nullable();

            $table->enum('status', [
                'paid',
                'unpaid',
                'pending',
                'confirmed',
                'expired'
            ])->default('pending');

            $table->decimal('total_price', 10, 2)->default(0);
            $table->timestamps();

            $table->index(['room_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
