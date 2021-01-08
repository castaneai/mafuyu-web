import { preloadFirestore, useFirebaseApp } from 'reactfire'
import React, { ReactNode, useEffect, useState } from 'react'

type Props = {
	children: ReactNode
}

const FirebaseApp = ({ children }: Props) => {
	const firebaseApp = useFirebaseApp()
	const [database, setDatabase] = useState<firebase.firestore.Firestore | null>(null)

	useEffect(() => {
		preloadFirestore({
			firebaseApp,
			setup: (firestore) => {
				const db = firestore();
				if (process.env.FIREBASE_USE_EMULATOR) {
					db.useEmulator('localhost', 8080)
				}
				setDatabase(db)
			},
		})
	})

	if (!database) {
		return <p>loading...</p>
	}

	return <>{children}</>
}

export default FirebaseApp