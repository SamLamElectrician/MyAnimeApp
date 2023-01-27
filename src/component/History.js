import React from 'react';
import { useUserAuth } from '../context/UserAuthContext';

export default function History() {
	const { user } = useUserAuth();
	const getFirebaseData = () => {
		const db = getDatabase(firebaseConfig);
		const dbRef = ref(db, `user/${user.uid}/`);
		onValue(dbRef, (snapshot) => {
			const data = snapshot.val();
			// console.log('snapshot:', data);
		});
	};
	return <div></div>;
}
