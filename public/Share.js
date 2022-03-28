import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faLocation,
  faSmile,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";

const Share = () => {
  const [img, setImg] = useState();
  const desc = useRef();

  const handleUpload = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", img);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
      const imgResponse = await fetch( process.env.NEXT_PUBLIC_CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        });
      const imgData = await imgResponse.json();
      const imageURL = imgData.url;

      const respones = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/`, {
        method: "POST",
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          desc: desc.current.value,
          img: imageURL,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await respones.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full p-4 shadow-md rounded-md">
      <div className="flex w-full items-center border-b">
        <img
          width="30"
          height="30"
          className="rounded-full mr-4 border-2 border-black"
          alt="profile-pic"
          src={"https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI="}
        />
        <input
          ref={desc}
          type="text"
          placeholder="What's In your Mind . . ."
          className="outline-none w-full p-2 rounded-md"
        />
      </div>
      {img && (
        <img
          className="w-full h-[450px] object-cover my-6"
          src={URL.createObjectURL(img)}
        />
      )}
      <div className="flex justify-between mt-3">
        <div className="p-3 text-xl cursor-pointer">
          <label htmlFor="file" className="cursor-pointer">
            <FontAwesomeIcon icon={faImage} className="mr-4" />
            <span className="hidden md:inline">Photo</span>
          </label>
          <input
            onChange={(e) => setImg(e.target.files[0])}
            id="file"
            style={{ display: "none" }}
            type="file"
          />
        </div>
        <div className="p-3 text-xl ">
          <FontAwesomeIcon icon={faTag} className="mr-4" />
          <span className="hidden md:inline">Tag</span>
        </div>
        <div className="p-3 text-xl ">
          <FontAwesomeIcon icon={faLocation} className="mr-4" />
          <span className="hidden md:inline">Location</span>
        </div>
        <div className="p-3 text-xl ">
          <FontAwesomeIcon icon={faSmile} className="mr-4" />
          <span className="hidden md:inline">Feeling</span>
        </div>
        <button
          onClick={(e) => handleUpload(e)}
          className="px-8 py-1 rounded-full tracking-wide border bg-black text-white hover:bg-gray-300 hover:text-black duration-300 transition ease-in-out  bold sm:text-xl text-xs"
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default Share;
