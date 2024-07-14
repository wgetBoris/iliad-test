<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'price', 'order_id'];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
