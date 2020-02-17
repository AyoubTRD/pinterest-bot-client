import React, {useState} from "react";

import botApi from "../api/bot"

const Form = () => {

  const urlParams = new URLSearchParams(window.location.search);

  const [formInfo, setFormInfo] = useState({
    delayMin: 2,
    delayMax: 5
  });
  const [error, setError] = useState("");
  const [isOver, setOver] = useState(false);

  const handleChange = (e) => {
    const newInfo = {...formInfo}

    if(e.target.getAttribute("type") === "radio") {
      newInfo[e.target.getAttribute("name")] = e.target.getAttribute("id");
      if (e.target.getAttribute("id") === "profile") {
        newInfo.numberOfImages = 200;
      }
    }
    else {
      newInfo[e.target.id] = e.target.value
    }
    setFormInfo(newInfo);
  };

  const handleSubmit = async e => {
    e.preventDefault()
    document.querySelector("#form").classList.add("loading");
    const urlRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/

    try {
      if(!urlRegex.test(formInfo.link)) {
        setError("Please provide a correct url: https://www.example.com/...")
        document.querySelector("#form").classList.remove("loading");
        return
      }
      if(Number(formInfo.numberOfImages) > 1000 || Number(formInfo.numberOfImages) <= 30) {
        setError("Number of images cannot exceed 1000 and can't be less than 30");
        document.querySelector("#form").classList.remove("loading");
        return
      }
      if(!formInfo.board) {
        setError("You must provide the board's name")
        document.querySelector("#form").classList.remove("loading");
        return
      }
      if(Number(formInfo.delayMin) >= Number(formInfo.delayMax)) {
        setError("Delay minimum must be less than delay maximum")
        document.querySelector("#form").classList.remove("loading");
        return
      }
      if(Number(formInfo.delayMin) <= 0 || Number(formInfo.delayMax) <= 0) {
        setError("Delay can't be negative");
        document.querySelector("#form").classList.remove("loading");
        return
      }
      if(formInfo.sourceInfo.includes(" ")) {
        setError(`Cannot have spaces in the ${formInfo.source}`);
        document.querySelector("#form").classList.remove("loading");
        return
      }

      const data = {...formInfo};
      if(data.source === "profile") {
        data.sourceInfo = [data.sourceInfo]
      }
      data.token = window.PDK.getSession().accessToken;
      await botApi.post("/instagram-bot", data);
      document.querySelector("#form").classList.remove("loading");
      setOver(true);
    }
    catch(e) {
      setError("There was an error while submitting your request");
      document.querySelector("#form").classList.remove("loading");
    }
    
  }

  const authenticate = () => {
    window.PDK.login({
      scope: "write_public",
      redirect_uri: "https://pinterst-bot.netlify.com/"
    })
  }


  return (
    <section id="form">
      <h2>Start your Bot</h2>
      {
        !formInfo.auth ?
          <button className={"btn btn-pinterest"} onClick={authenticate}>Login to Pinterest</button>
          : null
      }
      { !isOver && formInfo.auth ?
        <>
        <form onChange={handleChange} onSubmit={handleSubmit}>
        <h4>Images source</h4>
        <div className="form-control">
          <input type="radio" id={"tag"} name={"source"} />
          <label htmlFor="tag">
            tag
          </label>

          <input type="radio" id={"profile"} name={"source"} />
          <label htmlFor="profile">
            profile
          </label>
        </div>
        {
          formInfo["source"] ?
          <>
            <div className="form-control">
            <label htmlFor="sourceInfo" className={"label"}>
              {formInfo["source"]} name
            </label>
            <input type="text" name={"sourceInfo"} id={"sourceInfo"} className={"input-block"} />
            <span className={"tip"}>
              {
              formInfo.source === "profile" ?
                "The bot will post the amount of images you specify" :
                "The bot will continuously check for images in the tag and post them"
            }
            </span>
          </div>
            {
              formInfo.source === "profile" ?
                <div className={"form-control"}>
                  <label htmlFor="numberOfImages" className="label">
                    Number of images
                  </label>
                  <input type="number" name={"numberOfImages"} id={"numberOfImages"} defaultValue={200} className={"input-block"} />

                </div>
                : null
            }

            {
              formInfo.sourceInfo ?
                <>
                  <div className="form-control">
                    <label htmlFor="board" className="label">board</label>
                    <input type="text" id="board" className="input-block" name={"board"}/>
                    <span className="tip">Make sure the board is already created and is correctly capitalized</span>
                  </div>
                </>
        : null

            }
                {
                  formInfo.board ?
                    <>
                      <h4>Pin configuration</h4>
                      <div className="form-control">
                        <label htmlFor="link" className="label">link</label>
                        <input type="text" id="link" className="input-block" name={"link"} />
                      </div>

                      <div className="form-control">
                        <label htmlFor="delayMin" className={"label"}>delay minimum</label>
                        <input type="number" name={"delayMin"} defaultValue={2} id={"delayMin"} className={"input-block"}/>
                        <span className="tip">In minutes</span>
                      </div>

                      <div className="form-control">
                        <label htmlFor="delayMax" className={"label"} >delay maximum</label>
                        <input type="number" name={"delayMax"} defaultValue={5} id={"delayMax"} className={"input-block"}/>
                        <span className="tip">In minutes</span>
                      </div>
                    </>
                    : null
                }

                {
                  formInfo.board && formInfo.link ?
                    <button type={"submit"} className={"btn btn-main"}>Start the bot</button>
                    : null
                }

              </>
            : null
            }


      </form>
      {error ? <p className="error"><span>{error}</span></p> : null}
      </>
      : formInfo.auth ? <h4 className={"primary-color"}>Your bot is running</h4> : null
      }
    </section>
  )
}

export default Form