import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Scene1 from "./components/Scene1";
import Scene2 from "./components/Scene2";
import Loader from "./components/Loader";

gsap.registerPlugin(useGSAP);

const mp3 = require('../src/assets/audio/audio.mp3')

export default function Boxes() {
  const container = useRef();
  const aud = useRef();

  const [tl, setTl] = useState();
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(0);
  const [data, setData] = useState({
    receiver: "Logesh",
    sender: "Test Name",
    message:
      "Having you in my life is like a constant supply of Hershey's kisses — sweet and comforting.",
    photos: [
      "https://media.istockphoto.com/id/1294339577/photo/young-beautiful-woman.jpg?s=2048x2048&w=is&k=20&c=uNhM1pcoZ8d_CUWpz9EZNyp_lztV-p_NOp9nFrpgSI4=",
      "https://media.istockphoto.com/id/130406720/photo/woman-standing-on-city-street-at-night.jpg?s=2048x2048&w=is&k=20&c=JAJ7eDqOytjihxFB8pLGW0VTKZGl4BYQlkpRDokT1w4=",
      "https://media.istockphoto.com/id/1179747953/photo/our-style-is-influenced-by-our-upbringing.jpg?s=2048x2048&w=is&k=20&c=oHFxSyb5bqJQM6HwFiTFM6hUuyLrE7JNI43dkYo8HWo=",
      "https://media.istockphoto.com/id/499366700/photo/party-time.jpg?s=2048x2048&w=is&k=20&c=RRQ-TzhYBdQAcHNvhqK87LYHkcIYs-5AMo61gXN7bgw=",
      "https://media.istockphoto.com/id/1063282288/photo/female-friends-making-a-selfie-at-party.jpg?s=2048x2048&w=is&k=20&c=yCmtuJE_YZqPr3btL8nYjXr-LKRtAi2GQc8lYLowkzU=",
    ],
  });

  const handleLoad = (arr) => {
    let i = 0,
      loading = arr.length;
    while (i < arr.length) {
      const img = new Image();
      img.src = arr[i++];
      img.onload = () => {
        --loading == 0 && setLoading(false);
      };
    }
  };

  useEffect(() => {
    handleLoad(data.photos);
  }, []);

  const playVideo = (e) => {
    e.preventDefault();
    setPaused(1);
    tl.play()
    aud.current.play()
  };

  useGSAP(
    () => {
      const master = gsap.timeline({ paused: true });
      window.tl = master
      setTl(master);
    },
    { scope: container }
  );

  return (
    <main>
      <section className="container" ref={container}>
        {loading ? (
          <Loader />
        ) : (
          <>
            {!Boolean(paused) && (
              <div className="playControl">
                <a href="#" onClick={playVideo}></a>
              </div>
            )}
            <div style={{ opacity: paused }}>
              <audio ref={aud} src={mp3} />
              <Scene1 photos={data.photos} timeline={tl} index={0} />
              <Scene2 data={data} timeline={tl} index={1} />
            </div>
          </>
        )}
      </section>
    </main>
  );
}
