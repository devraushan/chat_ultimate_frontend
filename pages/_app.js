import Header from '../components/Header'
import Navbar from '../components/Navbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <>
  <div className='sticky top-0'>
    <Header/>
    <Navbar/>
  </div>
    <Component {...pageProps} />
  </>
}

export default MyApp
