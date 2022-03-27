import Head from "next/head";
import Topbar from "../public/Topbar";
import SideBar from "../public/Sidebar";
import FriendCard from "../public/FriendCard"
import RightBar from '../public/RightBar'
import { useEffect ,useState} from "react";
import { useRouter } from "next/dist/client/router";

//some random comments and some random more

export default function Search() {
  const router = useRouter()
  const [userId,setUserId]=useState()
  const [results, setResults] = useState([])

  useEffect(()=>{
    const newUserId = window.localStorage.getItem('userId')
    if(newUserId){
      setUserId(newUserId)
    }else{
      router.push('/login')
    }
  },[])

  useEffect(()=>{
    const {name} = router.query;

    if(!name) return;

    const getResults = async ()=>{
      try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/search?q=${name}`)
        const data = await response.json();
        setResults(data)
      }catch(error){
        console.error(error)
      }
    }
    getResults()
  },[router.query])

  return (
    <div>
      <Head>
        <title>Share Me</title>
        <meta name="description" content="An Anti-social media" />
      </Head>
      <Topbar/>
      <div className="w-full flex overflow-hidden" >
        <SideBar/>
        <div className="w-full p-3">
          {results.map((res)=><FriendCard key={res._id} friendId={res._id} friend={res} />)}
        </div>
        <RightBar/>
      </div>
    </div>
  );
}
