import React from 'react';
import AdSense from 'react-adsense';

const Adsense = () => (
	<div>
		<AdSense.Google
			client='process.env.GOOGLE_ADSENSE_ID'
			slot='2374786676'
			style={{ display: 'block' }}
			layoutKey='in-article'
			format='fluid'
		/>
	</div>
);

export default Adsense;
