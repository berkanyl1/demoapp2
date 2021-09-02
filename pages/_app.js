import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import App from "next/app";
import { AppProvider } from "@shopify/polaris";
import { Provider, useAppBridge } from "@shopify/app-bridge-react";
import {authenticatedFetch, getSessionToken} from "@shopify/app-bridge-utils";
import { Redirect } from "@shopify/app-bridge/actions";
import "@shopify/polaris/dist/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import GlobalContext from "../context";
import createApp from "@shopify/app-bridge";

function userLoggedInFetch(app) {
    const fetchFunction = authenticatedFetch(app);

    return async (uri, options) => {
        const response = await fetchFunction(uri, options);

        if (
            response.headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1"
        ) {
            const authUrlHeader = response.headers.get(
                "X-Shopify-API-Request-Failure-Reauthorize-Url"
            );

            const redirect = Redirect.create(app);
            redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
            return null;
        }

        return response;
    };
}

function MyProvider(props) {
    const app = useAppBridge();

    const client = new ApolloClient({
        fetch: userLoggedInFetch(app),
        fetchOptions: {
            credentials: "include",
        },
    });

    const Component = props.Component;

    return (
        <ApolloProvider client={client}>
            <Component {...props} />
        </ApolloProvider>
    );
}



class MyApp extends App {


    render() {
        const { Component, pageProps, host, data } = this.props;
        let GENERAL_CONTEXT;
        GENERAL_CONTEXT = data



        return (
            <AppProvider i18n={translations}>
                <Provider
                    config={{
                        apiKey: API_KEY,
                        host: host,
                        forceRedirect: true,
                    }}
                >
                    <GlobalContext.Provider value={{GENERAL_CONTEXT}}>
                        <MyProvider Component={Component} {...pageProps} />
                    </GlobalContext.Provider>
                </Provider>
            </AppProvider>
        );
    }
}

MyApp.getInitialProps = async ({ ctx }) => {

    let GENERAL_CONTEXT;
    GENERAL_CONTEXT = await ctx.res.getHeader("GENERAL_CONTEXT")
    if(GENERAL_CONTEXT) {
        GENERAL_CONTEXT = JSON.parse(GENERAL_CONTEXT)
    }


    return {
        host: ctx.query.host,
        data: GENERAL_CONTEXT
    };
};

export default MyApp;
