import React from "react";

const InstaEmbedCard = ({ id }) => {
  return (
    <div className="instagram-embed">
      <iframe
        src={`https://www.instagram.com/p/${id}/embed`}
        width="400"
        height="480"
        frameBorder="0"
        scrolling="no"
        allowTransparency="true"
      ></iframe>
    </div>
  );
};

export default InstaEmbedCard;
