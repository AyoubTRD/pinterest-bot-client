import React, {useEffect} from "react";

import Header from "./Header"
import HowItWorks from "./HowItWorks"
import Form from "./Form";

const App = () => {
  useEffect(() => {
    const appId = "5083293428020722984";
    window.PDK.init({
      appId
    });
  }, []);
  return (
    <>
      <Header />
      <HowItWorks />
      <Form />
    </>
  )
}

export default App;