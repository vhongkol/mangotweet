<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\ReactionType;
use App\Models\User;
use DB;

class ReactionsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {         
        $type = ReactionType::where('id', $this->type_id)->get('type');                
        $type_name = count($type) != 0 ? $type[0]->type : '';
                    
        return [

            'id' => $this->id,
            'posts_id' => $this->posts_id,
            'comments_id' => $this->comments_id,           
            'type_id' => $this->type_id,  
            'type_name' => $type_name,
            'user_id' => $this->user_id,    
            'name' => User::select(DB::raw('CONCAT(first_name , " " , last_name) as name'))->where('id', $this->user_id)->get()[0]->name,
        ];
    }
}
