import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Dashboard() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");
    const [newComment, setNewComment] = useState("");

    const handlePost = (e) => {
        e.preventDefault();
        setPosts([...posts, { post: newPost, comments: [], likes: 0 }]);
        setNewPost("");
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

    return (
        <div>
            <label type="text" onClick={() => navigate("/Home")}>
                <h>"MANGO TWEET"</h>
            </label>
            <form onSubmit={handlePost}>
                <input
                    type="text"
                    placeholder="Write a post"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                />
                <button type="submit">Post</button>
            </form>
            {posts.map((post) => (
                <div key={post.post}>
                    <p>{post.post}</p>
                    <button onClick={() => handleLike(post)}>
                        {post.likes} Likes
                    </button>
                    <form onSubmit={(e) => handleComment(e, post)}>
                        <input
                            type="text"
                            placeholder="Write a comment"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button type="submit">Comment</button>
                    </form>
                    {post.comments.map((comment) => (
                        <p key={comment}>{comment}</p>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Dashboard;
