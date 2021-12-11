import React from "react";
import { Link } from "gatsby";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Contact = () => (
  <div className="l-container">
    <p className="p-mw900 center">
      ただいまフォーム実装中です。
      <br />
      ご用のある方はお手数ですが、
      <Link
        to="https://twitter.com/LirioY"
        target="_blank"
        rel="noopener nofollow"
      >
        <FontAwesomeIcon icon={faTwitter} />
        LirioY
      </Link>
      までDMにてご連絡ください。
    </p>
  </div>
);

export default Contact;
