import CrawlSettings from "@/model/CrawlSettings";
import { useEffect, useState } from "react";


// Set the star total constant number.
const STAR_DENSITY = 5400;
export const ANIMATABLE_CLASS = "animatable";

// Create a function to generate our star constant.
const genStars = (pxWidth: number, pxHeight: number) => {
  var x = Math.floor(Math.random() * pxWidth);
  var y = Math.floor(Math.random() * pxHeight * 2);
  return { x, y };
}

const genStarPatterns = (pxWidth: number, pxHeight: number): { className: string, x: number, y: number }[] => {
  // Create a loop that individually places each star.
  let toRet = [];
  let iterations = pxWidth * pxHeight / STAR_DENSITY
  for (let i = 0; i < iterations; i++) {
    for (let className of ["star", "star2", "star3"]) {
      toRet.push({ className: className + " " + ANIMATABLE_CLASS, ...genStars(pxWidth, pxHeight) });
    }
  }
  return toRet;
}


export default (props: CrawlSettings) => {
  let { intro, episode, title, crawl, logo } = props;

  let [starPatterns, setStarPatterns] = useState<{ className: string, x: number, y: number }[] | undefined>(undefined);

  useEffect(() => {
    let updateListener = () => {
      setStarPatterns(genStarPatterns(window.innerWidth || 0, window.innerHeight || 0));
    };

    updateListener();
    window.addEventListener("resize", updateListener);
    return () => {
      window.removeEventListener("resize", updateListener);
    }
  }, []);

  return (
    <div className="crawl-container">
      <div className={"star-container starpattern " + ANIMATABLE_CLASS}>
        {(starPatterns || []).map(({ x, y, className }, idx) => (<nav key={idx} style={{ top: y, left: x }} className={className} />))}
      </div>
      <div className={"intro-div " + ANIMATABLE_CLASS}>
        <div className={"intro " + ANIMATABLE_CLASS}>{(intro || "").split("\n").map((text, idx) => (<p key={idx}>{text}</p>))}</div>
      </div>
      <div className="scene">
        <div className={"crawl " + ANIMATABLE_CLASS}>
          <p className="episode">{episode}</p>
          <p className="title">{title}</p>
          <div className="content">{(crawl || "").split("\n").map((text, idx) => (<p key={idx}>{text}</p>))}</div>
        </div>
      </div>

      <div
        className={"crawl-logo " + ANIMATABLE_CLASS}
        dangerouslySetInnerHTML={{ __html: logo || "" }}
      >
      </div>
    </div>
  );
}
