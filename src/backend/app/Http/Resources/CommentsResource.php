<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ReactionsResource;
use App\Http\Resources\ReactionsMinResource;
use App\Models\Reactions;
use App\Models\User;
use DB;

class CommentsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {        
        return [

            'id' => $this->id,
            'posts_id' => $this->posts_id,
            'user_id' => $this->user_id,
            'name' => User::select(DB::raw('CONCAT(first_name , " " , last_name) as name'))->where('id', $this->user_id)->get()[0]->name,
            'comment' => $this->comment,                            
            'comment_reactions' => $this->whenLoaded('reactions', function() {

                return [
                    'overall_total' => Reactions::where('comments_id', $this->id)->count(),

                    'group' => Reactions::select(DB::raw('count(*) as total'), 'type')
                        ->join('reaction_type', 'reactions.type_id', '=', 'reaction_type.id')
                        ->where('reactions.comments_id', $this->id)
                        ->groupBy('type')->get()
                ];
            }),          
        ];
    }
}
