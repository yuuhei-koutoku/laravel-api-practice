<?php

use App\Http\Controllers\Admin\API\AuthController;
use App\Http\Controllers\Admin\API\DealController;
use App\Http\Controllers\Admin\API\UserController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::post('/auth/signin', [AuthController::class, 'signin']);

// Route::middleware(['auth:admin_api'])->group(function () {
//     Route::post('/auth/signout', [AuthController::class, 'signout']);
//     Route::get('/auth/me', [AuthController::class, 'getMe']);

//     Route::get('/deals', [DealController::class, 'index']);
//     Route::get('/deals/{deal}', [DealController::class, 'show']);

//     Route::get('/users', [UserController::class, 'index']);
//     Route::get('/users/{user}', [UserController::class, 'show']);
//     Route::get('/users/{user}/purchased_deals', [UserController::class, 'getPurchasedDeals']);
//     Route::get('/users/{user}/listed_deals', [UserController::class, 'getListedDeals']);
// });
