import * as React from 'react';
//styles
import Styles from "./noData.module.scss"

const NoData = () => {
    return(
       <div className={`${Styles.parent}`}>
           <div>
               <p>اطلاعات این بخش در دسترس نمیباشد</p>
           </div>
       </div>
    )
}
export default NoData;