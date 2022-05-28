import React , { useEffect } from "react";

// packages
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FixedSizeList as List } from "react-window";

// redux
import { uiActions } from "../../features/ui/uiSlice";
import { dataActions } from "../../features/data/dataSlice";
// styles
import Styles from "./sybmolsList.module.scss";

// components
import Loader from "../../components/base/loader/loader";
import Card from "../../components/base/card/card";
import { GetInitialData } from "../../features/api/getInitialData";

// main component
const SymbolsList = () => {
    // redux
    const dispatch = useDispatch();

    let sybmolsList = useSelector((store: any) => store.dataStore.initialData.symbolsName);
    let trades = useSelector((store: any) => store.dataStore.initialData.trade);
    let loading = useSelector((store: any) => store.ui.loading);


    useEffect(() => {
        handleGetInitialData()
    }, []);

    // handlers 
    const handleGetInitialData = async () => {
        if(!(sybmolsList.length > 0 || trades.length > 0)) { // if data exist api will not be called
            dispatch(uiActions.setLoading(true));
            let initialData = await GetInitialData();

            dispatch(dataActions.setInitialData(initialData));
            dispatch(uiActions.setLoading(false));
        }
    };


// ====================handling virtual rendering models===================================\\ 
    const data = sybmolsList ? sybmolsList.map((symbol: any) => (({
        trade_symbol: symbol.trade_symbol,
        title: symbol.title,
        close_price:symbol.close_price,
        value: symbol.value,
        id: symbol.id,
    }))) : []

    // row to render in react-window component for virtual render
    const Row = ({ index, key, style }: any) => (
        <li className="row flex-start" key={data[index].id} style={style}>
            <div className={`col-2 ${Styles.ellipsis}`}><p><Link to={`Detail/${data[index].id}`}> {data[index].trade_symbol}</Link></p> </div>
            <div className={`col-6 col-md-4 ${Styles.ellipsis}`}><p>{data[index].title}</p> </div>
            <div className={`col-2 ${Styles.ellipsis}`}><p>{data[index].close_price}</p> </div>
            <div className={`col-2 ${Styles.ellipsis}`}><p>{data[index].value}</p> </div>
        </li>
    )
// ====================handling virtual rendering models===================================\\ 
    return (
        <React.Fragment>
            <div className={Styles.main} onClick={()=> dispatch(uiActions.setShowSearchBox(false))}>
                {loading && <Loader />}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className={Styles.tableHeader}>
                                <Card className="m-4 p-4">
                                    <li className={`row flex-start px-4`}>
                                        <div className={`col-2 ${Styles.ellipsis}`}><p>نماد</p></div>
                                        <div className={`col-6 col-md-4 ${Styles.ellipsis}`}><p>نام شرکت</p></div>
                                        <div className={`col-2 ${Styles.ellipsis}`}><p>آخرین قیمت</p></div>
                                        <div className={`col-2 ${Styles.ellipsis}`}><p>ارزش معاملات</p></div>
                                    </li>
                                </Card>
                            </div>
                            <Card className="m-4 p-4">
                                <div className={Styles.taskWraper}>
                                    <List
                                        width={"100%"}
                                        height={700}
                                        itemCount={data.length}
                                        itemSize={40}
                                        style={{ direction: "rtl", overflowX: "hidden" }}
                                    >
                                        {Row}
                                    </List>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SymbolsList;
