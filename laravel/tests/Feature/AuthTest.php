<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;

class AuthTest extends TestCase
{
    private array $payload = [
        'name' => 'Ivan',
        'email' => 'ivan@test.com',
        'password' => 'secret1',
        'password_confirmation' => 'secret1',
    ];

    public function test_user_can_register(): void
    {
        $this->postJson('/api/register', $this->payload)
            ->assertCreated()
            ->assertJsonStructure(['user' => ['id', 'name', 'email'], 'token'])
            ->assertJsonMissingPath('user.password');

        $this->assertSame(1, User::where('email', 'ivan@test.com')->count());
    }

    public function test_register_requires_unique_email_and_password_confirmation(): void
    {
        $this->postJson('/api/register', $this->payload)->assertCreated();

        $this->postJson('/api/register', $this->payload)->assertUnprocessable()->assertJsonValidationErrors('email');
        $this->postJson('/api/register', [...$this->payload, 'email' => 'new@test.com', 'password_confirmation' => 'other'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('password');
    }

    public function test_user_can_login_with_valid_credentials(): void
    {
        User::create(['name' => 'Ivan', 'email' => 'ivan@test.com', 'password' => 'secret1']);

        $this->postJson('/api/login', ['email' => 'ivan@test.com', 'password' => 'secret1'])
            ->assertOk()
            ->assertJsonStructure(['user', 'token']);
    }

    public function test_login_fails_with_wrong_password(): void
    {
        User::create(['name' => 'Ivan', 'email' => 'ivan@test.com', 'password' => 'secret1']);

        $this->postJson('/api/login', ['email' => 'ivan@test.com', 'password' => 'wrong'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('email');
    }

    public function test_me_requires_authentication(): void
    {
        $this->getJson('/api/me')->assertUnauthorized();
    }

    public function test_me_returns_current_user(): void
    {
        $token = $this->postJson('/api/register', $this->payload)->json('token');

        $this->withToken($token)->getJson('/api/me')->assertOk()->assertJsonPath('email', 'ivan@test.com');
    }

    public function test_token_stops_working_after_logout(): void
    {
        $token = $this->postJson('/api/register', $this->payload)->json('token');

        $this->withToken($token)->postJson('/api/logout')->assertNoContent();

        $this->app['auth']->forgetGuards();
        $this->withToken($token)->getJson('/api/me')->assertUnauthorized();
    }
}
