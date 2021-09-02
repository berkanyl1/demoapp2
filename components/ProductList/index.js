import React, {useEffect, useState, useContext} from "react";
import createApp from "@shopify/app-bridge";
import {getSessionToken} from "@shopify/app-bridge-utils";
import GlobalContext from "../../context";




function ProductList() {
    const [productList, setProductList] = useState([]);
    const { GENERAL_CONTEXT } = useContext(GlobalContext);


    useEffect(() => {
       /*
        const app = createApp({
            apiKey: GENERAL_CONTEXT.API_KEY,
            host: GENERAL_CONTEXT.CONVERTED_HOST_NAME
        })

        getSessionToken(app).then(res => {
            console.log(res);
        })
        */
    }, [])


    return (
        <div>asd</div>
    );
}





export default ProductList;

