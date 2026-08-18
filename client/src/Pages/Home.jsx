import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import { Hero } from "../components/Hero";
import {Features} from "../components/Features"
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";

function Home() {
  const featuresRef=useRef(null);
   const heroRef=useRef(null);
  const scrollToFeatures=()=>{
    featuresRef.current?.scrollIntoView({
      behavior:"smooth"
    })
  };
  
  const scrollToHero=()=>{
    heroRef.current?.scrollIntoView({
      behavior:"smooth"
    })
  };
  return (
    <>
      <Navbar onScrollToFeatures={scrollToFeatures} onScrollToHero={scrollToHero}/>
      <Hero ref={heroRef}/>
    <Features ref={featuresRef}/>
      <ScrollReveal once={false}>
        <CTA />
      </ScrollReveal>
      <Footer />
    </>
  );
}

export default Home;
