import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoApi";
import { cryptoNewsAPi } from "../services/cryptoNewsApi";
export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsAPi.reducerPath]: cryptoNewsAPi.reducer,
  },
});
