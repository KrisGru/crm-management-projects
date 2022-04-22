import '../styles/globals.css'
import '../styles/main.scss'
import { AppWrapper } from '../utils/contextState'; // import based on where you put it


function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  )
}

export default MyApp
