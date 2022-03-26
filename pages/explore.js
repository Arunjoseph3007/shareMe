import Head from "next/head";
import Topbar from "../public/Topbar";
import SideBar from "../public/Sidebar";
import FriendsList from "../public/FriendsList"
import RightBar from '../public/RightBar'
import { useEffect ,useState} from "react";
import { useRouter } from "next/dist/client/router";

//some random comments and some random more

export default function Explore() {
  const router = useRouter()
  const [userId,setUserId]=useState()

  useEffect(()=>{
    const newUserId = window.localStorage.getItem('userId')
    if(newUserId){
      setUserId(newUserId)
    }else{
      router.push('/login')
    }
  },[router]);

  return (
    <div>
      <Head>
        <title>Share Me</title>
        <meta name="description" content="An Anti-social media" />
      </Head>
      <Topbar/>
      <div className="w-full flex overflow-hidden" >
        <SideBar/>
        <FriendsList feed userId={userId} />
        <RightBar/>
      </div>
    </div>
  );
}
