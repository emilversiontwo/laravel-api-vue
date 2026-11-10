<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index(): JsonResponse
    {
        $user = auth('sanctum')->user();

        return response()->json(
            News::orderBy('published_at', 'desc')->get()->map(fn (News $news) => $this->present($news, $user)),
        );
    }

    public function show(string $id): JsonResponse
    {
        return response()->json($this->present(News::findOrFail($id), auth('sanctum')->user()));
    }

    public function like(Request $request, string $id): JsonResponse
    {
        $news = News::findOrFail($id);
        $userId = (string) $request->user()->id;

        if (in_array($userId, $news->liked_by ?? [], true)) {
            $news->pull('liked_by', $userId);
        } else {
            $news->push('liked_by', $userId, true);
        }

        return response()->json($this->present($news->fresh(), $request->user()));
    }

    public function store(Request $request): JsonResponse
    {
        $user = $request->user();

        $news = News::create([
            ...$this->validated($request),
            'published_at' => now()->toDateString(),
            'user_id' => (string) $user->id,
            'author_name' => $user->name,
        ]);

        return response()->json($this->present($news, $user), 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $news = News::findOrFail($id);
        $this->authorizeOwner($request, $news);

        $news->update($this->validated($request));

        return response()->json($this->present($news, $request->user()));
    }

    public function destroy(Request $request, string $id): JsonResponse
    {
        $news = News::findOrFail($id);
        $this->authorizeOwner($request, $news);

        $news->delete();

        return response()->json(null, 204);
    }

    private function present(News $news, ?Authenticatable $user): array
    {
        $likedBy = $news->liked_by ?? [];

        return [
            ...$news->toArray(),
            'likes_count' => count($likedBy),
            'liked' => $user !== null && in_array((string) $user->id, $likedBy, true),
        ];
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'text' => ['required', 'string'],
        ]);
    }

    private function authorizeOwner(Request $request, News $news): void
    {
        abort_unless($news->user_id === (string) $request->user()->id, 403, 'Нельзя изменять чужую новость.');
    }
}
