import React, { useEffect } from 'react';

const Ad = ({type='display'}) => {
  // useEffect(() => {
  //   let lazyloadads = false;
  //   if (!window && lazyloadads === false) { return }
  //   window.addEventListener("scroll", function() {
  //     window.adsbygoogle = window.adsbygoogle || [];
  //     window.adsbygoogle.push({});
  //   })
  //   lazyloadads = true;
  // });

  // const ads = {
  //   infeed: {slot: '8004199632',format: 'fruid', style: {display:`block`}, key:"-fb+5w+4e-db+86"},
  //   display: {slot: '3932490041',format: 'auto', style: {display:`block`}, responsive:"true"},
  //   multi: {slot: '4479284954',format: 'autorelaxed', style: {display:`block`}},
  //   article: {slot: '2374786676',format: 'fruid',layout: 'in-article', style: {display:`block`, textAlign:`center`}},
  // }
  // const ad = ads[type]

  return (
    <div className={`ads ${type}`}>
      ここに広告が入ります
      {/* <ins className={`adsbygoogle`}
        style={ad.style ? ad.style : ``}
      data-ad-client="ca-pub-2820767970621854"
      data-ad-format={ad.format}
      data-ad-layout={ad.layout ? ad.layout : ``}
      data-ad-layout-key={ad.key ? ad.key : ``}
      data-full-width-responsive={ad.responsive ? ad.responsive : ``}
      data-ad-slot={ad.slot}></ins> */}
    </div>
  );
}
export default Ad;