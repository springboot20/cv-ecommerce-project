import { createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../../types';

type InitialState = {
  data: ProductType | undefined;
};

const initialState: InitialState = {
  data: undefined,
};

const ProductSliceReducer = createSlice({
  name: 'product',
  initialState,
  reducers: {},
});

export default ProductSliceReducer.reducer;
