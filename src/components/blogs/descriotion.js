import React from "react"

const description = ({ texts }) => (
  <div className="c-article__description">
    {(texts || []).map((text, index) => (
      <p key={`txt${index}`}>{text}</p>
    ))}
  </div>
)

export default description
