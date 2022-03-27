import Image from 'next/image'
import Post from "./Post";
import Share from "./Share";
import { useEffect, useState, useRef } from "react";
import {format }  from 'timeago.js'

const MessageSection = ({selectedConversation,socket}) => {
	const [messages, setMessages] = useState([])
	const [reciever, setReceiver] = useState()
	const [currentUser, setCurrentUser] = useState({_id:null})
	const [newMessage, setNewMessage] = useState('')
	const [arrivalMessage, setArrivalMessage] = useState()
	const scrollRef = useRef()

	const handleSubmit = async (e)=>{
		e.preventDefault()
		if(!newMessage) return
		
		//update on socket
		socket.current.emit('sendMessage',({
			userId:currentUser._id,
			recieverId:reciever._id,
			text:newMessage
		}))

		//Create message
		const queryMessage = {
			sender:localStorage.getItem('userId'),
			text:newMessage,
			conversationId:selectedConversation._id
		}

		//update on db
		try{
			const respones = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/messages/`, {
		        method: "POST",
		        body: JSON.stringify(queryMessage),
		        headers: {
		          "Content-type": "application/json",
		        },
		    });
	      const data = await respones.json();
	      setMessages([...messages,data])
	      setNewMessage('')
		}catch(error){
			console.error(error)
		}
	}

	//for scroll to view
	useEffect(()=>{
		scrollRef.current?.scrollIntoView({block: 'end', behavior: "smooth"})
	},[messages])

	//update messages for arrived messages
	useEffect(()=>{
		if(!arrivalMessage) return;
		if(arrivalMessage.senderId !== reciever._id) return;

		setMessages([...messages,arrivalMessage])
	},[arrivalMessage])

	//Fetch Data
	useEffect(()=>{
		const getDetails = async ()=>{
			//Current User
			const user = JSON.parse(localStorage.getItem('user'))
			setCurrentUser(user)

			//samne wala user
	      	const recieverId = selectedConversation.members
	    	    .filter(member => member!==user._id)[0]
	      	try{
	        	const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${recieverId}`)
	        	const data = await response.json()
	        	setReceiver(data)
	      	}catch(error){
	        	console.error(error)
	      	}

	      	//Messages
			try{
		      	const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/messages/${selectedConversation._id}`)
				const data = await response.json()
				setMessages(data)
			}catch(error){
				console.error(error)
			}
   		}
   		if(selectedConversation){
   			getDetails()
   		}
	},[selectedConversation])

	//socket getMessage
	useEffect(()=>{
		socket.current?.on('getMessage', data=>{
			setArrivalMessage({
				senderId:data.userId,
				text:data.text,
				createdAt: Date.now()
			})
		})
	},[socket.current])

	return (
		<div className="w-full border-r py-[65px] relative h-[88vh]">
			{reciever && 
			<>
				<div className="px-2 h-[65px] bg-gray-300 flex z-[999] items-center space-x-2 inset-x-0 top-0 absolute">
					<Image className="rounded-full" src={reciever.profilePicture} width={40} height={40} />
					<h1 className="font-bold text-xl">{reciever.username}</h1>
				</div>
				<div className="h-full overflow-y-scroll flex flex-col">
					{!messages.length && (
						<div className="self-center my-5 py-5">
							<h1 className="text-gray-400 text-3xl text-center">Start Your conversation<br/>Say Hi!</h1>
						</div>
					)}
					{messages.map((msg,i)=>{
						const own = msg.sender===currentUser._id
						return (
							<div 
								ref={scrollRef} 
								key={msg._id || msg.createdAt} 
								className={`m-2 max-w-[70%] flex flex-col justify-center ${own ? "self-end":"self-start"}`} >
								<div className="flex space-x-2 items-center" >
									<div className="min-w-[45px]">
										<Image
											className="rounded-full min-w-[45px] object-cover " 
											src={own ? currentUser.profilePicture:reciever.profilePicture} 
											width={45} 
											height={45} />
									</div>
									<h1 className={`rounded-3xl p-3 px-5 ${own ? "bg-black text-white":"bg-gray-100"}`}>{msg.text}</h1>
								</div>
								<p className={`mt-1 text-sm text-gray-400 ${own ? "self-end":"self-start"}`}>{format(msg.createdAt)}</p>
							</div>
						)
					})}
				</div>
				<form onSubmit={handleSubmit} className="bg-gray-200  flex space-x-2 absolute h-[65px] p-3 inset-x-0 bottom-0" >
					<input value={newMessage} onChange={e=>setNewMessage(e.target.value)} className="w-full rounded-full px-3" type="text" placeholder="hey"/>
					<button
						type="submit"
			          	className="px-8 py-1 rounded-full tracking-wide border bg-black text-white hover:bg-gray-300 hover:text-black duration-300 transition ease-in-out  bold text-xl"
	        		>
			          Send
			        </button>
				</form>
			</>}
		</div>
	);
};

//6226209f06d7e22ff41d9107

export default MessageSection;