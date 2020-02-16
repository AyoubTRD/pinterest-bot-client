import React from "react";

import Illustration from "../assets/SVG/Illustration1";
import ScrollButton from "./ScrollButton";

const HowItWorks = () => {
  return (
    <section id="howitworks">
      <h2>How it Works</h2>
      <div className="container">

      <div className="grid">
        <div>
          <p>
            The bot starts by getting images from the resource you want, which could be
            an instagram tag or an instagram profile. Then it logs in to your pinterest
            account. Selects the board you specify, then posts images with a random delay that
            you can specify.
          </p>
          <p><strong>Everything is customisable!</strong></p>
          <ScrollButton element={"#form"} className={"btn btn-main"}>
            Start your bot
          </ScrollButton>
        </div>
        <Illustration />
      </div>
      </div>
    </section>
  )
}

export default HowItWorks