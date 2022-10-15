<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::create(['name' => 'conservation']);
        Category::create(['name' => 'public']);
        Category::create(['name' => 'condo']);
        Category::create(['name' => 'landed']);
    }
}
