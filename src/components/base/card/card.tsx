import * as React from "react";
//styles
import Styles from "./card.module.scss";
interface Props {
    children: JSX.Element | JSX.Element[];
    className?: string;
}
const Card: React.FC<Props> = ({ children, className }) => {
    return <div className={`${className} ${Styles.card}`}>{children}</div>;
};
export default Card;
