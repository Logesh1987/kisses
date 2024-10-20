import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const table = require("../assets/images/img_table.png");

export default function Scene1({ data, timeline, index }) {
  const scene2 = useRef();
  const cover = useRef();
  const lid = useRef();
  const letter = useRef();
  const desk2 = useRef();
  const [show, setShow] = useState(0);

  const showScene = () => setShow(1);

  const flow = () => {
    const d2 = gsap.utils.toArray(".drops2 span");
    return gsap
      .timeline()
      .to(d2[0], { duration: 4, x: "400%", y: '-1670%', rotate: 80 })
      .to(d2[6], { duration: 3.5, x: "-100%", y: '-1670%', rotate: 180 }, "<+0.2")
      .to(d2[1], { duration: 4, x: "500%", y: '-1670%', rotate: 100 }, "<+0.2")
      .to(d2[2], { duration: 3.5, x: "300%", y: '-1670%', rotate: 120 }, "<+0.2")
      .to(d2[3], { duration: 3.5, x: "-100%", y: '-1670%', rotate: 50 }, "<+0.2")
      .to(d2[5], { duration: 4, x: "-300%", y: '-1670%', rotate: 70 }, "<+0.2")
      .to(d2[4], { duration: 4.5, x: "100%", y: '-1670%', rotate: 150 }, "<+0.2")
      .to(d2[7], { duration: 3, x: "-500%", y: '-1670%', rotate: 180 }, "<+0.1")
      .to(d2[8], { duration: 3.2, x: "-400%", y: '-1670%', rotate: 180 }, "<+0.1")
      .to(d2[9], { duration: 3.3, x: "-100%", y: '-1670%', rotate: 360 }, "<+0.1")
      .to(d2[10], { duration: 3, x: "-200%", y: '-1670%', rotate: 60 }, "<+0.1");
  };

  const scenePlay = () => {
    const d3 = gsap.utils.toArray(".drops3 span");
    const k = gsap.utils.toArray(".nudeKiss span");
    const s = gsap.utils.toArray(".str2 li");
    return gsap
      .timeline({ onStart: showScene })
      .set(d3, { y: "-110%" })
      .set(cover.current, { y: 100 })
      .set(desk2.current, { y: "110%" })
      .set(s, { y: "-120%" })
      .to(cover.current, { duration: 0.8, y: "-160%" })
      .to(lid.current, { duration: 0.8, rotateX: 180 }, "op")
      .set(lid.current, { zIndex: 0 })
      .add(flow())
      .to(cover.current, { duration: 4, y: '39%' }, "op+=0.8")
      .to(letter.current, { duration: 3, y: "-310%", scale: 1.7 }, "<+=1")
      .to(desk2.current, { duration: 0.5, y: 0 }, "<+2.2")
      .addLabel("drops", "<")
      .to(k[0], { duration: 0.5, x: 0 }, "<+0.2")
      .to(k[1], { duration: 0.5, x: 0 }, "<+0.1")
      .to(s[0], { duration: 1, y: 0, ease: "elastic.out(1,0.5)" }, "<+0.1")
      .to(s[1], { duration: 1, y: 0, ease: "elastic.out(1,0.5)" }, "<+0.1")
      .to(d3[0], { duration: 3, y: "84%", rotate: 65 }, "drops")
      .to(d3[1], { duration: 2, y: "90%", rotate: -45 }, "<+1.2")
      .to(d3[2], { duration: 2, y: "20%", rotate: 85 }, "<+0.2");
  };
  useGSAP(() => {
    timeline && timeline.add(scenePlay());
  }, [timeline, index]);
  return (
    <div className="scene2" ref={scene2} style={{ opacity: show }}>
      <div className="cover" ref={cover}>
        <div className="lid" ref={lid}>
          <em className="front"></em>
          <em className="back"></em>
        </div>
        <div className="top">
          <div className="drops2">
            <span className="kisses-3"></span>
            <span className="kisses-3"></span>
            <span className="kisses-3"></span>
            <span className="kisses-2"></span>
            <span className="kisses-1"></span>
            <span className="kisses-2"></span>
            <span className="kisses-1"></span>
            <span className="kisses-2"></span>
            <span className="kisses-3"></span>
            <span className="kisses-1"></span>
          </div>
          <div className="letter" ref={letter}>
            <div>
              <p>
                Dear <strong>{data.receiver},</strong>
              </p>
              <p>{data.message}</p>
              <p>
                Love <strong>{data.sender}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
      <img className="table" ref={desk2} src={table} />
      <div className="nudeKiss">
        <span className="kisses-4"></span>
        <span className="kisses-5"></span>
      </div>
      <ul className="strings str2">
        <li>
          <span className="kisses-1"></span>
        </li>
        <li>
          <span className="kisses-1"></span>
        </li>
      </ul>
      <div className="drops3">
        <span className="kisses-1"></span>
        <span className="kisses-2"></span>
        <span className="kisses-2"></span>
      </div>
    </div>
  );
}
