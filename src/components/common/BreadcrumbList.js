import * as React from "react";
import { Link } from "gatsby";
import { siteMetadata } from "../../../gatsby-config"

const BreadCrumbList = ({list}) => {
    const { shortName } = siteMetadata
    const { parents, current } = list
    const trimText = (text, maxLength) => {
        if (!text) {
            return '';
        }
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + '…';
    };
    return (
        <ol className="c-breadcrumb-list">
            <li>
                <Link to="/">{shortName}</Link>
            </li>
            {parents && parents.map(item => <li><Link to={item.path}>{item.name}</Link></li>)}
            <li>{trimText(current, 20)}</li>
        </ol>
    )
}
export default BreadCrumbList;
