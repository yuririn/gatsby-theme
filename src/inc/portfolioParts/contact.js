import React from "react"
import { Link } from "gatsby"

const Contact = () => (
  <div className="l-container">
    <p className="p-mw900 center">
      フォームを実装する気はさらさらないので
      <br />
      ご用のある方はお手数ですが、
      <Link
        to="https://twitter.com/LirioY"
        target="_blank"
        rel="noopener nofollow"
        style={{
          color: "rgb(233, 80, 20)",
        }}
      >
        <svg
          width="18"
          height="18"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 300 300"
          role="img"
          fill="currentColor"
        >
          <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z"></path>
        </svg>
        @LirioY
      </Link>
      までDMにてご連絡ください。
    </p>
  </div>
)

export default Contact
