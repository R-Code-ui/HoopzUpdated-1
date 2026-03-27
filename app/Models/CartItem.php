<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    protected $fillable = [
        'user_id',
        'product_id',
        'quantity',
    ];

    // Relationship: cart item belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relationship: cart item belongs to a product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
