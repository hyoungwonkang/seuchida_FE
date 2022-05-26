import React from "react";
import "../shared/MobileFrame.css";

const MobileFrame = ({ children }) => {
  return (
    <div className="WebFullFrame">
      <div className="MobileFullFrame">
        <div id="scroll" className="Container">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MobileFrame;
