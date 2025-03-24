import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LayoutState {
  view: 'store' | 'admin';
}

const initialState: LayoutState = {
  view: 'store'
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<'store' | 'admin'>) => {
      state.view = action.payload;
    }
  }
});

export const { setView } = layoutSlice.actions;
export default layoutSlice.reducer;