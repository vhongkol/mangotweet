<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PostsRequest;
use App\Http\Resources\PostsResource;
use App\Http\Resources\PostsCollection;
use App\Models\Posts;
use App\Models\Reactions;
use App\Models\Comments;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\DB;
 
class PostsController extends Controller
{
    use HttpResponses;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {        
        $include = $this->readParams($request);        
        $user = $request->query('user');
        
        $where = empty($user) ? [] : [['user_id', $user]];        

        return new PostsCollection(Posts::with($include)->where($where)->get());
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
    public function store(PostsRequest $request)
    {
        return new PostsResource(Posts::create($request->all()));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $include = $this->readParams($request);

        return Posts::find($id) ? 
                new PostsResource(Posts::with($include)->find($id)) : 
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
    public function update(PostsRequest $request, $id)
    {
        $data = Posts::find($id);
        $copy = $data;

        if ($data) {
            
            $data->update($request->all());
            return $this->success(new PostsResource($copy), 'successfully updated');
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
        $data = new PostsResource(Posts::find($id));        

        if (!Posts::find($id)) {
            return $this->error('','cannot find id# '. $id, 500);
        }
        
        //DELETE COMMENTS REACTION RELATED TO POST
        Reactions::
                join('comments','reactions.comments_id','=', 'comments.id')
                ->where('comments.posts_id', $id)->delete();
                
        // DELETE COMMENTS RELEATED TO POST
        Comments::where('posts_id', $id)->delete();

        // DELETE POST REACTIONS
        Reactions::where('posts_id', $id)->delete();

        // DELETE POST
        Posts::where('id', $id)->delete();

        return $this->success($data, 'Successfuly Deleted');
    }

    public function reactionList($id) {

        $data = Posts::find($id);        

        if ($data) {
            
            $res = Posts::select(DB::raw('CONCAT(first_name , " " , last_name) as name'), 'users.id', 'type')
            ->join('reactions', 'reactions.posts_id', '=', 'posts.id')
            ->join('users', 'users.id', '=', 'reactions.user_id')
            ->join('reaction_type', 'reactions.type_id', '=', 'reaction_type.id')
            ->where('posts.id', $id)->get();
            
            return $this->success($res, 'displaying list');
        }
        return $this->error('','cannot find id# '. $id, 500);                
    }

    private function readParams($request) {

        $simplify = $request->query('simplify');
        $includeComments = $request->query('includeComments');
        $includeCommentsWithReact = $request->query('includeCommentsWithReact');  
        $includeReactions = $request->query('includeReactions');        
        $include = [];                

        if (strcmp($simplify, 'true') == 0) {
           
            array_push($include, 'commentsWithReact', 'reactions');
            return $include;
        }

        if(strcmp($includeCommentsWithReact, 'true') == 0) {
            array_push($include, 'commentsWithReact');
        }
        else if (strcmp($includeComments, 'true') == 0) {
            array_push($include, 'comments');            
        }        

        if (strcmp($includeReactions, 'true') == 0) {
            array_push($include, 'reactions');
        }     

        return $include;
    }
}
