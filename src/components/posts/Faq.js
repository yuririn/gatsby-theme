import React from "react";
const Faq = ({data}) =>{
    if( data.length === 0 ) return '';
    return (
        <section>
            <h2 className="c-heading--faq">FAQ</h2>
                {data.map((item, index) => {
                    return (
                        <dl className="c-faq" key={`faq${index}`}>
                        
                        <dt>{item[0]}</dt>
                        <dd>{item[1]}</dd>
                        
                        </dl>
                    )
                    })
                    }
                    
        </section>
    )
}

export default Faq
