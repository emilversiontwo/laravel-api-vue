<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(News::orderBy('published_at', 'desc')->get());
    }

    public function show(string $id): JsonResponse
    {
        return response()->json(News::findOrFail($id));
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

        return response()->json($news, 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $news = News::findOrFail($id);
        $this->authorizeOwner($request, $news);

        $news->update($this->validated($request));

        return response()->json($news);
    }

    public function destroy(Request $request, string $id): JsonResponse
    {
        $news = News::findOrFail($id);
        $this->authorizeOwner($request, $news);

        $news->delete();

        return response()->json(null, 204);
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
