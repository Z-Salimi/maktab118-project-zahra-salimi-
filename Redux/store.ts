import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import { cartReducer } from './slices/cartSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export const persistor = persistStore(reduxStore);

// Types for the store
export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;


// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import logger from 'redux-logger';
// import { cartReducer } from './slices/cartSlice';
// import {serializableMiddleware} from './serializableMiddleware';

// const rootReducer = combineReducers({
//   cart: cartReducer,
// });

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const reduxStore = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false })
//       .concat(logger)
//       .concat(serializableMiddleware),
// });

// export const persistor = persistStore(reduxStore);

// // Types for the store
// export type RootState = ReturnType<typeof reduxStore.getState>;
// export type AppDispatch = typeof reduxStore.dispatch;
