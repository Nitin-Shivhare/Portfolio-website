import "../styles/Home.css"
import ShowcaseIcon from "../assets/icons/showcase.png"
import ResumeIcon from "../assets/icons/resume.png"
import PongGameIcon from "../assets/icons/pong.png"
import ResumePDF from "../../public/resume/Nitin_Shivhare_Resume_2026.pdf"
import ShowcaseApp from "../component/ShowcaseApp"
import { useState } from "react"
import PongGame from "../component/PongGame"
import RetroWindow from "../component/RetroWindow"

const LocalIcons = [
	{
		id: "showcase",
		label: "My showcase",
		icon: ShowcaseIcon,
	},

	{
		id: "resume",
		label: "resume.pdf",
		icon: ResumeIcon,
	},
]

function HomePage() {
	const [isShowcase, setIsShowcase] = useState(true)
	const [isPong, setIsPong] = useState(false)

	const handleShowcaseIconPressed = () => {
		console.log("show case icon was pressed")
		setIsShowcase(true)
	}

	const handlePongIconPressed = () => {
		setIsPong(true)
	}

	const handleResumeIconPressed = () => {
		console.log("Resume  icon was pressed")
		const link = document.createElement("a")
		link.href = ResumePDF
		link.download = "Nitin_Shivhare_Resume.pdf" // optional but classy
		link.target = "_blank" // opens in new tab if browser supports it
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	return (
		<>
			<div className="icon-container">
				<div
					className="individual-icon"
					data-icon={"showcase"}
					onClick={handleShowcaseIconPressed}
				>
					<div className="icon-container-icon">
						<img src={ShowcaseIcon} alt={"showcaseIcon"} draggable="false" />
					</div>

					<div className="icon-container-text">My showcase</div>
				</div>

				<div
					className="individual-icon"
					data-icon={"resume"}
					onClick={handleResumeIconPressed}
				>
					<div className="icon-container-icon">
						<img src={ResumeIcon} alt={"resumeIcon"} draggable="false" />
					</div>

					<div className="icon-container-text">resume</div>
				</div>

				<div
					className="individual-icon"
					data-icon="pong"
					onClick={handlePongIconPressed}
				>
					<div className="icon-container-icon">
						<img src={PongGameIcon} alt="pongIcon" draggable="false" />
					</div>
					<div className="icon-container-text">pong.exe</div>
				</div>
			</div>

			{isShowcase ? <ShowcaseApp setIsShowcase={setIsShowcase} /> : ""}

			{/* Pong window — its own independent RetroWindow */}
			{isPong && (
				<RetroWindow title="pong.exe" setIsShowcase={setIsPong}>
					<PongGame />
				</RetroWindow>
			)}
		</>
	)
}

export default HomePage
