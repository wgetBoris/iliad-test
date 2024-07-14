<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['name', 'description', 'date'];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
