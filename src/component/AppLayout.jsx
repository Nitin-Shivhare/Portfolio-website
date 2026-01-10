import { useState } from "react"
import HomePage from "../page/HomePage"
import Taskbar from "./Taskbar"

function AppLayout() {
	const [applications, setApplications] = useState([
		{ id: "showcase", lable: "My Showcase", active: "false", zindex: 0 },
	])
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
