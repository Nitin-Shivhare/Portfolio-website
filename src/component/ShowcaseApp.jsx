import { useState } from "react"
import "../styles/ShowcaseApp.css"
import RetroWindow from "./RetroWindow"
import ShowcaseContentHome from "./ShowcaseContentHome"
import ShowcaseContentAbout from "./ShowcaseContentAbout"
import ShowcaseContentExperience from "./ShowcaseContentExperience"
import ShowcaseContentContact from "./ShowcaseContentContact"
import ShowcaseContentProjects from "./ShowcaseContentProjects"

function ShowcaseApp({ setIsShowcase }) {
	const [showcaseAppState, setShowcaseAppState] = useState("home")

	return (
		<div>
			<RetroWindow
				setIsShowcase={setIsShowcase}
				title={"My Showcase - Nitin Shivhare"}
			>
				{/* HOME */}
				{showcaseAppState == "home" && (
					<ShowcaseContentHome setShowcaseAppState={setShowcaseAppState} />
				)}

				{/* ABOUT */}
				{showcaseAppState == "about" && (
					<ShowcaseContentAbout setShowcaseAppState={setShowcaseAppState} />
				)}

				{/* PROJECTS */}
				{showcaseAppState == "projects" && (
					<ShowcaseContentProjects setShowcaseAppState={setShowcaseAppState} />
				)}

				{/* experience */}
				{showcaseAppState == "experience" && (
					<ShowcaseContentExperience
						setShowcaseAppState={setShowcaseAppState}
					/>
				)}

				{/* CONTACT */}
				{showcaseAppState == "contact" && (
					<ShowcaseContentContact setShowcaseAppState={setShowcaseAppState} />
				)}
			</RetroWindow>

			{/* <div className="status-bar">
				<span>© 2026 Nitin Shivhare</span>
			</div> */}
		</div>
	)
}

export default ShowcaseApp
