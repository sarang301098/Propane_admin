import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { apiMiddleware } from "../middleware/middleware";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "pagination", "profile", "products", "category"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: Store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk), applyMiddleware(apiMiddleware))
);

export const persistor = persistStore(store);
export default store;
