import { configureStore } from "@reduxjs/toolkit";
import { coinListApi } from "../services/coinList";

export default configureStore({
  reducer: {
    [coinListApi.reducerPath]: coinListApi.reducer
  },
  middleware: (gDM) => gDM().concat(coinListApi.middleware),
});
