import { createSlice } from "@reduxjs/toolkit";



const ClientsSlice = createSlice({
  name: "clients",
  initialState: [] as Interface_Client_Slice[],
  reducers: {
     fetch_client: (_, action) => {
      return action.payload;
     },
    delet: (state, action) => {
      const id = action.payload;
      const new_state = state.filter((item) => item.id !== id);
    
      return new_state
    },
  

  },

});

export default ClientsSlice.reducer;
export const { delet } = ClientsSlice.actions;
export const {fetch_client} = ClientsSlice.actions;
