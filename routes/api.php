<?php

use App\Models\RoomCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\RoomCategoryController;



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

// GET Properties
Route::get('properties', [PropertyController::class, 'index']); // with pagination
Route::get('allproperties', [PropertyController::class, 'all']); // Entire List of Categories
Route::get('category', [PropertyController::class, 'category']); // Specific category of properties
Route::get('properties/{id}', [PropertyController::class, 'show']); // Single Property

// USER LIKES
Route::put('property/likes/{id}', [PropertyController::class, 'like']);

// GET USER PROPERTIES
Route::get('user/properties', [PropertyController::class, 'userProps']);

// CREATE Property
Route::post('properties/create', [PropertyController::class, 'store']);

// DELTE Proeperty
Route::delete('properties/{property}', [PropertyController::class, 'destroy']);

// EDIT Property
Route::put('properties/edit/{property}', [PropertyController::class, 'update']);

// GET Category 
Route::get('categories', [CategoryController::class, 'index']);

// GET Room Categories
Route::get('room_categories', [RoomCategoryController::class, 'index']);
