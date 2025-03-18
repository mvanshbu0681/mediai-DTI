'use client';
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Change to your backend URL

const VideoCall = () => {
  const [myPhoneNumber, setMyPhoneNumber] = useState("");
  const [callTo, setCallTo] = useState("");
  const [inCall, setInCall] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(
    new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    })
  );

  useEffect(() => {
    socket.on("incomingCall", async ({ from, offer }) => {
      console.log("Incoming call from:", from);
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socket.emit("answerCall", { to: from, answer });

      peerConnection.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };
    });

    socket.on("callAnswered", async (answer) => {
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
      setInCall(true);
    });

    socket.on("candidate", async (candidate) => {
      await peerConnection.current.addIceCandidate(
        new RTCIceCandidate(candidate)
      );
    });

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("candidate", { to: callTo, candidate: event.candidate });
      }
    };

    peerConnection.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };
  }, [callTo]);

  const registerUser = () => {
    socket.emit("register", myPhoneNumber);
  };

  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
    stream
      .getTracks()
      .forEach((track) => peerConnection.current.addTrack(track, stream));

    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    socket.emit("startCall", { from: myPhoneNumber, to: callTo, offer });
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-2">Video Call</h2>
      <input
        type="text"
        placeholder="Your Phone Number"
        value={myPhoneNumber}
        onChange={(e) => setMyPhoneNumber(e.target.value)}
        className="border p-2 mb-2"
      />
      <button
        onClick={registerUser}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Register
      </button>
      <input
        type="text"
        placeholder="Call to (Phone Number)"
        value={callTo}
        onChange={(e) => setCallTo(e.target.value)}
        className="border p-2 mb-2"
      />
      <button
        onClick={startCall}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Start Call
      </button>

      <div className="flex mt-4">
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          className="w-1/2 border"
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-1/2 border"
        />
      </div>
    </div>
  );
};

export default VideoCall;
