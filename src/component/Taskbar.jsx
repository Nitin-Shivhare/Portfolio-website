import "../styles/Taskbar.css"
import StartIcon from "../assets/icons/start-icon.png"
import BellIcon from "../assets/icons/taskbar-sound.png"
import LinkedinIcon from "../assets/icons/linkedin.png"
import ShutdownIcon from "../assets/icons/shut-down-icon.png"
import GithubIcon from "../assets/icons/github.svg"
import { useState } from "react"
import Clock from "./Clock"

function Taskbar() {
	const [isStartMenu, setIsStartMenu] = useState(false)

	const handleStartButton = () => {
		setIsStartMenu((preVal) => !preVal)
	}

	return (
		<>
			{isStartMenu ? (
				<div className="start-menu shadow-depth">
					<aside className="start-menu-sidebar">
						<h4 className="sidebar-title">ShivhareOS</h4>
					</aside>

					<nav className="start-menu-main">
						<div className="menu-item">
							<div className="menu-icon">
								<img src={ShutdownIcon} alt="Shutdown" />
							</div>
							<span className="menu-text">Shut down...</span>
						</div>

						<a
							href="https://www.linkedin.com/in/nitin-shivhare-3911b0345/"
							className="menu-item"
							target="_blank"
						>
							<div className="menu-icon">
								<img src={LinkedinIcon} alt="LinkedIn" />
							</div>
							<span className="menu-text">Linkedin</span>
						</a>

						<a
							href="https://github.com/Nitin-Shivhare"
							className="menu-item"
							target="_blank"
						>
							<div className="menu-icon">
								<img src={GithubIcon} alt="Github" />
							</div>
							<span className="menu-text">Github</span>
						</a>
					</nav>
				</div>
			) : (
				""
			)}

			<div className="task-bar task-bar-container">
				<div className="start-button start-button-container center">
					<button className="start-btn" onClick={handleStartButton}>
						<img src={StartIcon} alt="Start" />
						<b>Start</b>
					</button>
				</div>

				<div className="icon-tray"></div>

				<div className="SoundnTime">
					<div className="task-bar-right-sound center">
						<img src={BellIcon} alt="sound" />
					</div>
					<Clock />
					{/* <div className="task-bar-right-time center">20:08</div> */}
				</div>
			</div>
		</>
	)
}

export default Taskbar
