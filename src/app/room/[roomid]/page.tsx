'use client';

import useUser from '../../hooks/useUser';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import React, { useRef, use, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

const Room = ({ params }: { params: Promise<{ roomid: string }> }) => {
  const { roomid } = use(params);
  const { fullName } = useUser(); // ✅ Yeh line fix ki gayi hai
  const roomID = roomid;

  const myMeeting = useRef<HTMLDivElement>(null);
  const hasJoinedRef = useRef(false); // ✅ ADD THIS LINE

  useEffect(() => {
    const meeting = async () => {
      if (!myMeeting.current || hasJoinedRef.current) return; // ✅ ADD GUARD CONDITION
      hasJoinedRef.current = true; // ✅ PREVENT DUPLICATE joinRoom

      console.log('ZEGO APP ID:', process.env.NEXT_PUBLIC_ZEGO_APP_ID);
      console.log('ZEGO SECRET:', process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET);

      const safeFullName: string = fullName ?? '';
      const displayName: string =
        safeFullName !== '' ? safeFullName : 'user' + Date.now();

      const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID!);
      const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET!;
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        uuid(),
        displayName,
        720
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: myMeeting.current!,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
              window.location.protocol +
              '//' +
              window.location.host +
              window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
        maxUsers: 10,
      });
    };

    meeting();
  }, []); // 👈 run once

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
};

export default Room;

