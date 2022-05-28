import  React , { useEffect , useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// components 
import Card from '../../components/base/card/card';
import Loader from '../../components/base/loader/loader';
import NoData from '../../components/base/noData/noData';
import Navigator from '../../components/navigator/navigator';

// redux 
import { dataActions } from '../../features/data/dataSlice';
import { uiActions } from '../../features/ui/uiSlice';

// api
import { GetInitialData } from '../../features/api/getInitialData';

// styles 
import Styles from "./sybmolDetail.module.scss"

const SymbolDetail: React.FC = () => {
    const dispatch = useDispatch()
    const params: any = useParams();

    const[currentTrades , setCurrentTrades] = useState<any>([])
    const[currentBidasks , setCurrentBidasks] = useState([])
    const[currentSymbolName , setCurrentSymbolName] = useState<any>({})
    let initialData = useSelector((store: any) => store.dataStore.initialData);
    let loading = useSelector((store: any) => store.ui.loading);


    useEffect(() => {
        handleGetInitialData()
    }, [params.id ])


    // handlers 
    const handleGetInitialData = async () => {
        if (!(initialData.bidasks.length > 0 || initialData.trade.length > 0 || initialData.symbolsName.length > 0)) { // if data exist api will not be called
            dispatch(uiActions.setLoading(true));
             initialData = await GetInitialData();

            dispatch(dataActions.setInitialData(initialData));
            dispatch(uiActions.setLoading(false));
        }
        handleCurrentSymbolData()
    };
    const handleCurrentSymbolData = () => {
        const id = params.id
        setCurrentTrades(initialData.trade.filter((symbol:any) => symbol.id === id))
        setCurrentBidasks(initialData.bidasks.filter((symbol:any) => symbol.id === id))
        setCurrentSymbolName(initialData.symbolsName.filter((symbol:any) => symbol.id === id)[0])
    }
    
    return (
        <div className={Styles.main} onClick={()=> dispatch(uiActions.setShowSearchBox(false))}>
            {loading && <Loader/>}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <Navigator symbol={`${currentSymbolName ? currentSymbolName.trade_symbol : "ناموجود"}`} />
                    </div>
                </div>
                <div className="row ">
                    <div className="col-12">
                        <div className={Styles.symbolTitle}>
                            <Card className="m-4 p-4">
                                <li className={`d-flex align-items-center`}>
                                    <div className={`pe-4 ${Styles.symbol}`}><a>{`${ currentSymbolName ? currentSymbolName.trade_symbol : "ناموجود"}`}</a></div>
                                    <div className={`${Styles.symbol}`}><span>{`${ currentSymbolName ? currentSymbolName.value : "ناموجود"}`}</span></div>
                                </li>
                                <li className={`row`}>
                                    <div className={`col ${Styles.subSymbol}`}><p>{`${currentSymbolName ? currentSymbolName.title : "ناموجود"}`}</p></div>
                                </li>
                            </Card>
                        </div>
                    </div>
                    <div className={`col-12 ${Styles.symbolInformation}`}>
                        <div className="row mx-2">
                            <div className="col-12 col-md-6">
                                <div className={Styles.sumbolTrade}>
                                    <Card className="mx-2 px-4 py-2">
                                        <li className={`d-flex align-items-center justify-content-between`}>
                                            <div className="border-0 fw-bolder"><p>اطلاعات معامله</p></div>
                                        </li>
                                    </Card>
                                    <Card className="m-2 p-4">
                                        <NoData />
                                        <li className={`d-flex align-items-center justify-content-between`}>
                                            <div><p>پایانی:</p></div>
                                            <div><p>13,5000</p></div>
                                        </li>
                                        <li className={`d-flex align-items-center justify-content-between`}>
                                            <div><p>بیشترین:</p></div>
                                            <div><p>13,5000</p></div>
                                        </li>
                                        <li className={`d-flex align-items-center justify-content-between`}>
                                            <div><p>کمترین:</p></div>
                                            <div><p>13,5000</p></div>
                                        </li>
                                        <li className={`d-flex align-items-center justify-content-between`}>
                                            <div><p>اولین:</p></div>
                                            <div><p>13,5000</p></div>
                                        </li>
                                        <li className={`d-flex align-items-center justify-content-between`}>
                                            <div><p>آخرین:</p></div>
                                            <div><p>13,5000</p></div>
                                        </li>
                                        <li className={`d-flex align-items-center justify-content-between`}>
                                            <div><p>حجم:</p></div>
                                            <div><p>13,5000</p></div>
                                        </li>
                                    </Card>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mt-5 mt-md-0">
                                <div className={Styles.sumbolDemand}>
                                    <Card className="mx-2 px-4 py-2">
                                        <li className={`d-flex align-items-center justify-content-between`}>
                                            <div className={`border-0 fw-bolder ${Styles.symbol}`}><p>عرضه تقاضا</p></div>
                                        </li>
                                    </Card>
                                    <Card className="m-2 p-4">
                                    <NoData />
                                        <li className={`d-flex align-items-center justify-content-between`}>
                                            <div className={`col-2 fw-bold`}><p>دستور</p></div>
                                            <div className={`col-2 fw-bold`}><p>تعداد</p></div>
                                            <div className={`col-2 fw-bold`}><p>خرید</p></div>
                                            <div className={`col-2 fw-bold`}><p>فروش</p></div>
                                            <div className={`col-2 fw-bold`}><p>تعداد</p></div>
                                            <div className={`col-2 fw-bold`}><p>دستور</p></div>
                                        </li>
                                        <li className={`d-flex align-items-center justify-content-between`}>
                                            <div className={`col-2 ${Styles.buy}`}><p>1</p></div>
                                            <div className={`col-2 ${Styles.buy}`}><p>13,5000</p></div>
                                            <div className={`col-2 ${Styles.buy}`}><p>13,5000</p></div>
                                            <div className={`col-2 ${Styles.sell}`}><p>13,5000</p></div>
                                            <div className={`col-2 ${Styles.sell}`}><p>13,5000</p></div>
                                            <div className={`col-2 ${Styles.sell}`}><p>13,5000</p></div>
                                        </li>
                                        <li className={`d-flex align-items-center justify-content-between`}>
                                            <div className={`col-2 ${Styles.buy}`}><p>1</p></div>
                                            <div className={`col-2 ${Styles.buy}`}><p>13,5000</p></div>
                                            <div className={`col-2 ${Styles.buy}`}><p>13,5000</p></div>
                                            <div className={`col-2 ${Styles.sell}`}><p>13,5000</p></div>
                                            <div className={`col-2 ${Styles.sell}`}><p>13,5000</p></div>
                                            <div className={`col-2 ${Styles.sell}`}><p>13,5000</p></div>
                                        </li>
                                        <li className={`d-flex align-items-center justify-content-between`}>
                                            <div className={`col-2 ${Styles.buy}`}><p>1</p></div>
                                            <div className={`col-2 ${Styles.buy}`}><p>13,5000</p></div>
                                            <div className={`col-2 ${Styles.buy}`}><p>13,5000</p></div>
                                            <div className={`col-2 ${Styles.sell}`}><p>13,5000</p></div>
                                            <div className={`col-2 ${Styles.sell}`}><p>13,5000</p></div>
                                            <div className={`col-2 ${Styles.sell}`}><p>13,5000</p></div>
                                        </li>
                                        <li className={`d-flex align-items-center justify-content-between`}>
                                            <div className={`col-2 ${Styles.buy}`}><p>1</p></div>
                                            <div className={`col-2 ${Styles.buy}`}><p>13,5000</p></div>
                                            <div className={`col-2 ${Styles.buy}`}><p>13,5000</p></div>
                                            <div className={`col-2 ${Styles.sell}`}><p>13,5000</p></div>
                                            <div className={`col-2 ${Styles.sell}`}><p>13,5000</p></div>
                                            <div className={`col-2 ${Styles.sell}`}><p>13,5000</p></div>
                                        </li>
                                        <li className={`d-flex align-items-center justify-content-between`}>
                                            <div className={`col-2 ${Styles.buy}`}><p>1</p></div>
                                            <div className={`col-2 ${Styles.buy}`}><p>13,5000</p></div>
                                            <div className={`col-2 ${Styles.buy}`}><p>13,5000</p></div>
                                            <div className={`col-2 ${Styles.sell}`}><p>13,5000</p></div>
                                            <div className={`col-2 ${Styles.sell}`}><p>13,5000</p></div>
                                            <div className={`col-2 ${Styles.sell}`}><p>13,5000</p></div>
                                        </li>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SymbolDetail