import './App.css';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import { store } from './app/store'
import Router from './routes/Router';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
const persistor = persistStore(store);
function App() {
  return (
    <>
      <ThemeProvider
        breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint="xxs"
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </>
  )
}

export default App;
