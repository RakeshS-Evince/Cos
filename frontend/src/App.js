import 'react-notifications-component/dist/theme.css'
import './App.css';
import { ReactNotifications } from 'react-notifications-component';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { Suspense } from 'react';
import { store } from './app/store'
import Router from './routes/Router';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import UserContextProvider from './context/UserContextProvider';

const persistor = persistStore(store);

function App() {
  return (
    <>
      <ThemeProvider
        breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint="xxs"
      >
        <ReactNotifications />
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
