<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    use HasFactory;

    protected $fillable = [
        'posts_id',
        'user_id',                
        'comment',    
    ];

    public function reactions() {
        return $this->hasMany(Reactions::class);
    }

    public function posts() {
        return $this->belongsTo(Posts::class);
    }
    
    public function user() {
        return $this->belongsTo(User::class);
    }
}
