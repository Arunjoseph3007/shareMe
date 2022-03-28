import Head from "next/head";
import Topbar from "../public/Topbar";
import SideBar from "../public/Sidebar";
import MessageSection from "../public/MessageSection";
import ChatSelector from "../public/ChatSelector";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/dist/client/router";
import {io} from 'socket.io-client'

export default function Messages() {
  const [conversations,setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState()
  const [userId, setUserId] = useState(null);
  const socket = useRef()
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(true)

  useEffect(()=>{
    setIsOpen(window.innerWidth>760)
    socket.current = io.connect(process.env.NEXT_PUBLIC_SOCKETIO_URL)
  },[])

  useEffect(()=>{
    socket.current.emit("addUser",localStorage.getItem('userId'))
    socket.current.on("getUsers",users=>{
      // console.log("users",users)
    })
  },[socket])

  //To see if user is directed to a particula conv
  useEffect(()=>{
    const {q} = router.query;
    if(!q) return;
    if(q===localStorage.getItem('userId')) return;

    const directedConversation = conversations.find((conv)=>conv.members?.includes(q))

    if(!directedConversation) return;

    setSelectedConversation(directedConversation)      
    
  },[router.query,conversations])

  useEffect(()=>{
    const newUserId = window.localStorage.getItem("userId");
    if (newUserId) {
      setUserId(newUserId);
    } else {
      router.push("/login");
    }
    
    const getConversations = async ()=>{
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/conversations/${localStorage.getItem('userId')}`)
      const data = await response.json()
      setConversations(data)
      if(data!==[]){
        setSelectedConversation(data[0])
      }
    }

    getConversations()
  },[])

  return (
    <div>
      <Head>
        <title>Share Me</title>
        <meta name="description" content="An Anti-social media" />
      </Head>
      <Topbar />
      <div className="w-full flex overflow-hidden">
        <SideBar />
        <MessageSection
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          socket={socket} 
          selectedConversation={selectedConversation} />
        <ChatSelector 
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          conversations={conversations} 
          selectedConversation={selectedConversation} 
          setSelectedConversation={setSelectedConversation} />
      </div>
    </div>
  );
}
