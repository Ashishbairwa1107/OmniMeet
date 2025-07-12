"use client";

import useUser from "./hooks/useUser";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { v4 as uuidv4 } from "uuid"; 

export default function Home() {
  const { fullName, setFullName } = useUser();
  const [roomID, setRoomID] = useState("");
  const router = useRouter();

  

  const handleJoinRoom = () => {
    if (roomID) {
      router.push(`/room/${roomID}`);
    }
  };

  const handleCreateNewMeeting = () => {
    
    router.push(`/room/${uuidv4()}`);
  };

  return (
    <div className="w-full h-screen">
      <section className="bg-gray-950 text-white w-full h-full flex flex-col items-center justify-center">
        {/* Main Content Area */}
        <div className="mx-auto max-w-screen-xl py-32 flex flex-col gap-24 h-screen items-center justify-center">
          {/* Logo */}
          {/* Ensure the path to your logo is correct */}
          {/* <Image src="/logo.svg" alt="logo" width={200} height={200} /> */}

          {/* Heading */}
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-4xl font-extrabold text-transparent bg-clip-text">
              Have a smooth meeting
            </h1>
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-blue-600 text-4xl font-extrabold text-transparent bg-clip-text">
              with team members
            </h1>
          </div>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-xl text-center text-gray-300">
            OmniMeet is your gateway to real-time learning experiences.OmniMeet makes learning interactive, collaborative, and accessible from anywhere. Built under the Skillion platform,  all in one seamless video calling solution
          </p>

          {/* Input for "Enter your name" */}
          <div className="flex flex-col items-center justify-center gap-4 w-full max-w-md px-4">
            <input
              id="name"
              type="text"
              className="w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFullName(e.target.value)} 
              placeholder="Enter your name"
              value={fullName}
            />
          </div>

         
          {fullName && fullName.length >= 3 && (
            <>
              <div className="flex items-center justify-center gap-4 w-full max-w-md mx-auto px-4">
                <input
                  type="text"
                  id="roomID"
                  className="flex-grow p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setRoomID(e.target.value)} // Corrected: e.target.value directly
                  placeholder="Enter room ID to join a meeting"
                  value={roomID} // Added value prop for controlled input
                />
                <button
                  onClick={handleJoinRoom} // Using the new handler function
                  disabled={!roomID}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 disabled:opacity-50"
                >
                  Join
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center">
                <button
                  className="text-lg font-medium hover:text-blue-400 hover:underline"
                  onClick={handleCreateNewMeeting} // Using the new handler function
                >
                  Or create new meeting
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}