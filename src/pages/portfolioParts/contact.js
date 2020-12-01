import React from 'react';
import { Link } from "gatsby"
// import ContactStyles from "./css/faq.module.css"
import CommonStyles from "./css/common.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Contact = () => (

	<section className={CommonStyles.myMd}>
		<header className={CommonStyles.headingLg}>
			<h2>Contact</h2>
		</header>
		<div className={CommonStyles.myMd} class="l-container">
			<p className={CommonStyles.center}>ただいまフォーム実装中です。<br />ご用のある方はお手数ですが、<Link to="https://twitter.com/LirioY" target="_blank" rel="noopener nofollow"><FontAwesomeIcon icon={faTwitter} />LirioY</Link>までDMにてご連絡ください。</p>
		</div>
	</section>
);

export default Contact;
