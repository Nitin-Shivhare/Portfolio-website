import { useEffect, useRef } from "react"
import clickSound from "../assets/audio/clicksoundeffect.mp3"

export default function useClickSound() {
	const audioRef = useRef(null)

	useEffect(() => {
		audioRef.current = new Audio(clickSound)
		audioRef.current.volume = 0.4

		const handleClick = (e) => {
			// rewind so rapid clicks still work
			if (e.target.closest(".clickable , button , a , .individual-icon")) {
				audioRef.current.currentTime = 0
				audioRef.current.play().catch(() => {})
			}
		}

		document.addEventListener("click", handleClick)

		return () => {
			document.removeEventListener("click", handleClick)
		}
	}, [])
}
