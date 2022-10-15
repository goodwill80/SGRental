<?php

namespace Database\Seeders;

use App\Models\RoomCategory;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoomCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        RoomCategory::create(['name' => 'studio']);
        RoomCategory::create(['name' => '1 bedroom']);
        RoomCategory::create(['name' => '2 bedrooms']);
        RoomCategory::create(['name' => '3 bedrooms']);
        RoomCategory::create(['name' => '4 bedrooms']);
        RoomCategory::create(['name' => '5 bedrooms and more']);
    }
}
