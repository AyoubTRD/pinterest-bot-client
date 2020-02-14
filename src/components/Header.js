import React from "react";

import ScrollButton from "./ScrollButton";

const Header = () => {
  return (
    <header>
      <div>
        <h1>From <span className={"primary-color"}>Instagram</span> to <span className="primary-color">Pinterest</span></h1>
        <p><span className="primary-color">Automate</span> your pins on pinterest with real instagram images of your choice</p>
        <div className={"buttons"}>
          <ScrollButton element={"#form"} className={"btn btn-main"}>
            Start your bot
          </ScrollButton>
          <ScrollButton element={"#howitworks"} className={"btn btn-secondary"}>
            How it works
          </ScrollButton>
        </div>
      </div>
    </header>
  )
}

export default Header