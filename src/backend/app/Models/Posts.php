<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'description',
        'image_name',
        'original_post_id',        
    ];

    public function comments() {       
        return $this->hasMany(Comments::class);
    }  

    public function commentsWithReact() {
        return $this->hasMany(Comments::class);
    }  
    
    public function reactions() {
        return $this->hasMany(Reactions::class);
    }   

    public function user() {
        return $this->belongsTo(User::class);
    }
}