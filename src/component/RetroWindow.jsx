import "../styles/RetroWindow.css"
import MinimiseIcon from "../assets/button/minimize.svg"
import MaximiseIcon from "../assets/button/maximize.svg"
import CloseIcon from "../assets/button/close.svg"
import { useRef, useState, useCallback } from "react"

const ANIM_STEPS = 8
const ANIM_DURATION = 160 // ms total

function animateRect(fromRect, toRect, onDone) {
	const canvas = document.createElement("canvas")
	canvas.style.cssText = `
		position: fixed;
		inset: 0;
		width: 100vw;
		height: 100vh;
		pointer-events: none;
		z-index: 9999;
	`
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	document.body.appendChild(canvas)
	const ctx = canvas.getContext("2d")

	let step = 0
	const interval = ANIM_DURATION / ANIM_STEPS

	function drawStep() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		if (step >= ANIM_STEPS) {
			canvas.remove()
			onDone?.()
			return
		}

		const t = step / ANIM_STEPS
		const x = fromRect.x + (toRect.x - fromRect.x) * t
		const y = fromRect.y + (toRect.y - fromRect.y) * t
		const w = fromRect.width + (toRect.width - fromRect.width) * t
		const h = fromRect.height + (toRect.height - fromRect.height) * t

		ctx.strokeStyle = "#000"
		ctx.lineWidth = 2
		ctx.setLineDash([])
		ctx.strokeRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h))

		step++
		setTimeout(drawStep, interval)
	}

	drawStep()
}

function RetroWindow({ title, children, setIsShowcase }) {
	const [isMaximized, setIsMaximized] = useState(false)
	const windowRef = useRef(null)
	const prevBounds = useRef(null)
	const dragOffset = useRef(null)

	// ── Drag handlers ─────────────────────────────────────────────────────────

	const handleTitleBarPointerDown = (e) => {
		if (e.target.closest("button")) return
		if (isMaximized) return
		const windowEl = windowRef.current
		if (!windowEl) return
		const rect = windowEl.getBoundingClientRect()
		windowEl.style.top = "0"
		windowEl.style.left = "0"
		windowEl.style.transform = `translate(${rect.left}px, ${rect.top}px)`
		dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
		e.currentTarget.setPointerCapture(e.pointerId)
		e.preventDefault()
	}

	const handleTitleBarPointerMove = (e) => {
		if (!dragOffset.current) return
		const windowEl = windowRef.current
		if (!windowEl) return
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
			const fromRect = windowEl.getBoundingClientRect()
			prevBounds.current = {
				top: fromRect.top,
				left: fromRect.left,
				width: fromRect.width,
				height: fromRect.height,
			}

			const toRect = {
				x: 0,
				y: 0,
				width: window.innerWidth,
				height: window.innerHeight - 36, // above taskbar
			}

			// Switch window state immediately (invisible under the animation)
			windowEl.style.top = ""
			windowEl.style.left = ""
			windowEl.style.width = ""
			windowEl.style.height = ""
			windowEl.style.transform = ""
			windowEl.style.visibility = "hidden"
			setIsMaximized(true)

			animateRect(
				{
					x: fromRect.left,
					y: fromRect.top,
					width: fromRect.width,
					height: fromRect.height,
				},
				toRect,
				() => {
					windowEl.style.visibility = ""
				},
			)
		} else {
			const fromRect = {
				x: 0,
				y: 0,
				width: window.innerWidth,
				height: window.innerHeight - 36,
			}
			const b = prevBounds.current

			// Hide window, animate, then restore
			windowEl.style.visibility = "hidden"

			animateRect(
				fromRect,
				{ x: b.left, y: b.top, width: b.width, height: b.height },
				() => {
					windowEl.style.top = `${b.top}px`
					windowEl.style.left = `${b.left}px`
					windowEl.style.width = `${b.width}px`
					windowEl.style.height = `${b.height}px`
					windowEl.style.transform = "none"
					setIsMaximized(false)
					windowEl.style.visibility = ""
				},
			)
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
