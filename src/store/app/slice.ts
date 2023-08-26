import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadData } from './thunks';

export interface AppState {
  isDataLoaded: boolean;
  elements: Array<string>;
  selectedElements: Array<number>;
}

export const initialState: AppState = {
  isDataLoaded: false,
  elements: [],
  selectedElements: []
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setDataLoaded(state, action: PayloadAction<boolean>): void {
      state.isDataLoaded = action.payload;
    },
    setSelected(state, action: PayloadAction<number>): void {
      state.selectedElements = [...state.selectedElements, action.payload];
    },
    removeSelection(state, action: PayloadAction<number>): void {
      state.selectedElements = state.selectedElements.filter(
        (item) => item !== action.payload
      );
    }
  },
  extraReducers(builder) {
    builder.addCase(
      loadData.fulfilled,
      (state, action: PayloadAction<Array<string>>) => {
        state.isDataLoaded = true;
        state.elements = action.payload;
      }
    );
  }
});

export const { setDataLoaded, setSelected, removeSelection } = appSlice.actions;

export const appReducer = appSlice.reducer;
