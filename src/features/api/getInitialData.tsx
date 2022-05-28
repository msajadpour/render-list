
import { handlePriceSeprator } from "../heplers/handlePriceSeprator";
import { getApiResult } from "./services";



const handleModelsFields = (symbolsList: [], tradesList: []) => {
    let filteredSymbolsList = symbolsList.map((symbol: any) => ({
        id: symbol.id,
        title: symbol.value.title,
        trade_symbol: symbol.value.trade_symbol,
    }));
    let filteredTradesList = tradesList.map((symbol: any) => ({
        close_price: handlePriceSeprator(symbol.value.close_price),
        value: handlePriceSeprator(symbol.value.value),
    }));
    for (let i = 0; i < symbolsList.length; i++) {
        filteredSymbolsList[i] = {
            ...filteredSymbolsList[i],
            ...filteredTradesList[i],
        };
    }
    return filteredSymbolsList;
};

export const GetInitialData = async () => {
    let symbolsName = await getApiResult("assets");
    let trade = await getApiResult("trades");
    let bidasks = await getApiResult("bidasks")
    let filteredSymbolList = handleModelsFields(symbolsName, trade); // optimize data model to render jsx

    let initialData = {bidasks , trade , symbolsName:filteredSymbolList}
    return initialData
};
