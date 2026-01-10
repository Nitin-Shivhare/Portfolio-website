import "../styles/ShowcaseNavigation.css"

function ShowcaseNavigation({ setShowcaseAppState }) {
	const handleShowcaseAppState = (e) => {
		const state = e.target.innerText.toLowerCase()
		setShowcaseAppState(state)
	}
	return (
		<>
			<div className="left-panel-heading">
				<h1>Nitin</h1> <h1>Shivhare</h1>
				<h3>My Portfolio - 2026</h3>
				<div className="left-panel-navigation-container clickable">
					<h4 onClick={handleShowcaseAppState}>HOME</h4>
					<h4 onClick={handleShowcaseAppState}>ABOUT</h4>
					<h4 onClick={handleShowcaseAppState}>PROJECTS</h4>
					<h4 onClick={handleShowcaseAppState}>EXPERIENCE</h4>
					<h4 onClick={handleShowcaseAppState}>CONTACT</h4>
				</div>
			</div>
		</>
	)
}

export default ShowcaseNavigation
