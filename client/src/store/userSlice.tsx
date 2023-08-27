import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    step1Data: {}, 
    step2Data: {
      location: null,
      selectedFiles: [],
    },    step3Data: {}, 
  },
  reducers: {
    setStep1Data: (state, action) => {
      state.step1Data = action.payload;
    },
    setStep2Data: (state, action) => {
      state.step2Data = action.payload;
    },
    setStep3Data: (state, action) => {
      state.step3Data = action.payload;
    },
  },
});

export const { setStep1Data, setStep2Data, setStep3Data } = formSlice.actions;

export default formSlice.reducer;
