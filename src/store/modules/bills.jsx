import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice(
{
    name: "bill",
    initialState: {
        billsList: []
    },
    reducers: {
        setBillList(state, action)
        {
            state.billsList = action.payload;
        }
    }
})

const {setBillList} = billStore.actions;

const getBillsList = () =>
{
    return async (dispatch) =>
    {
        const response = await axios.get("http://localhost:8888/bills")
        if (response.status === 200 && response.data)
        {
            dispatch(setBillList(response.data));
        }
    }
}

export {
    getBillsList
}

const reducer = billStore.reducer

export default reducer;


