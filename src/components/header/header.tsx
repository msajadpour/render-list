import * as React from 'react';
import { useState , useRef} from 'react';
import {  useHistory } from 'react-router-dom';
import { FixedSizeList as List } from "react-window";
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../features/ui/uiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// styles 
import Styles from "./header.module.scss"


const Header: React.FC = () => {
    const [resultsData, setResultsData] = useState<any>([])
    let symbolsName = useSelector((store: any) => store.dataStore.initialData.symbolsName);
    let showSearchBox = useSelector((store: any) => store.ui.showSearchBox);
    
    const dispatch = useDispatch()
    const history = useHistory()
    
// handlers
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value
        let filteredSymbols = symbolsName.filter((symbol: any) => (symbol.title.includes(value) || (symbol.trade_symbol != undefined ? symbol.trade_symbol.includes(value) : false)))
        if(filteredSymbols.length > 0){
            dispatch(uiActions.setShowSearchBox(true))
        }
        setResultsData(filteredSymbols)
    }
    const handleRedirect = (id:number) => {
        history.replace(`/Detail/${id}`)
        dispatch(uiActions.setShowSearchBox(false))
    }

    // ====================handling virtual rendering models===================================\\ 
    const data = resultsData.length > 1 ? resultsData.map((symbol: any) => (({
        trade_symbol: symbol.trade_symbol,
        title: symbol.title,
        close_price: symbol.close_price,
        value: symbol.value,
        id: symbol.id,
    }))) : []

    const Row = ({ index, key, style }: any) => (
        <div className={`p-2 ${Styles.row}`} key={data[index].id} style={style} onClick={() => handleRedirect(data[index].id)}>
            <p > {data[index].trade_symbol}</p>
            <p >{data[index].title}</p>
        </div>
    )
    // ====================handling virtual rendering models===================================\\ 
 
    return (
        <div className={Styles.Header}>
            <div className={Styles.inner}>
                <div className={`col-3 col-md-1 ${Styles.title}`}>
                    <p>لیست دارایی ها</p>
                </div>
                <div className={`col ${Styles.search}`}>
                    <FontAwesomeIcon icon={faSearch} />
                    <input onChange={handleSearch} type="text" placeholder="جستجوی نام نماد ، نام شرکت" />
                    {showSearchBox && (
                        <div className={Styles.result}  >
                            <div className={Styles.Inner}>
                                <div className={Styles.ScrollHidden}>
                                    {
                                        (resultsData.length > 1) ? (
                                            <List
                                                width={"100%"}
                                                height={500}
                                                itemCount={data.length}
                                                itemSize={60}
                                                style={{ direction: "rtl", overflowX: "hidden" }}
                                            >
                                                {Row}
                                            </List>
                                        ) :
                                        <p className='text-center p-4'>موردی یافت نشد</p>
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}
export default Header;