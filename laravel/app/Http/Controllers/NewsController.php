<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\JsonResponse;

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
}
