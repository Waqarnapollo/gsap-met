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
    let parkPoints=useRef(null)
    let fourthContainer = useRef(null)
    let fourthHeading= useRef(null)
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
            yPercent: isScrollingDown ? -100 : 0,
            duration: 2,
            ease: Power3.easeOut,
            onComplete: () => {
                animating = false;
            }
            
          });
          gsap.to(park, {
            yPercent: isScrollingDown ? 105 : 0,
            duration: 2,
            ease: Power3.easeOut,
          })
        }
        else if(currentIndex === 1){
          tl.to(main.children[currentIndex], {
            yPercent: isScrollingDown ? -100 : 0,
            duration: 2,
            ease: Power3.easeOut,
            onComplete: () => {
                animating = false;
            }
          });
          gsap.to(park, {
            y: isScrollingDown ? -100 : 0,
            opacity: isScrollingDown  ?  0.4 : 1,
            duration: 2,
            ease: Power3.easeOut,
          })
          gsap.from(parkPoints.current, {
            opacity: 0,
            y: 30,
            duration: 1,
            stagger: 0.5, // Adjust the stagger value as needed
          });
        }
        else if(currentIndex == 2){
          tl.to(main.children[currentIndex], {
            yPercent: isScrollingDown ? -100 : 0,
            duration: 2,
            ease: Power3.easeOut,
            onComplete: () => {
                animating = false;
            }
          });
          gsap.to(park, {
            y: isScrollingDown ? -100 : 0,
            opacity: isScrollingDown  ?  0 : 0.4,
            duration: 0.2,
            ease: Power3.easeOut,
          })
        }
        else{
          if(main.children[currentIndex] || main.children[index] )
          {
            console.log(index,"index")
            console.log(currentIndex,"currentIndex")
            tl.to(main.children[currentIndex], {
              yPercent: isScrollingDown ? -15 : 0,
              duration: 2,
              ease: Power3.easeOut,     
              onComplete: () => {
                  animating = false;
              }
            });
           
             /* Zoom out the fourth container heading */
              (isScrollingDown  && index== 4 ) &&
                gsap.to(fourthHeading, {
                yPercent:20,
                xPercent:-30,
                scale: 0.4, 
                duration: 1.5, 
                ease: Power3.easeOut,
              }) 

             index== 2 &&
              gsap.to(fourthHeading, {
              yPercent: 0,
              xPercent: 0,
              scale: 1, 
              duration: 1.5, 
              ease: Power3.easeOut,
            }) 
          
          }
          else{
           
           
            tl.to(fourthContainer, {
              yPercent: isScrollingDown ? -15 : 0,
              duration: 2,
              ease: Power3.easeOut,     
              onComplete: () => {
                  animating = false;
              }
            });    
          }
         
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

  const pointsMarkData=[
    {
      id:1,
      name: "bullPenPlaza",
      height: 2, //multiple the normal height with 2
      cordinates: [35,35]
    },
    {
      id:2,
      name: "DeltaSky360Club",
      height: 1, 
      cordinates: [60,50]
    },
    {
      id:3,
      name: "Pizza31 Club",
      height: 1, 
      cordinates: [30,30]
    }
    ,
    {
      id:4,
      name: "FanFast",
      height: 1, 
      cordinates: [70,40]
    },
    {
      id:5,
      name: "Field",
      height: 1, 
      cordinates: [50,45]
    },
    {
      id:6,
      name: "EmpireSuites",
      height: 1, 
      cordinates: [40,20]
    },
    {
      id:7,
      name: "CloverHomePlateClub",
      height: 2, 
      cordinates: [60,15]
    },


  ]

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
             <div className='second-top'>

             </div>
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
                {
                pointsMarkData.map((point,index)=>{
                  return(
                      <div key={index} ref={el=>{parkPoints = el}} className="point" style={{
                        position:"absolute",
                        left: `${point.cordinates[0]}%`,
                        top:  `${point.cordinates[1]}%`,
                      }}>
                       <span className="point-heading">
                          {point.name}
                       </span>
                       <div className="point-verticalLne" style={{
                         height: `${point.height*80}px`
                       }}></div>
                       <div className='point-circle'></div>
                   </div>
                  )
                })    
                } 
                </div> 
            </div>
        </section>

        {/* Section 4 */}
        <section className="panel fourth">
               <div className="fourth-container" ref={e=>fourthContainer=e}>
                <div className="container-left">
                    <div className="left-first">
                        <h1 ref={e=>fourthHeading=e}>Find <br/>your <br/>Place</h1>
                    </div>
                    <div className="left-second">
                      
                    </div>
                    <div className="left-third">
                      
                    </div>
                    <div className='right-spacer'>

                    </div>
                </div>
               <div className="container-right">
                  <div className='right-spacer'>

                  </div>
                 <div className="right-first">

                  </div>
                  <div className="right-second">
                    
                  </div>
                  <div className="right-third">
                    
                  </div>
              </div> 
              </div>          
        </section>
      </div>
    </div>
  );
};

export default App;