<?php

namespace Tests\Feature;

use App\Models\News;
use App\Models\User;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class NewsTest extends TestCase
{
    private function makeNews(User $author, array $attributes = []): News
    {
        return News::create([
            'title' => 'Title',
            'text' => 'Text',
            'published_at' => '2026-11-10',
            'user_id' => (string) $author->id,
            'author_name' => $author->name,
            ...$attributes,
        ]);
    }

    private function makeUser(string $email = 'ivan@test.com'): User
    {
        return User::create(['name' => 'Ivan', 'email' => $email, 'password' => 'secret1']);
    }

    public function test_news_list_is_public_and_sorted_by_date(): void
    {
        $author = $this->makeUser();
        $this->makeNews($author, ['title' => 'Old', 'published_at' => '2026-11-01']);
        $this->makeNews($author, ['title' => 'New', 'published_at' => '2026-11-10']);

        $this->getJson('/api/news')
            ->assertOk()
            ->assertJsonCount(2)
            ->assertJsonPath('0.title', 'New')
            ->assertJsonPath('0.likes_count', 0)
            ->assertJsonPath('0.liked', false);
    }

    public function test_news_item_can_be_shown(): void
    {
        $news = $this->makeNews($this->makeUser());

        $this->getJson("/api/news/{$news->id}")->assertOk()->assertJsonPath('title', 'Title');
        $this->getJson('/api/news/000000000000000000000000')->assertNotFound();
    }

    public function test_guest_cannot_create_news(): void
    {
        $this->postJson('/api/news', ['title' => 'A', 'text' => 'B'])->assertUnauthorized();
    }

    public function test_user_can_create_news_and_becomes_author(): void
    {
        $user = $this->makeUser();
        Sanctum::actingAs($user);

        $this->postJson('/api/news', ['title' => 'A', 'text' => 'B'])
            ->assertCreated()
            ->assertJsonPath('user_id', (string) $user->id)
            ->assertJsonPath('author_name', 'Ivan');
    }

    public function test_news_requires_title_and_text(): void
    {
        Sanctum::actingAs($this->makeUser());

        $this->postJson('/api/news', ['title' => ''])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['title', 'text']);
    }

    public function test_author_can_update_and_delete_news(): void
    {
        $author = $this->makeUser();
        $news = $this->makeNews($author);
        Sanctum::actingAs($author);

        $this->putJson("/api/news/{$news->id}", ['title' => 'Changed', 'text' => 'New text'])
            ->assertOk()
            ->assertJsonPath('title', 'Changed');

        $this->deleteJson("/api/news/{$news->id}")->assertNoContent();
        $this->assertSame(0, News::count());
    }

    public function test_other_user_cannot_update_or_delete_news(): void
    {
        $news = $this->makeNews($this->makeUser());
        Sanctum::actingAs($this->makeUser('other@test.com'));

        $this->putJson("/api/news/{$news->id}", ['title' => 'X', 'text' => 'Y'])->assertForbidden();
        $this->deleteJson("/api/news/{$news->id}")->assertForbidden();
        $this->assertSame('Title', $news->fresh()->title);
    }
}
