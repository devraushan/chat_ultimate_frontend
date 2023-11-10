import Header from '../components/Header'
import Navbar from '../components/Navbar'
import {store,persistor} from "./../Store/store"
import '../styles/globals.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

function MyApp({ Component, pageProps }) {
  return (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <>
        <div className='rounded-3xl bg-gray-400 sticky top-0 my-10 mx-10'>
          <Header/>
          <Navbar/>
        </div>
        <Component {...pageProps} />
      </>
    </PersistGate>
  </Provider>
)}

export default MyApp
 