<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        News::truncate();

        News::insert([
            ['title' => 'Запущено Docker-окружение', 'text' => 'Laravel, React и MongoDB работают в контейнерах.', 'published_at' => '2026-11-10'],
            ['title' => 'Подключена MongoDB', 'text' => 'Laravel работает с базой через mongodb/laravel-mongodb.', 'published_at' => '2026-11-10'],
            ['title' => 'Готов каркас сайта', 'text' => 'Добавлены шапка, подвал и пять страниц.', 'published_at' => '2026-11-10'],
        ]);
    }
}
