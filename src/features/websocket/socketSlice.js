import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: [],
  status: "idle",
  error: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    Updated(state, action) {
      const { s } = action.payload;
      const existing = state.socket.find((item) => item.s === s);
      if (existing) {
        existing.s = action.payload.s;
        existing.lc = action.payload.lc;
        existing.a = action.payload.a;
        existing.b = action.payload.b;
        existing.h = action.payload.h;
        existing.l = action.payload.l;
        existing.ch = action.payload.ch;
        existing.cp = action.payload.cp;
        existing.v = action.payload.v;
        existing.t = action.payload.t;
      } else {
        state.socket.push(action.payload);
      }
    },
  },
});

export const { Updated } = socketSlice.actions;

export default socketSlice.reducer;

export const selectAllSocketBy = (state) => state.socket.socket;

//export the list by name of the currency
export const selectForexTable = (state) => {
  var find = state.socket.socket.filter(function (result) {
    return result.s === "EUR/USD" || result.s === "XAU/USD";
  });

  if (find.length > 0) {
    return find;
  } else return [];
};

export const selectExchange1Table = (state) => {
  var find = state.socket.socket.filter(function (result) {
    return result.s === "LTC/USD" || result.s === "XRP/USD";
  });

  if (find.length > 0) {
    return find;
  } else return [];
};

export const selectExchange2Table = (state) => {
  var find = state.socket.socket.filter(function (result) {
    return result.s === "LTC" || result.s === "XRP";
  });

  if (find.length > 0) {
    return find;
  } else return [];
};
