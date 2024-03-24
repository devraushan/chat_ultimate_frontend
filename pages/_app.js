import Header from '../components/Header'
import {store,persistor} from "./../Store/store"
import '../styles/globals.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

function MyApp({ Component, pageProps }) {
  return (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <>
        <div className='z-100 bg-gray-400 sticky top-0 '>
          <Header/>
        </div>
        <Component {...pageProps} />
      </>
    </PersistGate>
  </Provider>
)}

export default MyApp
 