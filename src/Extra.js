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
  gsap.registerPlugin(Observer, ScrollTrigger);

  let tl = gsap.timeline();

  let currentIndex = -1;
  let animating;
  let swipePanels = gsap.utils.toArray(".main .section");

  tl.set(swipePanels, {yPercent: 100});

  tl.set(swipePanels, {
    zIndex: i => i
  });
  
  let intentObserver = ScrollTrigger.observe({
    type: "wheel, touch",
    onUp: () => {!animating && gotoPanel(currentIndex + 1, true)},
    onDown: () => !animating && gotoPanel(currentIndex - 1, false),
    wheelSpeed: -1,
    tolerance: 10,
    preventDefault: true,
    onPress: self => {
      ScrollTrigger.isTouch && self.event.preventDefault()
    }
  })
  intentObserver.disable();
  
  // handle the panel swipe animations
  function gotoPanel(index, isScrollingDown) {
    animating = true;
    if ((index === swipePanels.length && isScrollingDown) || (index === -1 && !isScrollingDown)) {
  
          let target = index;
          gsap.to(target, {
          yPercent: isScrollingDown ? -100 : 0,
          duration: 0.00,
          onComplete: () => {
            animating = false;
            isScrollingDown && intentObserver.disable();
          }
      });
      return
    }

    let target = isScrollingDown ? swipePanels[index]: swipePanels[currentIndex];

    tl.to(target, {
      yPercent: isScrollingDown ? 0 : 100,
      duration: 0.75,
      onComplete: () => {
        animating = false;
      }
    });
    currentIndex = index;
    console.log(index);

  }

  // pin swipe section and initiate observer
  ScrollTrigger.create({
    trigger: main.current,
    pin: true,
    start: "top top",
    end: "+=1",
    onEnter: (self) => {
      intentObserver.enable();
      gotoPanel(currentIndex + 1, true);    
    },
    onEnterBack: () => {
      intentObserver.enable();
      gotoPanel(currentIndex - 1, false);
    }
  })

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

    // ScrollTrigger.create({
    //   trigger: park,
    //   start: "top bottom",
    //   end: "bottom +=230",
    //   pin: true,
    //   scrub: true,
    //   markers: true,

    //   pinSpacing: false,
    // });

    

  }, [])

  useEffect(()=>{
    tl.to(main, 0.8, {
        opacity: 1,
        ease: Power3.easeOut
      }, 0.5)
      .staggerTo(heading.children, 1, {y:-40, opacity:1, ease:Power3.easeInOut}, 0.5)

      // console.log(swipePanels.length)
  }, [tl])

  return (
    <div className="App">
      <div className="main" ref={el=>{main = el}}>

        <section className="section first y-100">
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


        <section className="section second y-100">
          <div className="about-us">
            <div className="about-us-content">
              <div className="about-us-heading">
                <h1>A one-of-a-kind</h1>
                <h1>event <span>experience</span></h1>
              </div>
            </div> 
          </div>
        </section>

        <section className="section third"></section>
      </div>
    </div>
  );
}

export default App;
