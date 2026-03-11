import "../styles/RetroWindow.css"
import MinimiseIcon from "../assets/button/minimize.svg"
import MaximiseIcon from "../assets/button/maximize.svg"
import CloseIcon from "../assets/button/close.svg"
import { useRef, useState } from "react"

function RetroWindow({ title, children, setIsShowcase }) {
	const [isMaximized, setIsMaximized] = useState(false)
	const windowRef = useRef(null)
	const prevBounds = useRef(null)

	// ── Drag state — lives in a ref, never triggers re-renders ────────────────
	const dragOffset = useRef(null) // { x, y } offset between pointer and window origin

	// ── Drag handlers ─────────────────────────────────────────────────────────

	const handleTitleBarPointerDown = (e) => {
		// Don't start a drag when the user is clicking a control button
		if (e.target.closest("button")) return
		// Don't drag a maximized window
		if (isMaximized) return

		const windowEl = windowRef.current
		if (!windowEl) return

		// Switch to pure-transform positioning (one-time, on first drag).
		// getBoundingClientRect gives us the true visual position regardless
		// of whatever top/left/transform combo CSS has right now.
		const rect = windowEl.getBoundingClientRect()
		windowEl.style.top = "0"
		windowEl.style.left = "0"
		windowEl.style.transform = `translate(${rect.left}px, ${rect.top}px)`

		// Save offset so the window doesn't jump to the pointer origin
		dragOffset.current = {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		}

		// Capture the pointer — drag continues even if mouse leaves the window
		e.currentTarget.setPointerCapture(e.pointerId)
		e.preventDefault()
	}

	const handleTitleBarPointerMove = (e) => {
		if (!dragOffset.current) return

		const windowEl = windowRef.current
		if (!windowEl) return

		// One DOM write per event — no React, no layout, GPU-composited
		const x = e.clientX - dragOffset.current.x
		const y = e.clientY - dragOffset.current.y
		windowEl.style.transform = `translate(${x}px, ${y}px)`
	}

	const handleTitleBarPointerUp = () => {
		dragOffset.current = null
	}

	// ── Maximize / Restore ────────────────────────────────────────────────────

	const handleMaximiseButton = () => {
		const windowEl = windowRef.current
		if (!windowEl) return

		if (!isMaximized) {
			// Save the current visual bounds so we can restore them exactly
			const rect = windowEl.getBoundingClientRect()
			prevBounds.current = {
				top: rect.top,
				left: rect.left,
				width: rect.width,
				height: rect.height,
			}
			// Clear all inline styles — let the .maximized CSS class take over
			windowEl.style.top = ""
			windowEl.style.left = ""
			windowEl.style.width = ""
			windowEl.style.height = ""
			windowEl.style.transform = ""
			setIsMaximized(true)
		} else {
			// Restore the saved bounds as top/left (transform-free) inline styles
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

	// ── Close ─────────────────────────────────────────────────────────────────

	const handleCloseButton = () => {
		setIsShowcase(false)
	}

	// ── Render ────────────────────────────────────────────────────────────────

	return (
		<div ref={windowRef} className={`window ${isMaximized ? "maximized" : ""}`}>
			<div
				className="title-bar"
				onPointerDown={handleTitleBarPointerDown}
				onPointerMove={handleTitleBarPointerMove}
				onPointerUp={handleTitleBarPointerUp}
			>
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
