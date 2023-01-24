<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReactionType extends Model
{
    use HasFactory;

    public $table = 'reaction_type';

    protected $fillable = [
        'type',          
    ];

    public function reactions() {
        return $this->hasMany(Reactions::class);
    }
}
