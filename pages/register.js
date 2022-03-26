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
    <div className="flex w-full h-screen items-center justify-around">
      <div className="h-full w-1/2 border flex relative items-center justify-center">
        <h1 className="text-4xl font-extrabold">
          Welcome,
          <br /> to everything
          <br /> But better
        </h1>
        <div className="absolute h-[100px] w-[500px] rounded-full bg-black bottom-10 -left-10 "></div>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="p-4 border w-3/5 shadow-md"
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
            <Link href="/login">
              <span className="text-gray-600">Login</span>
            </Link>
          </button>
        </form>
      </div>
    </div>
  );
}
