<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Requests\ReactionsRequest;
use App\Http\Resources\ReactionsResource;
use App\Http\Resources\ReactionsCollection;
use App\Models\Reactions;
use App\Models\Comments;
use App\Models\Posts;
use App\Models\User;
use App\Traits\HttpResponses;

class ReactionsController extends Controller
{
    use HttpResponses;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new ReactionsCollection(Reactions::get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ReactionsRequest $request)
    {                
        $posts_id = $request->posts_id;
        $comments_id = $request->comments_id;       
        $user_id = $request->user_id;       
        $find = null;
        $except = null;

        // EITHER ADD REACTION FOR POST 
        // OR ADD REACTION FOR COMMENT
        
        if (!empty($posts_id)) {
            
            $except = 'comments_id';
            $find = ['posts_id', $posts_id];              
        }
        else if (!empty($comments_id)) {
            
            $except = 'posts_id';            
            $find = ['comments_id', $comments_id];                         
        }
        // IF REACTION ALREADY EXIST IT WILL BE UPDATED
        if (Reactions::where([ $find , ['user_id', $user_id]])->first()) {
            $updated = Reactions::where([ $find , ['user_id', $user_id]])->update($request->except($except));
                        
            return $this->success('','updated successfully');
        }
        
        return new ReactionsResource(Reactions::create($request->except($except)));        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Reactions::find($id) ? 
            new ReactionsResource(Reactions::find($id)) : 
            $this->error('','Cannot Find '. $id, 500);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ReactionsRequest $request, $id)
    {
        $data = Reactions::find($id);
        $copy = $data;

        if ($data) {
            
            $data->update($request->all());
            return $this->success(new ReactionsResource($copy), 'successfully updated');
        }
        return $this->error('','cannot find id# '. $id, 500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $reaction = new ReactionsResource(Reactions::find($id));  
        $data = $reaction;
        
        if (!Reactions::find($id)) {
            return $this->error('', 'Cannot Find id# '. $id, 500);
        }                
        $reaction->delete();

        return $this->success($data, 'deleted sucessfully');
    }
}
