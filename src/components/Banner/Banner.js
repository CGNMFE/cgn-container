import React from "react";

function Banner() {
  return (
          <div style={{ width: "50vw", height: "100vh", boxShadow: '6px 0px 8px -6px black' }}>
      <img
        src="https://i.imgur.com/pM2CECH.png"
        alt="CGN"
        style={{
          width: "50vw",
          height: "100%",
          // borderTopRightRadius: "75px",
          // borderBottomRightRadius: "75px"
        }}
      />
    </div>
  );
}

export default Banner;
