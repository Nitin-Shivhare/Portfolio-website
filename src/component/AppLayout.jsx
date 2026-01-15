import { createContext, useState } from "react"
import HomePage from "../page/HomePage"
import Taskbar from "./Taskbar"
import useClickSound from "../hooks/useSoundClick"

export const IconContext = createContext({
	applications: [],

	setApplications: () => {},
})

function AppLayout() {
	const [applications, setApplications] = useState([
		{ id: "showcase", lable: "My Showcase", active: "false", zindex: 0 },
	])

	useClickSound()

	return (
		<IconContext.Provider value={{ applications, setApplications }}>
			<div>
				<HomePage />
				<Taskbar />
			</div>
		</IconContext.Provider>
	)
}

export default AppLayout
