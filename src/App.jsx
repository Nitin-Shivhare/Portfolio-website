import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import AppLayout from "./component/AppLayout"
import HomePage from "./page/HomePage"

const router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			// {
			// 	path: "signup",
			// 	element: <UserAuthFormpage type="Sign-Up" />,
			// },
		],
	},
])

function App() {
	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	)
}

export default App
