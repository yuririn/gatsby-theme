import React from "react";

const description = ({ texts }) => (
  <div className="c-article__description">
    {(texts || []).map((text) => (
      <p>{text}</p>
    ))}
  </div>
);

export default description;
