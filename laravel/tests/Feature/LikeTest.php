<?php

namespace Tests\Feature;

use App\Models\News;
use App\Models\User;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class LikeTest extends TestCase
{
    private function makeNews(): News
    {
        return News::create(['title' => 'Title', 'text' => 'Text', 'published_at' => '2026-11-10', 'user_id' => 'x', 'author_name' => 'x']);
    }

    private function makeUser(string $email): User
    {
        return User::create(['name' => 'User', 'email' => $email, 'password' => 'secret1']);
    }

    public function test_guest_cannot_like(): void
    {
        $news = $this->makeNews();

        $this->postJson("/api/news/{$news->id}/like")->assertUnauthorized();
    }

    public function test_like_is_toggled(): void
    {
        $news = $this->makeNews();
        Sanctum::actingAs($this->makeUser('a@test.com'));

        $this->postJson("/api/news/{$news->id}/like")->assertOk()->assertJsonPath('likes_count', 1)->assertJsonPath('liked', true);
        $this->postJson("/api/news/{$news->id}/like")->assertOk()->assertJsonPath('likes_count', 0)->assertJsonPath('liked', false);
    }

    public function test_likes_from_different_users_are_counted(): void
    {
        $news = $this->makeNews();

        Sanctum::actingAs($this->makeUser('a@test.com'));
        $this->postJson("/api/news/{$news->id}/like");

        Sanctum::actingAs($this->makeUser('b@test.com'));
        $this->postJson("/api/news/{$news->id}/like")->assertJsonPath('likes_count', 2);
    }

    public function test_liked_list_is_not_exposed(): void
    {
        $news = $this->makeNews();
        Sanctum::actingAs($this->makeUser('a@test.com'));
        $this->postJson("/api/news/{$news->id}/like");

        $this->getJson("/api/news/{$news->id}")->assertJsonMissingPath('liked_by');
    }
}
