import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Order {
  orderId: string;
  start: {
    latitude: number;
    longitude: number;
  };
  end: {
    latitude: number;
    longitude: number;
  };
  price: number;
}

interface InitialState {
  orders: Order[];
  deliveries: Order[];
}

const initialState: InitialState = {
  orders: [], //서버에서 오는 오더 목록
  deliveries: [], //오더 중 수락한 목록
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    acceptOrder(state, action: PayloadAction<string>) {
      //orders에서 선택한 오더를 deliveries로
      const index = state.orders.findIndex(v => v.orderId === action.payload);
      if (index > -1) {
        //orders에 주문이 존재하면
        state.deliveries.push(state.orders[index]); //deliveries로 넣어줌
        state.orders.splice(index, 1); //orders에서는 삭제
        //splice(start: number, deleteCount?: number | undefined)
      }
    },
    rejectOrder(state, action) {
      // 거절하는 주문
      const index = state.orders.findIndex(v => v.orderId === action.payload);
      if (index > -1) {
        state.orders.splice(index, 1); //orders에서는 삭제
      }
      const delivery = state.deliveries.findIndex(
        v => v.orderId === action.payload,
      );
      if (delivery > -1) {
        state.deliveries.splice(index, 1); //orders에서는 삭제
      }
    },
  },
  extraReducers(_builder) {},
});

export default orderSlice;
