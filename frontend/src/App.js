import './App.css';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import { store } from './app/store'
import Router from './routes/Router';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import UserContextProvider from './context/UserContextProvider';
import { Suspense } from 'react';

const persistor = persistStore(store);
function App() {
  return (
    <>
      <ThemeProvider
        breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint="xxs"
      >
        <Suspense fallback={<h1>Loading....</h1>}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <UserContextProvider>
                <Router />
              </UserContextProvider>
            </PersistGate>
          </Provider>
        </Suspense>
      </ThemeProvider>
    </>
  )
}

export default App;
