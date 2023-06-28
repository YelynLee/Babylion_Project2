import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice.js";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, 
    persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    user: userSlice.reducer,
    //post: postReducer...
})

const persistConfig = {
    key: 'root',
    storage //'local' storage에 저장
}

const persistedReducer = persistReducer(persistConfig, rootReducer) //(persistReducer, baseReducer)

//윗부분에 redux-persist를 적용하기 위해 combineReducers & persistReducer 함수 사용
//이러한 redux-persist로 얻어낸 persistedReducer를 store에 넣어줌
export const store = configureStore({ //main.jsx로 export하고 그곳의 provider에서 활용
    reducer: persistedReducer,
    /*reducer: {
        user: userReducer -> 이걸 userSlice.reducer로 고침. 오류떠서.
    }*/
    middleware: getDefaultMiddleware => getDefaultMiddleware(
        {
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }
    )
})

export const persistor = persistStore(store); //main.jsx로 export하고 그곳의 persistgate에서 활용