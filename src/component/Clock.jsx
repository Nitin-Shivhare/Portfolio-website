import { useState, useEffect } from "react"

function Clock() {
	const [time, setTime] = useState(new Date())

	useEffect(() => {
		// Update the time every second
		const timer = setInterval(() => {
			setTime(new Date())
		}, 1000)

		// Cleanup interval on unmount to prevent memory leaks
		return () => clearInterval(timer)
	}, [])

	// Format to 24-hour clock (HH:mm)
	const formattedTime = time.toLocaleTimeString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	})

	return <div className="task-bar-right-time center">{formattedTime}</div>
}

export default Clock
