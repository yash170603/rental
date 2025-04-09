
import React from "react";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import DiscoverSection from "./DiscoverSection";
import CallToActionSection from "./CallToActionSection";
import FooterSection from "./FooterSection";
import { useGetAuthUserQuery } from "@/state/api";
 
const Landing = () => {
  // const {data:authUser}= useGetAuthUserQuery();
  // console.log("this is the auth user at  line 12 of landing page",authUser );
  return (
    <div className="">
      <HeroSection />
      <FeatureSection />
      <DiscoverSection />
      <CallToActionSection/>
      <FooterSection />
    </div>
  );
};

export default Landing;
