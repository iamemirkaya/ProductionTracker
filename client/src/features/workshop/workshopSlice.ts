
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'; 

interface WorkshopState {
  searchTerm: string; 
}

const initialState: WorkshopState = {
  searchTerm: '', 
};

export const workshopSlice = createSlice({
  name: 'workshop',
  initialState, 
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload; 
    },
  },
});

export const { setSearchTerm } = workshopSlice.actions;
export default workshopSlice.reducer;