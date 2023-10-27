import { configureStore } from "@reduxjs/toolkit";
import billReducer from "./modules/bills";

const store = configureStore({
    reducer: {
        bill: billReducer
    }
});

export {
    store
}