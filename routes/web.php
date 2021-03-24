<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\WelcomeController;

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
Route::prefix('salimos-tuani')->group(function() {
    Route::get('/', [WelcomeController::class, 'index']);
    Route::get('/{slug}', [WelcomeController::class, 'show'])->where('slug', '[0-9a-z-_]+');
});

Route::get('/terminos-y-usos', [WelcomeController::class, 'index']);
Route::get('/colaboradores', [WelcomeController::class, 'index']);
