import CrawlSettings from "@/model/CrawlSettings";
import { useEffect, useState } from "react";


// Set the star total constant number.
const STAR_DENSITY = 5400;
export const ANIMATABLE_CLASS = "animatable";

const DEFAULT_INTRO = " A long time ago in a galaxy far,\nfar away. . . ."
const DEFAULT_EPISODE = "EPISODE VI";
const DEFAULT_TITLE = "Return of the Jedi";

const DEFAULT_CONTENT = `It is a period of civil wars in the galaxy. A brave alliance of underground freedom fighters has challenged the tyranny and oppression of the awesome GALACTIC EMPIRE.
Striking from a fortress hidden among the billion stars of the galaxy, rebel spaceships have won their first victory in a battle with the powerful Imperial Starfleet. The EMPIRE fears that another defeat could bring a thousand more solar systems into the rebellion, and Imperial control over the galaxy would be lost forever.
To crush the rebellion once and for all, the EMPIRE is constructing a sinister new battle station. Powerful enough to destroy an entire planet, its completion spells certain doom for the champions of freedom.`

// Create a function to generate our star constant.
const genStars = (pxWidth: number, pxHeight: number) => {
  var x = Math.floor(Math.random() * pxWidth);
  var y = Math.floor(Math.random() * pxHeight * 2);
  return {x,y};
}

const genStarPatterns = (pxWidth: number, pxHeight: number): {className: string, x: number, y: number}[] => {
  // Create a loop that individually places each star.
  let toRet = [];
  let iterations = pxWidth * pxHeight / STAR_DENSITY
  for (let i = 0; i < iterations; i++) {
    for (let className of ["star", "star2", "star3"]) {
      toRet.push({className: className + " " + ANIMATABLE_CLASS, ...genStars(pxWidth, pxHeight)});
    }
  }
  return toRet;
}


