<?php

namespace App\Models;

use Conner\Likeable\Likeable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Property extends Model
{
    use HasFactory;
    use Likeable;
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
