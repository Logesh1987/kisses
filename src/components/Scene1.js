import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const table = require("../assets/images/img_table.png");

export default function Scene1({ photos, timeline, index }) {
  const scene = useRef();
  const desk = useRef();
  const drops1 = useRef();
  const [show, setShow] = useState(true);

  const swinger = (e) => {
    const ele = e.querySelector("figure");
    return gsap
      .timeline()
      .to(ele, { duration: 1, rotateY: -10 })
      .to(ele, { duration: 2, rotateY: 10 })
      .to(ele, { duration: 1, rotateY: 0 })
      .repeat(10);
  };

  const propPhotos = () => {
    const strings = gsap.utils.toArray(".str1 li");
    return gsap
      .timeline({ defaults: { ease: "elastic.out(1,0.5)" } })
      .set(strings, { y: "-120%" })
      .to(
        strings[2],
        {
          duration: 2.5,
          y: 0,
          onComplete: swinger,
          onCompleteParams: [strings[2]],
        },
        "<"
      )
      .to(
        strings[6],
        {
          duration: 2.5,
          y: 0,
          onComplete: swinger,
          onCompleteParams: [strings[6]],
        },
        "<"
      )
      .to(
        strings[3],
        {
          duration: 2.5,
          y: 0,
          onComplete: swinger,
          onCompleteParams: [strings[3]],
        },
        "<+0.1"
      )
      .to(
        strings[4],
        {
          duration: 3.5,
          y: 0,
          onComplete: swinger,
          onCompleteParams: [strings[4]],
        },
        "<+0.1"
      )
      .to(
        strings[5],
        {
          duration: 2.5,
          y: 0,
          onComplete: swinger,
          onCompleteParams: [strings[5]],
        },
        "<+0.1"
      )
      .to(strings[1], { duration: 2.5, y: 0 }, "<+0.1")
      .to(strings[0], { duration: 2.5, y: 0 }, "<");
  };
  const propDrops = () => {
    const drops = gsap.utils.toArray(".drops1 span");
    return gsap
      .timeline()
      .set(drops, { y: "-100%" })
      .to(drops[0], { duration: 7, y: 1000, rotate: 270 }, "<")
      .to(drops[1], { duration: 10, y: 1000, rotate: -180 }, "<+1")
      .to(drops[2], { duration: 12, y: 1000, rotate: 180 }, "<+0.5")
      .to(drops[3], { duration: 11, y: 1000, rotate: 240 }, "<+0.5")
      .to(drops[4], { duration: 12, y: 1000, rotate: -270 }, "<+0.5")
      .to(drops[5], { duration: 8, y: 1000, rotate: -270 }, "<+2")
      .to(drops[6], { duration: 15, y: 1000, rotate: -180 }, "<+1")
      .to(drops[7], { duration: 14, y: 1000, rotate: -90 }, "<+1.5")
      .to(drops[8], { duration: 13, y: 1000, rotate: 90 }, "<+2")
      .to(drops[9], { duration: 10, y: 1000, rotate: -90 }, "<+3")
      .to(drops[10], { duration: 10, y: 1000, rotate: 90 }, "<+1");
  };

  const panCamera = () => {
    return gsap
      .timeline()
      .to(scene.current, {
        duration: 2,
        scale: 2.8,
        x: "90%",
        y: "10%",
        ease: "power2.out",
      })
      .to(scene.current, {
        duration: 2,
        scale: 1.5,
        x: "-23%",
        y: "0",
        ease: "sine.out",
      })
      .to(scene.current, {
        duration: 2,
        scale: 1.5,
        x: "-14%",
        y: "40%",
        ease: "sine.out",
      })
      .to(scene.current, {
        duration: 1.5,
        scale: 1,
        x: 0,
        y: 0,
        ease: "sine.out",
      });
  };

  const scene1End = () => {
    const strings = gsap.utils.toArray(".strings li");
    return gsap
      .timeline({ onComplete: playNext })
      .to(strings[4], { duration: 1.1, x: "-40em", ease: "power3.in" }, "<")
      .to(strings[5], { duration: 1.1, x: "-60em", ease: "power3.in" }, "<+0.1")
      .to(
        strings[0],
        { duration: 1.1, x: "-25em", ease: "power3.in" },
        "<+0.12"
      )
      .to(
        strings[1],
        { duration: 1.1, x: "-50em", ease: "power3.in" },
        "<+0.13"
      )
      .to(strings[6], { duration: 1.1, x: "-60em", ease: "power3.in" }, "<+0.2")
      .to(strings[3], { duration: 1, x: "-30em", ease: "power3.in" }, "<+0.24")
      .to(strings[2], { duration: 1, x: "-25em", ease: "power3.in" }, "<+0.23")
      .to(desk.current, { duration: 1, y: "130%", ease: "power3.in" }, "0.5")
      .to(drops1.current, { duration: 0.8, opacity: 0 }, "0.5");
  };

  const playNext = () => {
    const seekTime = timeline.getChildren(false, true, true)[1];
    timeline.seek(seekTime._start);
    setShow(false);
  };

  const scene1 = () => {
    return gsap
      .timeline({ autoRemoveChildren: true })
      .add(propDrops())
      .add(propPhotos(), "<")
      .add(panCamera(), "<+3")
      .add(scene1End(), ">");
  };

  useGSAP(() => {
    timeline && timeline.add(scene1());
  }, [timeline, index]);

  return (
    show && (
      <div className="scene1" ref={scene}>
        <img className="table" ref={desk} src={table} />
        <div className="drops1" ref={drops1}>
          <span className="kisses-1"></span>
          <span className="kisses-3"></span>
          <span className="kisses-3"></span>
          <span className="kisses-3"></span>
          <span className="kisses-3"></span>
          <span className="kisses-3"></span>
          <span className="kisses-3"></span>
          <span className="kisses-3"></span>
          <span className="kisses-1"></span>
          <span className="kisses-3"></span>
        </div>
        <ul className="strings str1">
          <li>
            <span className="kisses-3"></span>
          </li>
          <li>
            <span className="kisses-1"></span>
          </li>
          {photos.map((pic, i) => (
            <li key={i}>
              <figure>
                <img src={pic} />
              </figure>
            </li>
          ))}
        </ul>
        {/* <span className='kisses-2'></span> */}
      </div>
    )
  );
}
