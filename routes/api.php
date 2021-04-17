<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\PromenadeController;
use App\Http\Controllers\ChitchatController;
use App\Http\Controllers\CommercialController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('promenades/search', [PromenadeController::class, 'search'])->name('promenades.search');
Route::get('promenades/prominents', [PromenadeController::class, 'prominents'])->name('promenades.prominents');
Route::get('chitchats/search', [ChitchatController::class, 'search'])->name('chitchats.search');
Route::get('chitchats/prominents', [ChitchatController::class, 'prominents'])->name('chitchats.prominents');

Route::apiResources([
    'categories' => CategoryController::class,
    'albums' => AlbumController::class,
    'photos' => PhotoController::class,
    'promenades' => PromenadeController::class,
    'chitchats' => ChitchatController::class,
    'commercials' => CommercialController::class,
]);
