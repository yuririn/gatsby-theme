import React from "react";

const Date = ({date, modifiedDate}) =>{
    return (<dl className="c-article__date">
        <dt>公開日</dt>
        <dd>
            <time date={date.replace(/\./g, "-")}>
                {date}
            </time>
        </dd>
        {modifiedDate ? <dt>メンテナンス日</dt> : ""}
        {modifiedDate ? (
            <dd>
                <time
                    date={modifiedDate.replace(/\./g, "-")}
                >
                    {modifiedDate}
                </time>
            </dd>
        ) : (
            ""
        )}
    </dl>)
}
export default Date
