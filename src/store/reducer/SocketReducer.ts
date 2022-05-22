import { createSlice } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

interface IInitState {
  socket: Socket;
}

const initialState = {
  socket: null
};
const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket(state, action) {
      state = action.payload;
    }
  },
  extraReducers: {}
});

const { setSocket } = socketSlice.actions;

export default socketSlice.reducer;
