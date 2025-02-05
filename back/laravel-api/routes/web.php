<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

// Test route to ensure API is working
Route::get('/hello', function () {
    return response()->json(['message' => 'Hello, World!']);
});

Route::get('/test-cors', function () {
    return response()->json(['success' => true]);
});

// User routes
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::get('/user/{username}', [UserController::class, 'getUser']);
Route::get('/email/{email}', [UserController::class, 'getEmail']);
Route::post('/googleauth', [UserController::class, 'googleauth']);

Route::post('/edit', [UserController::class, 'edit']);





