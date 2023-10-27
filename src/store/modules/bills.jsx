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
        },
        addBill(state, action)
        {
            state.billsList.push(action.payload);
        }
    }
})

const {setBillList, addBill} = billStore.actions;

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

const sendBillData = (data) => 
{
    return async (dispatch) =>
    {
        const response = await axios.post("http://localhost:8888/bills", data)
        dispatch(addBill(data))
    }
}



export {
    getBillsList,
    sendBillData
}

const reducer = billStore.reducer

export default reducer;