export default (props: CrawlSettings) => {
  let {intro, episode, title, crawl} = props;
  
  intro = intro && intro.length ? intro : DEFAULT_INTRO;
  episode = episode && episode.length ? episode : DEFAULT_EPISODE;
  title = title && title.length ? title : DEFAULT_TITLE;
  crawl = crawl && crawl.length ? crawl : DEFAULT_CONTENT;


  let [starPatterns, setStarPatterns] = useState<{className: string, x: number, y: number}[] | undefined>(undefined);

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


/*
        <!-- JavaScript Code -->
        <script type="text/javascript">
          // taken from https://stackoverflow.com/a/6234804
          function escapeHtml(unsafe) {
            return unsafe
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
          }
      
          // taken from https://stackoverflow.com/a/831060
          function getRequestParam(name) {
            if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search)) {
              return decodeURIComponent(name[1]);
            } else {
              return undefined;
            }
          }
      
      
          // A collection of the various episode introductions.
          var defaultCollection = {
            "episode": "Episode I",
            "title": "THE PHANTOM MENACE",
            "text": "Turmoil has engulfed the Galactic Republic. The taxation of  trade routes to outlying star systems is in dispute.\n\nHoping to resolve the matter with a blockade of deadly battleships, the greedy Trade Federation has stopped all shipping to the small planet of Naboo.\n\nAlarming chain of events, the Supreme Chancellor has secretly dispatched two Jedi Knights, the guardians of peace and justice in the galaxy, to settle the conflict...."
          };
          // Set the varibles and assign the episode.
          var episodeContent = getRequestParam("episode") ?? defaultCollection["episode"];
          var titleContent = getRequestParam("title") ?? defaultCollection["title"];
          var text = getRequestParam("text") ?? defaultCollection["text"];
      
          document.title = titleContent;
          episode.innerHTML = episodeContent;
          title.innerHTML = titleContent;
          paragraphs = text.split("\n").filter(t => t.trim().length > 0);
          for (var i = 0; i < paragraphs.length; i++) {
            let paragraphEl = document.createElement("p");
            content.appendChild(paragraphEl);
            paragraphEl.innerHTML = escapeHtml(paragraphs[i]);
          }
      
          function playaudio() {
            var audio = new Audio('https://play.starwars.com/html5/starwars_crawlcreator/audio/crawl_mixdown.mp3');
            audio.currentTime = 0;
            audio.play();
          }
        </script>
*/

    return (
        <div className="crawl-container">
        {/* <audio id="mainthemeaudio" autoplay>
        <source src="./media/Star.Wars.Intro.mp3" type="audio/mp3" />
        <source src="https://play.starwars.com/html5/starwars_crawlcreator/audio/crawl_mixdown.mp3" type="audio/mp3" /> 
        </audio> */}
        <div className={"star-container starpattern " + ANIMATABLE_CLASS}>
          {(starPatterns || []).map(({x, y, className}, idx) => (<nav key={idx} style={{top: y, left: x}} className={className} />))}
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
        {/* <img class="logo" src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg" aria-details="Star Wars Logo"/> */}
        <svg className={"crawl-logo " + ANIMATABLE_CLASS} viewBox="0 0 634 273">
          <title>StarWarsLogo</title>
          <g id="logo" stroke="none" strokeWidth="1" fill="none" fillRule="nonzero"
            transform="translate(-1.000000, 0.000000)">
            <path
              d="M119.718,148.207 L128.388,173.668 C133.079,187.436 137.267,198.447 137.813,198.447 C137.822,198.447 137.83,198.443 137.837,198.437 C138.437,197.907 155.407,148.626 155.407,148.626 L188.297,148.626 L148.617,264.245 L125.757,264.245 C125.757,264.245 101.357,193.774 101.457,193.506 L75.987,263.357 L53.357,263.357 L14.177,148.206 L46.907,148.228 C46.907,148.228 64.836,199.049 65.075,199.049 C65.076,199.049 65.076,199.048 65.077,199.047 L82.967,148.206 L119.718,148.206 L119.718,148.207 Z M3.003,140.2 L6.604,150.784 L45.784,265.933 L47.629,271.357 L53.358,271.357 L75.988,271.357 L81.586,271.357 L83.504,266.097 L101.189,217.597 C102.713,222.031 104.36,226.81 106.007,231.585 C112.096,249.24 118.198,266.862 118.198,266.862 L120.062,272.245 L125.758,272.245 L148.618,272.245 L154.33,272.245 L156.184,266.842 L195.864,151.224 L199.501,140.626 L188.297,140.626 L155.407,140.626 L149.701,140.626 L147.843,146.022 C144.869,154.657 140.922,166.053 137.547,175.698 C137.038,174.235 136.508,172.697 135.96,171.087 L127.291,145.627 L125.445,140.206 L119.718,140.206 L82.968,140.206 L77.302,140.206 L75.421,145.551 L64.968,175.257 C61.515,165.551 57.512,154.24 54.452,145.566 L52.57,140.232 L46.913,140.228 L14.183,140.207 L3.003,140.2 Z"
              id="Shape1"></path>
            <path
              d="M626.258,147.758 L626.183,178.063 C626.183,178.063 593.54,177.954 576.944,177.954 C571.423,177.954 567.678,177.967 567.5,177.999 C564.64,178.52 562.819,184.601 563.63,187.27 C564.029,188.62 567.021,193.03 570.26,197.08 C573.489,201.131 578.8,207.761 582.04,211.809 C590.359,222.19 591.5,224.239 592.269,230.2 C593.519,239.881 588.94,250.36 580.44,257.27 C571.922,264.2 572.295,264.249 509.057,264.249 C508.141,264.249 507.222,264.249 506.28,264.249 C467.82,264.239 447.48,263.92 444.519,263.26 C439.259,262.07 430.879,255.23 408.729,233.98 C400.762,226.344 393.42,219.658 393.043,219.656 C393.033,219.656 393.028,219.662 393.028,219.672 L392.767,264.251 L356.868,264.092 L356.647,149.112 L401.918,149.112 L436.708,149.112 C460.838,149.983 477.168,174.022 473.918,189.352 C473.178,192.831 471.298,197.873 469.737,200.552 C466.527,206.052 458.357,213.112 451.726,216.143 C449.277,217.251 447.277,218.541 447.277,219.001 C447.277,220.711 455.338,228.65 458.357,229.911 C460.936,230.99 468.447,231.23 501.567,231.23 C505.449,231.23 508.975,231.232 512.175,231.232 C545.468,231.232 543.793,230.992 546.365,225.491 C548.166,221.661 546.796,219.371 534.126,205.101 C518.075,189.13 519.756,181.48 519.646,175.83 C519.417,169.06 524.748,147.761 552.458,147.761 L626.258,147.758 Z M411.188,200.878 C426.558,200.878 429.678,200.639 432.949,199.218 C443.989,194.418 444.579,180.239 433.989,173.947 C431.67,172.566 428.689,172.338 412.029,172.247 L392.75,172.146 C392.909,172.296 392.689,199.716 392.689,199.716 C392.689,199.716 397.518,200.878 411.188,200.878 Z M634.277,139.758 L626.256,139.758 L552.456,139.758 C536.424,139.758 526.941,146.086 521.81,151.395 C513.463,160.028 511.497,170.899 511.648,176.024 C511.656,176.451 511.651,176.889 511.646,177.346 C511.573,185.675 512.8,195.104 528.305,210.592 C531.37,214.044 536.498,219.831 538.436,222.707 C534.198,223.228 523.456,223.228 512.174,223.228 L507.382,223.228 L501.566,223.226 C481.662,223.226 464.878,223.169 461.438,222.49 C460.957,222.176 460.282,221.636 459.54,220.992 C466.417,216.757 473.37,210.193 476.644,204.58 C478.631,201.167 480.822,195.337 481.742,191.012 C483.782,181.387 480.417,169.776 472.741,159.944 C463.785,148.473 450.756,141.61 436.995,141.114 L436.85,141.108 L436.705,141.108 L401.915,141.108 L356.644,141.108 L348.628,141.108 L348.644,149.125 L348.865,264.104 L348.881,272.053 L356.83,272.088 L392.729,272.247 L400.717,272.282 L400.764,264.294 L400.919,237.588 C401.652,238.284 402.41,239.007 403.188,239.753 C427.415,262.993 435.547,269.432 442.75,271.061 C444.729,271.502 448.003,272.233 506.273,272.249 L509.052,272.249 C540.598,272.249 556.432,272.249 565.851,271.339 C576.64,270.296 580.11,267.849 585.312,263.614 L585.485,263.473 C596.17,254.786 601.808,241.643 600.2,229.173 C599.152,221.063 597.006,217.694 588.278,206.805 L585.684,203.565 C582.644,199.766 578.971,195.178 576.509,192.09 C574.523,189.606 572.963,187.401 572.022,185.957 C573.258,185.954 574.863,185.952 576.94,185.952 C593.335,185.952 625.827,186.06 626.153,186.062 L634.161,186.088 L634.181,178.08 L634.256,147.774 L634.277,139.758 Z M400.739,192.586 C400.752,190.565 400.764,188.299 400.777,186.029 C400.787,184.029 400.796,182.025 400.799,180.189 L411.986,180.247 C418.415,180.282 428.089,180.335 429.975,180.87 C432.382,182.331 433.725,184.59 433.579,186.93 C433.499,188.194 432.897,190.518 429.758,191.881 C428.008,192.641 425.218,192.878 411.188,192.878 C406.738,192.878 403.305,192.749 400.739,192.586 Z"
              id="Shape2"></path>
            <path
              d="M283.908,147.287 L324.198,263.207 L291.368,263.357 L285.918,245.947 L227.218,245.476 L222.038,262.907 L189.538,262.566 L229.318,147.337 L283.908,147.287 Z M257.507,164.283 C257.424,164.616 252.363,178.502 247.285,192.387 C242.165,206.387 237.028,220.387 236.957,220.496 C236.957,220.497 236.956,220.497 236.957,220.497 C236.957,220.497 236.957,220.497 236.957,220.496 C237.093,220.456 255.273,220.416 266.925,220.416 C272.378,220.416 276.4,220.425 276.475,220.445 C276.476,220.449 276.476,220.45 276.476,220.45 C276.476,220.45 276.476,220.449 276.476,220.447 C276.476,220.447 276.476,220.447 276.475,220.445 C276.271,219.916 257.566,164.959 257.507,164.283 C257.508,164.279 257.508,164.277 257.508,164.277 C257.507,164.277 257.507,164.279 257.507,164.283 Z M289.595,139.282 L283.902,139.287 L229.312,139.338 L223.616,139.343 L221.757,144.729 L181.977,259.958 L178.354,270.452 L189.456,270.567 L221.956,270.908 L227.989,270.971 L229.708,265.189 L233.174,253.527 L280.028,253.902 L283.736,265.75 L285.501,271.388 L291.408,271.362 L324.237,271.212 L335.432,271.16 L331.756,260.586 L291.466,144.666 L289.595,139.282 Z M248.472,212.424 C249.987,208.295 252.028,202.714 254.799,195.135 C255.668,192.759 256.463,190.584 257.192,188.59 C257.855,190.546 258.577,192.674 259.361,194.988 C260.007,196.894 262.846,205.258 265.281,212.416 C258.041,212.416 252.591,212.417 248.472,212.424 Z"
              id="Shape3"></path>
            <path
              d="M297.488,8.928 L297.488,37.528 L240.208,37.528 L240.208,124.998 L206.058,124.998 L206.058,37.458 L139.198,37.648 C131.138,37.648 130.058,44.068 130.058,46.528 C130.058,49.548 132.028,52.568 142.848,66.268 C149.868,75.168 156.318,84.048 157.168,85.988 C161.808,96.668 155.808,113.308 144.878,120.068 C137.088,124.881 138.419,124.999 80.57,124.999 C77.596,124.999 74.474,124.999 71.178,124.999 L8.908,124.999 L8.908,92.869 L106.808,92.869 L109.698,90.859 C111.648,89.499 112.778,87.629 113.208,85.069 C113.808,81.389 113.498,80.909 101.408,67.289 C87.118,51.189 85.608,48.249 86.348,37.969 C87.188,26.239 97.648,9.199 115.928,9.199 L297.488,8.928 Z M305.488,0.916 L297.475,0.928 L115.915,1.198 C105.457,1.198 95.744,5.716 88.573,13.92 C82.759,20.572 78.943,29.349 78.367,37.397 C77.394,50.908 80.504,55.79 95.423,72.599 C99.753,77.476 103.87,82.115 105.244,84.085 C105.222,84.164 105.202,84.215 105.19,84.244 C105.175,84.256 105.152,84.274 105.12,84.296 L104.298,84.868 L8.908,84.868 L0.908,84.868 L0.908,92.868 L0.908,124.998 L0.908,132.998 L8.908,132.998 L71.178,132.998 L76.115,132.998 L80.57,132.998 C109.092,132.998 123.17,132.971 131.464,132.363 C140.954,131.668 143.982,130.04 148.518,127.223 L149.084,126.872 C163.346,118.051 170.696,97.045 164.506,82.798 C162.596,78.44 150.503,63.052 149.13,61.312 C145.334,56.505 139.068,48.572 138.076,46.276 C138.1,46.083 138.147,45.883 138.197,45.744 C138.362,45.702 138.678,45.646 139.198,45.646 L198.058,45.479 L198.058,124.996 L198.058,132.996 L206.058,132.996 L240.208,132.996 L248.208,132.996 L248.208,124.996 L248.208,45.526 L297.488,45.526 L305.488,45.526 L305.488,37.526 L305.488,8.926 L305.488,0.916 Z"
              id="Shape4"></path>
            <path
              d="M390.548,9.857 L430.728,126.077 L397.958,125.897 L392.638,108.487 L334.199,108.227 L328.978,124.997 L295.609,124.997 L335.348,9.857 L390.548,9.857 Z M343.737,83.478 L383.538,83.428 C383.539,83.428 383.539,83.429 383.539,83.429 C383.675,83.429 364.197,26.228 364.067,26.188 C363.925,26.183 343.288,83.478 343.737,83.478 Z M396.247,1.857 L390.548,1.857 L335.348,1.857 L329.647,1.857 L327.787,7.247 L288.047,122.388 L284.385,132.998 L295.61,132.998 L328.98,132.998 L334.869,132.998 L336.619,127.375 L340.08,116.254 L386.712,116.461 L390.311,128.235 L392.032,133.864 L397.919,133.897 L430.689,134.077 L441.986,134.139 L438.295,123.463 L398.115,7.243 L396.247,1.857 Z M354.851,75.464 C357.319,68.437 360.755,58.807 363.865,50.152 C366.813,58.796 370.074,68.397 372.453,75.442 L354.851,75.464 Z"
              id="Shape5"></path>
            <path
              d="M503.396,9.857 C529.317,9.857 547.306,10.227 550.766,10.827 C558.766,12.217 565.996,16.487 571.416,23.047 C577.086,29.907 578.386,33.187 579.126,42.587 C580.187,55.857 573.876,67.307 561.426,74.737 C557.796,76.907 554.067,79.017 553.136,79.437 C551.706,80.087 551.897,80.707 554.456,83.707 C556.105,85.637 558.966,88.387 560.806,89.817 L564.166,92.427 L626.246,93.317 L626.855,124.997 L588.794,124.997 C559.355,124.997 549.934,124.727 547.174,123.797 C543.044,122.397 533.105,113.977 512.903,94.757 L498.483,81.037 L498.635,124.997 L461.592,124.997 L461.592,9.857 L503.396,9.857 Z M497.938,61.627 L517.609,61.627 C536.75,61.627 537.348,61.567 540.079,59.517 C544.96,55.857 546.688,52.087 546.17,46.297 C545.64,40.327 543.34,37.217 537.569,34.717 C534.319,33.297 531.188,33.067 515.848,33.067 L497.938,33.067 L497.938,61.627 Z M503.396,1.857 L461.596,1.857 L453.596,1.857 L453.596,9.857 L453.596,124.997 L453.596,132.997 L461.596,132.997 L498.639,132.997 L506.667,132.997 L506.639,124.969 L506.551,99.753 L507.391,100.552 C532.377,124.325 539.747,129.725 544.609,131.373 C548.342,132.632 554.591,132.997 588.797,132.997 L626.858,132.997 L635.012,132.997 L634.856,124.843 L634.247,93.163 L634.099,85.429 L626.365,85.318 L566.963,84.467 L565.718,83.5 C565.322,83.191 564.842,82.783 564.329,82.321 C564.775,82.057 565.183,81.814 565.536,81.604 C580.539,72.651 588.402,58.197 587.105,41.951 C586.242,30.992 584.285,26.055 577.585,17.951 C571.001,9.982 561.964,4.653 552.138,2.946 C546.678,1.999 519.257,1.857 503.396,1.857 Z M505.938,41.067 L515.848,41.067 C529.875,41.067 532.654,41.3 534.366,42.048 C537.616,43.456 537.946,44.139 538.201,47.005 C538.457,49.853 538.104,50.999 535.279,53.117 C535.186,53.186 535.115,53.24 535.056,53.283 C533.191,53.628 526.27,53.628 517.609,53.628 L505.939,53.628 L505.938,41.067 Z"
              id="Shape6"></path>
          </g>
        </svg>
        {/* <button onclick="playaudio()"></button> */}
        </div>
    );
}
