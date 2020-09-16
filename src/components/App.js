import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
	const [init, setInit] = useState(false);
	//const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userOBj, setUserObj] = useState(null);

	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if (user) {
				setUserObj(user);
			}
			setInit(true);
		});
	}, []);

	return (
		<>
			{init ? (
				<AppRouter isLoggedIn={Boolean(userOBj)} userObj={userOBj} /> //<AppRouter isLoggedIn={isLoggedIn} userObj={userOBj} />
			) : (
				"Initializing....."
			)}
		</>
	);
}

export default App;
