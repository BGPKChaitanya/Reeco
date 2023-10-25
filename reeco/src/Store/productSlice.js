import { createSlice } from "@reduxjs/toolkit";
import { orderDetails } from "../components/Assets/data";

const initialState = {
  product: orderDetails,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    ApproveStatus: (state, action) => {
      const productIndex = state.product.findIndex(
        (p) => p.id === action.payload
      );
      const updatedProducts = [...state.product];
      updatedProducts[productIndex].status = 1;
      updatedProducts[productIndex]["statusColor"] = "#219675";
      updatedProducts[productIndex]["statusText"] = "Approved";
      state.product = updatedProducts;
    },
    MissingStatus: (state, action) => {
      const productIndex = state.product.findIndex(
        (p) => p.id === action.payload
      );
      const updatedProducts = [...state.product];
      updatedProducts[productIndex].status = 2;
      updatedProducts[productIndex]["statusColor"] = "#a65421";
      updatedProducts[productIndex]["statusText"] = "Missing";
      state.product = updatedProducts;
    },
    MissingUrgentStatus: (state, action) => {
      const productIndex = state.product.findIndex(
        (p) => p.id === action.payload
      );
      const updatedProducts = [...state.product];
      updatedProducts[productIndex].status = 3;
      updatedProducts[productIndex]["statusColor"] = "#c4352b";
      updatedProducts[productIndex]["statusText"] = "Missing-Urgent";
      state.product = updatedProducts;
    },
    PriceChangeStatus: (state, action) => {
      const productIndex = state.product.findIndex(
        (p) => p.id === action.payload.id
      );
      const updatedProducts = [...state.product];
      updatedProducts[productIndex].status = 4;
      updatedProducts[productIndex].price = action.payload.price;
      updatedProducts[productIndex].quantity = action.payload.quantity;
      updatedProducts[productIndex]["statusColor"] = "#219675";
      updatedProducts[productIndex]["statusText"] = "Price updated";
      state.product = updatedProducts;
    },
    QuantityChangeStatus: (state, action) => {
      const productIndex = state.product.findIndex(
        (p) => p.id === action.payload.id
      );
      const updatedProducts = [...state.product];
      updatedProducts[productIndex].status = 5;
      updatedProducts[productIndex].price = action.payload.price;
      updatedProducts[productIndex].quantity = action.payload.quantity;
      updatedProducts[productIndex]["statusColor"] = "#219675";
      updatedProducts[productIndex]["statusText"] = "Quantity updated";
      state.product = updatedProducts;
    },
    PriceandQuantityChangeStatus: (state, action) => {
      const productIndex = state.product.findIndex(
        (p) => p.id === action.payload.id
      );
      const updatedProducts = [...state.product];
      updatedProducts[productIndex].status = 6;
      updatedProducts[productIndex].price = action.payload.price;
      updatedProducts[productIndex].quantity = action.payload.quantity;
      updatedProducts[productIndex]["statusColor"] = "#219675";
      updatedProducts[productIndex]["statusText"] =
        "Quantity and Price updated";
      state.product = updatedProducts;
    },
  },
});

export const productAction = productSlice.actions;
export default productSlice.reducer;
