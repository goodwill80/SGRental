<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;
    protected $fillable = [
                        'name', 
                        'description', 
                        'price', 
                        'category_id',
                        'room_category_id',
                        'user_id',
                        'thumbnail',
                        'ratings'
                    ];
    
    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function roomCategory() {
        return $this->belongsTo(RoomCategory::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
  
}
