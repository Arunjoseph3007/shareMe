import Topbar from "../../public/Topbar";
import SideBar from "../../public/Sidebar";
import ProflieSection from "../../public/ProfileSection";
import { useRouter } from 'next/router'
import { useState, useEffect} from 'react'

const Profile = () => {
	const router = useRouter()
	const { id } = router.query
	const [user,setUser] = useState()


	useEffect(()=>{
    const fetchUser=async()=>{
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/'${id}`)
      const data = await res.json()
      setUser(data)
    }
    fetchUser()
  },[])

	return (
		<div>
			<Topbar />
			<div className="w-full flex overflow-overlay">
				<SideBar />
				{user && <ProflieSection user={user} />}
			</div>
		</div>
		);
};

export default Profile;
