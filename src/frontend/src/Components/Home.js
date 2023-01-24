import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");
    const [newComment, setNewComment] = useState("");
    const [newImage, setNewImage] = useState(null);
   


    const handlePost = (e) => {
        e.preventDefault();
        setPosts([
            ...posts,
            { post: newPost, comments: [], likes: 0, image: newImage },
        ]);
        setNewPost("");
        setNewImage(null);
    };

    const handleComment = (e, post) => {
        e.preventDefault();
        setPosts(
            posts.map((p) => {
                if (p === post) {
                    p.comments = [...p.comments, newComment];
                }
                return p;
            })
        );
        setNewComment("");
    };

    const handleLike = (post) => {
        setPosts(
            posts.map((p) => {
                if (p === post) {
                    p.likes++;
                }
                return p;
            })
        );
    };

    const handleImageChange = (e) => {
        setNewImage(URL.createObjectURL(e.target.files[0]));
    };
    const handleLogout = () => {
        // Clear the user's data from localStorage or other storage you used
        localStorage.removeItem("username");
        // redirect the user to the login page
        navigate("/sign-in");
    }
    
    return (
        <div>
            <label type="text" onClick={() => navigate("/Home")}>
                <h2 class="fs-1"> MANGO TWEET</h2>
            </label>
            <div style={{float: "right"}}>
            <button className="btn btn-danger" onClick={handleLogout}>Log Out</button>
    </div>

            <form onSubmit={handlePost}>
   
    <input 
        class="post.placeholder"
        type="text"
        placeholder="Write a Mango Tweet"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
    />
    <input type="file" onChange={handleImageChange}/>
    <button type="submit" class="btn btn-primary">Post</button>
</form>
            {posts.map((post) => (
                <div key={post.post}>
                    <p>{post.post}</p>
                    <img src={post.image} alt="Post Image" style={{width: "100%", height: "auto"}}/>
                    <button onClick={() => handleLike(post)} class="btn btn-primary">
                                 {post.likes} Likes
                   </button>

                    <form onSubmit={(e) => handleComment(e, post)}>
                        <input
                            type="text"
                            placeholder="Write a comment"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                       <button type="submit" class="btn btn-primary">Comment</button>

                    </form>
                    {post.comments.map((comment) => (
                        <p key={comment}>{comment}</p>
                    ))}
                </div>
                
            ))}
</div>
    );
}

export default Home