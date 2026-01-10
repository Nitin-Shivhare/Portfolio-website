import ShowcaseNavigation from "./ShowcaseNavigation"

function ShowcaseContentExperience({ setShowcaseAppState }) {
	return (
		<div className="showcase-layout">
			<div className="left-panel">
				<ShowcaseNavigation setShowcaseAppState={setShowcaseAppState} />
			</div>
			<div className="right-panel">
				<h1>Experience</h1>
				<p>
					This section would normally list companies. Instead, it reflects
					hands-on experience gained by building and shipping real software.
				</p>
			</div>
		</div>
	)
}

export default ShowcaseContentExperience
