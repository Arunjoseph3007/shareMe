import Image from "next/image";
import mood from "../public/assets/mood-today.jpg";
import Link from "next/link";
import { useRef,useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const router=useRouter()
  const emailRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [err,setErr]=useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(passwordRef.current.value!==confirmPasswordRef.current.value){
      setErr('Passwords do not match!')
      return
    }

    setErr('')
    const respones = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        username: userNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data =await respones.json();
    window.localStorage.setItem("userId", data._id);
    window.localStorage.setItem("user", JSON.stringify(data));
    router.push('/')
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen items-center justify-start">
      <div className="h-2/5 lg:h-full w-full border flex relative items-center justify-center">
        <div className="absolute h-full w-full">
          <img 
            src="https://u7.uidownload.com/vector/452/512/vector-sunset-background-and-sea-vector-svg-ai.jpg" 
            alt="draw" 
            className="object-cover h-full w-full"/>
        </div>
        <h1 style={{textShadow:"0 0 20px black"}} className="text-3xl lg:text-4xl z-10 text-white font-extrabold">
          Welcome,
          <br /> to everything
          <br /> But better.
        </h1>
        <div className="absolute h-[100px] w-[500px] hidden lg:block rounded-full bg-white bottom-10 -left-12 "></div>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="p-4 border w-full m-2 max-w-[380px] shadow-md"
        >
          {err && <h1 className="text-center bg-gray-300 border border-gray-700 rounded-md w-full p-2">Error : {err}</h1>}
          <input
            ref={userNameRef}
            className="w-full p-2 my-6 border outline-none rounded-md bg-gray-100 focus:shadow-md"
            type="text"
            placeholder="Username"
          />
          <input
            ref={emailRef}
            className="w-full p-2 mb-6 border outline-none rounded-md bg-gray-100 focus:shadow-md"
            type="email"
            placeholder="Email"
          />
          <input
            ref={passwordRef}
            className="w-full p-2 mb-6 border outline-none rounded-md bg-gray-100 focus:shadow-md"
            type="password"
            placeholder="Password"
          />
          <input
            ref={confirmPasswordRef}
            className="w-full p-2 mb-6 border outline-none rounded-md bg-gray-100 focus:shadow-md"
            type="password"
            placeholder="Confirm Password"
          />
          <button
            type="submit"
            className="p-3 tracking-widest border bg-black text-white hover:bg-gray-300 hover:text-black duration-300 transition ease-in-out  bold w-full text-xl"
          >
            Sign Up
          </button>
          <button className="text-sm text-center w-full my-4">
            Already have an account?{" "}
            <Link href="/login" passHref >
              <span className="text-gray-600">Login</span>
            </Link>
          </button>
        </form>
      </div>
    </div>
  );
}
