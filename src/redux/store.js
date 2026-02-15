// store.js
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.js'

// Redux Persist imports
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// Configure persist
const persistConfig = {
  key: 'root',       // key for localStorage
  storage,           // storage method
  whitelist: ['user'], // state slices you want to persist (optional, here user slice)
}

// Wrap your reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, userReducer)

const store = configureStore({
  reducer: {
    app: persistedReducer, // use the persisted reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions to avoid errors
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// Create persistor
export const persistor = persistStore(store)
export default store
