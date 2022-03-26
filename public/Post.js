import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Link from "next/dist/client/link";
import {format} from 'timeago.js'

const getId = () => localStorage.getItem("userId");

const Post = ({ postId, post }) => {
  const [user, setUser] = useState({});
  const [isLiked, setIsliked] = useState();

  const handleLike = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/${postId}/like`,
        {
          method: "PUT",
          body: JSON.stringify({
            userId: getId(),
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setIsliked(!isLiked);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${post.userId}`);
      const data = await res.json();
      setUser(data);
    };
    fetchUser();
    setIsliked(post.likes.includes(getId()));
  }, []);

  return (
    <div className="w-full shadow-sm border rounded-md my-3 p-3">
      <div className="flex w-full items-center pb-3 border-b">
        <img
          className="rounded-full w-[40px] h-[40px] object-cover mr-4 border-2 border-black"
          alt="profile-pic"
          src={user.profilePicture}
        />
        <h3 className="w-full text-xl bold capitalize">
          <Link href={`/profile/${post.userId}`}>
            <a>{user.username}</a>
          </Link>
          <span className="text-gray-600 ml-5 text-sm">
            {format(post.createdAt)}
          </span>
        </h3>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </div>
      <img alt="post" src={post.img} className="w-full h-full object-cover" />
      <h3 className="py-2 capitalize border-b">{post.desc}</h3>
      <div className="flex items-center pt-1">
        <FontAwesomeIcon className="mx-1 text-xl p-1" icon={faPaperPlane} />
        <FontAwesomeIcon
          onClick={handleLike}
          className={`mx-1 p-1 rounded-full text-xl cursor-pointer transition duration-200 ${
            !isLiked ? "bg-black text-white" : ""
          }`}
          icon={faHeart}
        />
        <p className="w-full text-md mx-4">
          {isLiked
            ? "You and " + (post.likes.length - 1) + " "
            : "" + post.likes.length + " "}
          people like this
        </p>
      </div>
    </div>
  );
};

export default Post;
