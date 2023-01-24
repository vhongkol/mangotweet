<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\CommentsRequest;
use App\Http\Resources\CommentsResource;
use App\Http\Resources\CommentsCollection;
use App\Traits\HttpResponses;
use App\Models\Comments;
use App\Models\Reactions;
use App\Models\Posts;
use DB;

class CommentsController extends Controller
{
    use HttpResponses;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new CommentsCollection(Comments::get());
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
    public function store(CommentsRequest $request)
    {       
        return new CommentsResource(Comments::create($request->all()));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {        
        return Comments::find($id) ? 
            new CommentsResource(Comments::find($id)) : 
            $this->error('','cannot find id# '. $id, 500);
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
    public function update(CommentsRequest $request, $id)
    {
        $data = Comments::find($id);
        $copy = $data;

        if ($data) {
            
            $data->update($request->all());
            return $this->success(new CommentsResource($copy), 'successfully updated');
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
        $comment = new CommentsResource(Comments::find($id));  
        $data = $comment;
        
        if (!Comments::find($id)) {
            return $this->error('', 'cannot find id# '. $id, 500);
        }                
        $comment->delete();
        Reactions::where('comments_id', $id)->delete();

        return $this->success($data, 'deleted sucessfully');
    }

    public function reactionList($id) {

        $data = Comments::find($id);        

        if ($data) {
            
            $res = Comments::select(DB::raw('CONCAT(first_name , " " , last_name) as name'), 'users.id', 'type')
            ->join('reactions', 'reactions.comments_id', '=', 'comments.id')
            ->join('users', 'users.id', '=', 'reactions.user_id')
            ->join('reaction_type', 'reactions.type_id', '=', 'reaction_type.id')
            ->where('comments.id', $id)->get();
            
            return $this->success($res, 'displaying list');
        }
        return $this->error('','cannot find id# '. $id, 500);                
    }
}
