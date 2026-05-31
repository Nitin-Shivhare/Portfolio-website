import ShowcaseNavigation from "./ShowcaseNavigation"
import "../styles/ShowcaseContentExperience.css"
import ReoxideIcon from "../assets/icons/reoxideIcon.svg"

function ShowcaseContentExperience({ setShowcaseAppState }) {
	return (
		<div className="showcase-layout">
			<div className="left-panel">
				<ShowcaseNavigation setShowcaseAppState={setShowcaseAppState} />
			</div>

			<div className="right-panel">
				<div className="experience-header">
					<div className="experience-company-info">
						<div className="experience-title-row">
							<img
								src={ReoxideIcon}
								alt="Reoxide Logo"
								className="experience-logo"
							/>

							<h1>Reoxide</h1>
						</div>

						<h3 className="experience-role">Full Stack Developer Intern</h3>
					</div>

					<div className="experience-meta">
						<a
							href="https://reoxide.com"
							target="_blank"
							rel="noreferrer"
							className="experience-company-link"
						>
							www.reoxide.com
						</a>

						<p className="experience-date">May 2026 - Present</p>
					</div>
				</div>

				<p className="experience-description">
					Working on production-level web applications and internal tools while
					collaborating with the development team through pull requests and code
					reviews.
				</p>

				<ul className="experience-points">
					<li>
						Contributed to the existing production codebase and got my first
						pull request merged into the community branch.
					</li>

					<li>
						Learning real-world development workflows including Git, PR reviews,
						debugging, and collaboration.
					</li>

					<li>
						Working with full stack technologies to improve features, error
						handling, and overall application stability.
					</li>

					<li>
						Collaborating with developers in a professional software engineering
						environment.
					</li>
				</ul>
			</div>
		</div>
	)
}

export default ShowcaseContentExperience
