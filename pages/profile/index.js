import Topbar from "../../public/Topbar";
import SideBar from "../../public/Sidebar";
import ProflieSection from "../../public/ProfileSection";
import { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState();
  
  useEffect(() => {
    const id = localStorage.getItem("userId");
    const fetchUser = async () => {
      const res = await fetch("http://localhost:8800/api/users/" + id);
      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, []);

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
