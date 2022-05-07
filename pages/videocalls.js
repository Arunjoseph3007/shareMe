import Head from "next/head";
import Topbar from "../public/Topbar";
import SideBar from "../public/Sidebar";
import VideoSection from "../public/VideoSection";
import { HMSRoomProvider } from "@100mslive/react-sdk";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Share Me</title>
        <meta name="description" content="An Anti-social media" />
      </Head>
      <Topbar />
      <div className="w-full flex overflow-hidden">
        <SideBar />
        <HMSRoomProvider>
          <VideoSection />
        </HMSRoomProvider>
      </div>
    </div>
  );
}
