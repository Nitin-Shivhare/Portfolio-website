import "../styles/RetroWindow.css"
import MinimiseIcon from "../assets/button/minimize.svg"
import MaximiseIcon from "../assets/button/maximize.svg"
import CloseIcon from "../assets/button/close.svg"
import { useRef, useState } from "react"

// Window.js
function RetroWindow({ title, children, setIsShowcase }) {
	const [isMaximized, setIsMaximized] = useState(null)

	// store previous position & size
	const prevBounds = useRef(null)

	const handleCloseButton = () => {
		setIsShowcase(false)
	}

	const handleMaximiseButton = () => {
		const windowEl = document.querySelector(".window")

		if (!isMaximized) {
			// save current bounds
			const rect = windowEl.getBoundingClientRect()
			prevBounds.current = {
				top: rect.top,
				left: rect.left,
				width: rect.width,
				height: rect.height,
			}
		}

		setIsMaximized((prev) => !prev)
	}

	return (
		<div className={`window ${isMaximized ? "maximized" : ""} `}>
			<div className="title-bar">
				<div className="title-bar-text">{title}</div>
				<div className="title-bar-controls">
					<button aria-label="Minimize">
						<img src={MinimiseIcon} alt="minimize" />{" "}
					</button>
					<button aria-label="Maximize" onClick={handleMaximiseButton}>
						<img src={MaximiseIcon} alt="maximize" />
					</button>
					<button aria-label="Close" onClick={handleCloseButton}>
						<img src={CloseIcon} alt="close" />
					</button>
				</div>
			</div>
			<div className="window-body">{children}</div>
		</div>
	)
}

export default RetroWindow
