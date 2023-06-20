import { ReactNotifications } from 'react-notifications-component';
import './App.css';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import { store } from './app/store'
import Router from './routes/Router';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import UserContextProvider from './context/UserContextProvider';
import { Suspense } from 'react';
import 'react-notifications-component/dist/theme.css'
const persistor = persistStore(store);
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

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
