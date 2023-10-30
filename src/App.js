import { useEffect, useLayoutEffect, useRef } from 'react';
import './App.scss';
import { Power3 } from 'gsap/gsap-core';
import gsap from 'gsap';
import './index.css'
import MainIcon from './assets/svgs/main-icon.svg'
import HeroPark from './assets/svgs/park.svg'
import { Observer } from 'gsap/Observer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function App() {
  let main = useRef(null)
  let heading = useRef(null)
  let park = useRef(null)


  let tl = gsap.timeline();
  gsap.registerPlugin(Observer, ScrollTrigger);

  ScrollTrigger.normalizeScroll(true)

  useLayoutEffect(()=>{
    // Observer.create({
    //   target: main.children,
    //   type: "wheel,touch,pointer",
    //   onDown: (e) => {console.log(e)},
    //   onUp: (e) => console.log(e),
    //   onChange: (self) =>  {
    //     console.log("velocity:", self.velocityX, self.velocityY, "delta:", self.deltaX, self.deltaY, "target element:", self.target, "last event:", self.event);
    //   },
    //   preventDefault: true
    // });

    ScrollTrigger.create({
      trigger: park,
      start: "top top",
      end: "bottom +=230px",
      pin: true,
      scrub: true,
      onToggle: (self) => console.log("toggled, isActive:", self.isActive),
      onUpdate: (self) => {
        console.log(
          "progress:",
          self.progress.toFixed(3),
          "direction:",
          self.direction,
          "velocity",
          self.getVelocity()
        );
      },
    });
    
    
  }, [])

  useEffect(()=>{
    tl.to(main, 2, {
        opacity: 1,
        ease: Power3.easeOut
      }, 0.5)
      .staggerTo(heading.children, 2, {y:-40, opacity:1, ease:Power3.easeInOut}, 0.5)
  }, [tl])

  return (
    <div className="App">
      <div className="main" ref={el=>{main = el}}>

        <section className="first y-100">
          <div className="hero">
            <div className="hero-logo">
              <img src={MainIcon} alt="" />
            </div>
            <div className="hero-content">
              <div className="hero-heading" ref={(e)=>{heading = e}}>
                <h1>Meet at </h1>
                <h1>the <span>Ballpark</span></h1>
              </div>
              <button>Book Your Space</button>
            </div>

            <div className="hero-park" ref={(e)=> {park = e}}>
              <img src={HeroPark} width="1390" height={200} alt="" />
            </div>
          </div>
        </section>


        <section className="second y-100">
          <div className="about-us">
            <div className="about-us-content">
              <div className="about-us-heading">
                <h1>A one-of-a-kind</h1>
                <h1>event <span>experience</span></h1>
              </div>
            </div> 
          </div>
        </section>

        <section className="third"></section>
      </div>
    </div>
  );
}

export default App;
