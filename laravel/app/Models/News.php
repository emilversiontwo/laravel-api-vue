<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class News extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'news';

    protected $fillable = ['title', 'text', 'published_at'];

    protected $casts = ['published_at' => 'date:Y-m-d'];
}
