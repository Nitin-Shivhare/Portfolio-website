import "../styles/RetroWindow.css"
import MinimiseIcon from "../assets/button/minimize.svg"
import MaximiseIcon from "../assets/button/maximize.svg"
import CloseIcon from "../assets/button/close.svg"
import { useRef, useState } from "react"

function RetroWindow({ title, children, setIsShowcase }) {
	const [isMaximized, setIsMaximized] = useState(false)
	const windowRef = useRef(null)
	const prevBounds = useRef(null)

	const handleCloseButton = () => {
		setIsShowcase(false)
	}

	const handleMaximiseButton = () => {
		const windowEl = windowRef.current
		if (!windowEl) return

		if (!isMaximized) {
			// — Entering maximized state —
			// Save current inline bounds so we can restore them exactly.
			// We read from the element's actual rendered rect, not just inline styles,
			// so this works even on first click before any styles have been set.
			const rect = windowEl.getBoundingClientRect()
			prevBounds.current = {
				top: rect.top,
				left: rect.left,
				width: rect.width,
				height: rect.height,
			}

			// Clear any inline styles so the .maximized CSS class takes full control
			windowEl.style.top = ""
			windowEl.style.left = ""
			windowEl.style.width = ""
			windowEl.style.height = ""
			windowEl.style.transform = ""

			setIsMaximized(true)
		} else {
			// — Restoring state —
			// Apply the saved bounds back as inline styles.
			// We use top/left directly (no transform) because we saved
			// the getBoundingClientRect values which are already in page-space.
			const b = prevBounds.current
			if (b) {
				windowEl.style.top = `${b.top}px`
				windowEl.style.left = `${b.left}px`
				windowEl.style.width = `${b.width}px`
				windowEl.style.height = `${b.height}px`
				windowEl.style.transform = "none"
			}

			setIsMaximized(false)
		}
	}

	return (
		<div ref={windowRef} className={`window ${isMaximized ? "maximized" : ""}`}>
			<div className="title-bar">
				<div className="title-bar-text">{title}</div>
				<div className="title-bar-controls">
					<button aria-label="Minimize">
						<img src={MinimiseIcon} alt="minimize" />
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
