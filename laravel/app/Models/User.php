<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Laravel\Sanctum\HasApiTokens;
use MongoDB\Laravel\Auth\User as Authenticatable;

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    use HasApiTokens;

    protected $connection = 'mongodb';

    protected $collection = 'users';

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }
}
