import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Scene1 from "./components/Scene1";
import Scene2 from "./components/Scene2";
import Loader from "./components/Loader";

gsap.registerPlugin(useGSAP);

const mp3 = require('../src/assets/audio/audio_1.mp3')

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
      "https://picsum.photos/400/500",
      "https://picsum.photos/390/480",
      "https://picsum.photos/399/499",
      "https://picsum.photos/400/498",
      "https://picsum.photos/398/500",
    ],
  });

  // const tl = useRef();

  // const toggleTimeline = () => {
  //   tl.current.reversed(!tl.current.reversed());
  // };

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
    // aud.current.play()
  };

  useGSAP(
    () => {
      const master = gsap.timeline({ paused: true });
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
