import "../styles/ShowcaseContentHome.css"

function ShowcaseContentHome({ setShowcaseAppState }) {
	const handleShowcaseAppState = (e) => {
		const state = e.target.innerText.toLowerCase()
		console.log(typeof state)
		console.log(state)
		setShowcaseAppState(state)
	}
	return (
		<div className="center">
			<div className="outer-box">
				<h1 className="center">Nitin Shivhare</h1>
				<h3 className="center">Software Engineer</h3>
				<div className="third clickable">
					<h4 onClick={handleShowcaseAppState}>ABOUT</h4>
					<h4 onClick={handleShowcaseAppState}>PROJECTS</h4>
					<h4 onClick={handleShowcaseAppState}>EXPERIENCE</h4>
					<h4 onClick={handleShowcaseAppState}>CONTACT</h4>
				</div>
			</div>
		</div>
	)
}

export default ShowcaseContentHome
