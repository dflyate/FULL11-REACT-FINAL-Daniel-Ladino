import { createSlice } from "@reduxjs/toolkit";

const pedidoComponentSlice = createSlice({
    name: 'pedidoComponentSlice',
    initialState: {
        step: 1,
        pedidoData: {
            productos: [],
            cliente : null,
        }        
    },
    reducers : {
        setStepPedidoComponentAction : (state, action) => {
            return {
                ...state,
                step: action.payload
            }
        },
        setPedidoStepAction : (state, action) => {            
            return {
                ...state,
                pedidoData: {...state.pedidoData, ...action.payload}
            }
        }
    }
});

export const {setStepPedidoComponentAction,setPedidoStepAction} = pedidoComponentSlice.actions;

export default pedidoComponentSlice.reducer;