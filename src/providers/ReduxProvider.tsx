'use client'

import {ReactNode} from "react";
import {Provider} from "react-redux";
import {store, persistor} from "@/store";
import {PersistGate} from "redux-persist/integration/react";

export const ReduxProvider = ({children} : {children : ReactNode}) => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                {children}
            </PersistGate>

        </Provider>
    )
}