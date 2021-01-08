import { FirebaseAppProvider } from 'reactfire'
import { firebaseConfig } from '../utils/firebase-config'
import type { AppProps /*, AppContext */ } from 'next/app'
import FirebaseApp from '../components/FirebaseApp'

function MyApp({ Component, pageProps }: AppProps) {
	return <FirebaseAppProvider firebaseConfig={firebaseConfig}>
		<FirebaseApp>
			<Component {...pageProps} />
		</FirebaseApp>
	</FirebaseAppProvider>
}

export default MyApp