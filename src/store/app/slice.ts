import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadData } from './thunks';

export interface AppState {
  isDataLoaded: boolean;
  elements: Array<string>;
  selectedElements: Array<number>;
  previousSelected: number | null;
}

export const initialState: AppState = {
  isDataLoaded: false,
  elements: [],
  selectedElements: [],
  previousSelected: null
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
      state.previousSelected = action.payload;
    },
    setMultiSelected(state, action: PayloadAction<Array<number>>): void {
      state.selectedElements = [...state.selectedElements, ...action.payload];
      state.previousSelected = state.selectedElements[state.selectedElements.length - 1] || null;
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

export const { setDataLoaded, setSelected, setMultiSelected, removeSelection } = appSlice.actions;

export const appReducer = appSlice.reducer;
