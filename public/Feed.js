import Post from "./Post";
import Share from "./Share";
import { useEffect, useState } from "react";

const Feed = ({ feed = false, userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/timeline/${userId}`
      );
      const data = await res.json();
      if(feed){
        if (res.status === 200) setPosts(data);
      }else{
        if (res.status === 200) setPosts(data.filter(elm=>elm.userId===userId));
      }
    };
    fetchPosts();
  }, [userId]);

  return (
    <div className="w-full p-3">
      {feed && <Share />}
      {posts &&
        posts.map((elm) => <Post key={elm._id} postId={elm._id} post={elm} />)}
    </div>
  );
};

//6226209f06d7e22ff41d9107

export default Feed;
