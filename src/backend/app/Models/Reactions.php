<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reactions extends Model
{
    use HasFactory;

    protected $fillable = [
        'posts_id',
        'comments_id',
        'type_id',
        'user_id',        
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
    
    public function posts() {
        return $this->belongsTo(Posts::class);
    }

    public function comments() {
        return $this->belongsTo(Comments::class);
    }

    public function reactionType() {
        return $this->belongsTo(ReactionType::class);
    }
}
