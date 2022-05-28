import * as React from 'react';
import { Link } from 'react-router-dom';

// styles 
import Styles from "./navigator.module.scss" 

interface Props {
    symbol: string;
}
const Navigator:React.FC<Props> = ({symbol}) => {
    return(
        <ul className={`px-5 pt-4 ${Styles.ul}`}>
            <li><Link className={Styles.link} to="/">لیست نمادها</Link></li>
            <li className="px-2">/</li>
            <li ><a className={Styles.link}>{symbol}</a></li>
        </ul>
    )
}
export default Navigator