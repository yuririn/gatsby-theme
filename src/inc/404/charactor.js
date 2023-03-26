import React from "react"

const Charactors = ({scenario}) => {
  if(scenario === 0 || scenario === 1 || scenario === 3 || scenario === 4 || scenario === 8 ||scenario === 9  ||scenario === 10 ) {

    return <>
      {scenario === 7  ||scenario === 9 && <h2 className="header">GAME OVER</h2>}
      <span className='camille'></span>
    </>
  } else if(scenario === 2 || scenario === 5|| scenario === 6) {
    return <span className='iruka'><span></span></span>
  } else if(scenario === 7) {
   return <>
        <div className="irukaDive__wrapper">
        <span className="irukaDive"><span></span></span>
        </div>
        <div className="splash"></div>
    </>
  }
}
export default Charactors
