import Button from "@/components/Button/Button";
import React from "react";

const Root = () => {
  return (
    <>
      <h1>Your search for the next dream job is over 🚀</h1>
      <div>
      <Button name="Start Searching" size="lg" />
      </div>
      <br />
      <div>
        <input type="text"  placeholder="Search for a job" className="input-area" />
        <br />
        <textarea  placeholder="Search for a job" className="input-area" />
      </div>
      <img src="./assets/root-logos.png" alt="root logos" />
    </>
  );
};

export default Root;
