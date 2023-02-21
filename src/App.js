import React from 'react';
import { Route, Routes } from 'react-router-dom';
//components
import Main from './component/Main';
import About from './component/About';
import Login from './component/Login';
import Signup from './component/Signup';
import History from './component/History';
import { UserAuthContextProvider } from './context/UserAuthContext';
import ProtectedRoute from './component/ProtectedRoute';

function App() {
	return (
		<>
			<UserAuthContextProvider>
				<Routes>
					<Route exact path='/login' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
					{/* protects this about from users who arent logged in */}
					<Route
						exact
						path='/about'
						element={
							<ProtectedRoute>
								<About />
							</ProtectedRoute>
						}
					></Route>
					{/* protects this main from users who arent logged in */}
					<Route
						exact
						path='/home'
						element={
							<ProtectedRoute>
								<Main />
							</ProtectedRoute>
						}
					></Route>
					<Route
						exact
						path='/history'
						element={
							<ProtectedRoute>
								<History />
							</ProtectedRoute>
						}
					></Route>
					{/* bypass if you arent logged in */}
					<Route path='/home2' element={<Main />}></Route>
					<Route path='/' element={<About />}></Route>
				</Routes>
			</UserAuthContextProvider>
		</>
	);
}

export default App;
