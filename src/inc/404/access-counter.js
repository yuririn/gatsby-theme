import React, {useEffect, useState } from "react"

const AccessCounter = () => {
  const [accessStr, setAccessStr] = useState([]);

  useEffect(() => {
    fetch(
    'https://script.google.com/macros/s/AKfycbw0WvlsV9YU7Al7mafeARTO6_ZQbCRrug1T7KtX09bpZB3myXW8iuNdBNdEwcjcMTvW/exec')
    .then((response) => {
      return response.json();
    })
    .then((json) => {
        setAccessStr(
          Array.from(String(json.your_access).padStart(8, '0'))
        );
        return json;
      })
      .catch((_) => {
        setAccessStr([]);
      });
    },[])

    const roop = () => {
      for (let i = 0; i < 8; i++) {
        <li>{ i }</li>
      }
    };

    return <p className="accessCounter__wrapper">あなたは<span className="accessCounter">{accessStr.length !== 0 && accessStr.map((i,num)=> <span key={`access${num}`}>{i}</span>)}</span>人目の迷い子です。</p>
}
export default AccessCounter
