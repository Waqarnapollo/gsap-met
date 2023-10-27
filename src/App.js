import { useEffect, useRef } from 'react';
import './App.scss';
import { Power3 } from 'gsap/gsap-core';
import gsap from 'gsap';
import './index.css'
import MainIcon from './assets/svgs/main-icon.svg'
import HeroPark from './assets/svgs/park.svg'

function App() {
  let main = useRef(null)
  let heading = useRef(null)

  let tl = gsap.timeline();

  useEffect(()=>{

    console.log(heading.children);

    tl.to(main, 2, {
      opacity:1,
      ease: Power3.easeOut
    }, 0.5)

    

    tl.staggerFrom(heading.children, 2, {y:40, opacity:1, ease:Power3.easeInOut})
  }, [tl])

  return (
    <div className="App">
      <div className="main" ref={el=>{main = el}}>

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

          <div className="hero-park">
            <img src={HeroPark} width="1390" height={200} alt="" />
          </div>
        </div>

        <div className="section2"></div>
        <div className="section3"></div>
      </div>
    </div>
  );
}

export default App;
