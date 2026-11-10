<?php

namespace Database\Seeders;

use App\Models\News;
use App\Models\User;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        News::truncate();

        $author = User::firstOrCreate(
            ['email' => 'demo@example.com'],
            ['name' => 'Demo', 'password' => 'password'],
        );

        $items = [
            ['title' => 'Запущено Docker-окружение', 'text' => 'Laravel, React и MongoDB работают в контейнерах.'],
            ['title' => 'Подключена MongoDB', 'text' => 'Laravel работает с базой через mongodb/laravel-mongodb.'],
            ['title' => 'Готов каркас сайта', 'text' => 'Добавлены шапка, подвал и пять страниц.'],
        ];

        foreach ($items as $item) {
            News::create([
                ...$item,
                'published_at' => '2026-11-10',
                'user_id' => (string) $author->id,
                'author_name' => $author->name,
            ]);
        }
    }
}
