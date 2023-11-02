import React, { useEffect, useRef,useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MainIcon from './assets/svgs/main-icon.svg'
import HeroPark from './assets/svgs/park.svg'
import { Power3 } from 'gsap/gsap-core';
import { Observer } from 'gsap/Observer';
import "./App.scss"
import "./App.css"


const App = () => {
    gsap.registerPlugin(Observer, ScrollTrigger);
    let heading = useRef(null)
    let main = useRef(null)
    let park = useRef(null)
    let tl = gsap.timeline();

    // Gsap Code
    let currentIndex = -1;
    let animating;
    ScrollTrigger.normalizeScroll(true)

    // handle the panel swipe animations
    const gotoPanel = (index, isScrollingDown) => {
        console.log(index,"index")
        animating = true;
        let target = isScrollingDown ? main.children[index] : main.children[currentIndex];
        console.log(target, isScrollingDown, animating, index,main.children[index],main.children[currentIndex])
        if(currentIndex === 0){
          tl.to(main.children[currentIndex], {
            yPercent: isScrollingDown ? -90 : 0,
            duration: 1.5,
            ease: Power3.easeOut,
            onComplete: () => {
                animating = false;
            }
            
          });
          gsap.to(park, {
            yPercent: isScrollingDown ? 90 : 0,
            duration: 1.5,
            ease: Power3.easeOut,
          })
        }else{
          tl.to(main.children[currentIndex], {
            yPercent: isScrollingDown ? -100 : 0,
            duration: 1.5,
            ease: Power3.easeOut,
            onComplete: () => {
                animating = false;
            }
          });
          // gsap.to(park, {
          //   yPercent: isScrollingDown ? 20 : 0,
          //   duration: 1.5,
          //   ease: Power3.easeOut,
          // })
        }
        currentIndex = index;
    }

  useEffect(() => {
    let intentObserver = ScrollTrigger.observe({
      type: "wheel,touch",
      onUp: () => !animating && gotoPanel(currentIndex + 1, true),
      onDown: () => !animating && gotoPanel(currentIndex - 1, false),
      wheelSpeed: -1, // to match mobile behavior, invert the wheel speed
      tolerance: 10,
      preventDefault: true,
      onPress: self => {
          ScrollTrigger.isTouch && self.event.preventDefault()
      }
    })
    intentObserver.disable();

    let preventScroll = ScrollTrigger.observe({
      preventDefault: true,
      type: "wheel,scroll",
      allowClicks: true,
      onEnable: self => self.savedScroll = self.scrollY(), // save the scroll position
      onChangeY: self => self.scrollY(self.savedScroll)    // refuse to scroll
    });
    preventScroll.disable();

    // pin swipe section and initiate observer
    ScrollTrigger.create({
      trigger: main,
      pin: true,
      anticipatePin: true,
      // markers:true,
      start: "0% 0%",
      end: "+=0%",
      onEnter: (self) => {
          if (preventScroll.isEnabled === false) {
            self.scroll(self.start);
            preventScroll.enable();
            intentObserver.enable();
            
            gotoPanel(currentIndex + 1, true);
          }
      },
      onEnterBack: (self) => {
          if (preventScroll.isEnabled === false) {
            self.scroll(self.start);
            preventScroll.enable();
            intentObserver.enable();
            gotoPanel(currentIndex - 1, false);
          }
      }
    });

  }, [animating, currentIndex]);

  useLayoutEffect(()=>{
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
    tl.to(main, 1, {
        opacity: 1,
        ease: Power3.easeOut
      }, 0.5)
      .staggerTo(heading.children, 1, {y:-40, opacity:1, ease:Power3.easeInOut}, 0.5)
  }, [tl])

  return (
    <div className="App">
      <div className="main swipe-section"  ref={el=>{main = el}}>
        <section className="panel first">
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
                   <img src={HeroPark} height={500} alt="" />
                </div>
            </div>
        </section>

        <section className="panel second">
            <div className="about-us">
                <div className="about-us-content">
                  <div className="about-us-heading">
                      <h1>A one-of-a-kind</h1>
                      <h1>event <span>experience</span></h1>
                  </div>
                </div> 
            </div>
        </section>

        <section className="panel third">
            <div className="park">
                <div className="park-content">
                  
                </div> 
            </div>
        </section>
      </div>
    </div>
  );
};

export default App;