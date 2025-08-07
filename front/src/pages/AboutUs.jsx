import React from 'react'
import Hero from "../components/Hero";
import Biography from "../components/Biography"
const AboutUs = () => {
  return (
    <>
      <Hero 
      title={"Leran More About Uchiha Clan | From Tobirama Senju"}
      imageUrl={"/about.png"}
      />
      <Biography imageUrl={"/whoweare.png"}/>
    </>
  )
}

export default AboutUs