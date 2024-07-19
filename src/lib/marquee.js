import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.3,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

let direction = 1;

const roll1 = roll(".marquee-one .marquee-items", {duration: 30}),
      roll2 = roll(".marquee-two .marquee-items", {duration: 30}, true),
      scroll = ScrollTrigger.create({
        onUpdate(self) {
          if (self.direction !== direction) {
            direction *= -1;
            roll1.timeScale(direction * 10);
            roll2.timeScale(direction * 10);
            gsap.to([roll1, roll2], {timeScale: direction, overwrite: true, duration: 1});
          }
        }
      });

function roll(targets, vars, reverse) {
  vars = vars || {};
  vars.ease || (vars.ease = "none");
  const tl = gsap.timeline({
          repeat: -1,
          onReverseComplete() { 
            this.totalTime(this.rawTime() + this.duration() * 100);
          }
        }), 
        elements = gsap.utils.toArray(targets),
        clones = elements.map(el => {
          let clone = el.cloneNode(true);
          el.parentNode.appendChild(clone);
          return clone;
        }),
        positionClones = () => elements.forEach((el, i) => gsap.set(clones[i], {position: "absolute", overwrite: false, top: el.offsetTop, left: el.offsetLeft + (reverse ? -el.offsetWidth : el.offsetWidth)}));
  positionClones();
  elements.forEach((el, i) => tl.to([el, clones[i]], {xPercent: reverse ? 100 : -100, ...vars}, 0));
  window.addEventListener("resize", () => {
    let time = tl.totalTime(); 
    tl.totalTime(0); 
    positionClones(); 
    tl.totalTime(time); 
  });
  return tl;
}



const tween = gsap.to(".spinningStar", {
  rotation:1440, 
  duration: 40, 
  ease: "none", 
  repeat: -1 
}).totalProgress(0.5);

let tl = gsap.timeline();

ScrollTrigger.create({
  trigger: ".spinningStar",
  start: 'center center',
  end: '+=5000',
  onUpdate({ getVelocity }) {
    const velocity = getVelocity();
        
    let timeScale = 1;
    let endTimeScale = 1;
    
    if (velocity > 1) {
      timeScale = 1;
    } else {
      timeScale = -1;
      endTimeScale = -1;
    }
        
    tl.clear()
      .to(tween, {
        duration: 0.04,
        timeScale: timeScale
      })
      .to(tween, {
        duration: 0.04,
        timeScale: endTimeScale
      }, "+=1");
  }
})