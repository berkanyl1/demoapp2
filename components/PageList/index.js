import React, {useContext, useEffect, useState} from "react";
import axios from 'axios';
import GlobalContext from "../../context";
import {ADMIN_API, PAGES} from "../../constants/endpoints";
import {REQUEST_METHODS} from "../../constants/methodTypes";
import {SLASH} from "../../constants/characters";
import AxiosHandler from "../../server/AxiosHandler";


function PageList() {

    //context
    const { GENERAL_CONTEXT } = useContext(GlobalContext);

    //state
    const [pageList, setPageList] = useState([]);


    useEffect(() => {

        AxiosHandler({
            url: 'api/get/page/list',
            method: REQUEST_METHODS.GET,
            apiKey: GENERAL_CONTEXT.API_KEY,
            host: GENERAL_CONTEXT.CONVERTED_HOST_NAME
        }).then(res => {
            if(res.status === 200) {
                setPageList(res.data.data.pages)
            }

        })

        AxiosHandler({
            url: 'api/get/theme/list',
            method: REQUEST_METHODS.GET,
            apiKey: GENERAL_CONTEXT.API_KEY,
            host: GENERAL_CONTEXT.CONVERTED_HOST_NAME
        }).then(res => {
            if(res.status === 200) {
                let themeId;
                const theme = res.data.data.themes;
                if(theme.length > 1) {
                    const mainTheme = theme.find(e => e.role === 'main');
                    if(mainTheme) {
                        themeId = mainTheme.id;
                    } else {
                        themeId = theme[0].id;
                    }
                } else {
                    themeId = theme[0].id
                }

                AxiosHandler({
                    url: `api/get/${themeId}/assets`,
                    method: REQUEST_METHODS.GET,
                    apiKey: GENERAL_CONTEXT.API_KEY,
                    host: GENERAL_CONTEXT.CONVERTED_HOST_NAME,
                    params: {
                        assetKey: 'layout/theme.liquid',
                        themeId: themeId
                    }

                }).then(r1 => {
                    console.log(r1.data)
                })
            }
        })

    }, [])


    return(
        <div>
            {
                pageList.length > 0 ? pageList.map((item, i) => {
                    return(
                        <React.Fragment>
                            <p key={`title-${i}`}>{item.title}</p>
                            <p key={`url-${i}`}>
                                <a href={GENERAL_CONTEXT.BASE_URL + SLASH +"pages/" + item.handle} target={"_blank"}>
                                    {GENERAL_CONTEXT.BASE_URL + SLASH + item.handle}
                                </a>
                            </p>
                        </React.Fragment>
                    )
                }) : null
            }
        </div>
    );

}

export default PageList;
