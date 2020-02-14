import React from "react";

const ScrollButton = (props) => {
  const scroll = () => {
    const el = document.querySelector(props.element);
    if(el) {
      el.scrollIntoView({behavior: "smooth"});
    }
  }
  return (
    <button
      {...props}
      onClick={scroll}>{props.children}</button>
  )
}

export default ScrollButton;