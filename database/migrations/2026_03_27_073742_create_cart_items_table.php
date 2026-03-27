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
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id();

            // Link to user (who owns this cart item)
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // Link to product
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();

            // Quantity of the product
            $table->integer('quantity');

            $table->timestamps();

            // Prevent duplicate product per user
            $table->unique(['user_id', 'product_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart_items');
    }
};
