<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\SpectacleController;
use App\Http\Controllers\AlbumController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [WelcomeController::class, 'index']);
Route::prefix('juimonos')->group(function() {
    Route::get('/', [WelcomeController::class, 'index']);
    Route::get('/{slug}', [SpectacleController::class, 'promenade'])->where('slug', '[0-9a-z-_]+');
});
Route::prefix('tula-cuecho')->group(function() {
    Route::get('/', [WelcomeController::class, 'index']);
    Route::get('/{slug}', [SpectacleController::class, 'chitchat'])->where('slug', '[0-9a-z-_]+');
});
Route::prefix('salimos-tuani')->group(function() {
    Route::get('/', [WelcomeController::class, 'index']);
    Route::get('/{slug}', [AlbumController::class, 'album'])->where('slug', '[0-9a-z-_]+');
});

Route::get('/terminos-y-usos', [WelcomeController::class, 'index']);
Route::get('/colaboradores', [WelcomeController::class, 'index']);

Route::get('/inicia-sesion', [WelcomeController::class, 'index']);
Route::get('/olvidaste-la-contrasena', [WelcomeController::class, 'index']);
Route::get('/registrate', [WelcomeController::class, 'index']);
Route::get('/suscribite', [WelcomeController::class, 'index']);
Route::get('/contactanos', [WelcomeController::class, 'index']);
