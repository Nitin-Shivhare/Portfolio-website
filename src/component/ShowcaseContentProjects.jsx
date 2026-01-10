import ShowcaseNavigation from "./ShowcaseNavigation"
import ResumeCallOut from "./ResumeCallOut"
import OpenSourceWiki from "../assets/pictures/opensourcewiki.png"
import "../styles/ShowcaseContentProjects.css"

function ShowcaseContentProjects({ setShowcaseAppState }) {
	return (
		<div className="showcase-layout">
			<div className="left-panel">
				<ShowcaseNavigation setShowcaseAppState={setShowcaseAppState} />
			</div>
			<div className="right-panel">
				<h1>Projects</h1>
				<hr />
				<ResumeCallOut />

				<hr />
				<h3 className="clickable ">
					<a href="https://opensourcewiki.tech/" className="projects-h-link">
						OpenSourceWiki.tech{" "}
					</a>
				</h3>

				<p>
					OpenSourceWiki.tech is a full-stack blogging platform I built for
					developers who care about open-source, Linux, and tech culture. The
					goal was simple: create a clean, community-driven space to write,
					discover, and engage with technical content, while pushing myself to
					build and deploy a real production-grade application.
				</p>
				<br />

				<p>
					Users can authenticate with JWT or Google OAuth, maintain public
					profiles, write blogs using a rich text editor, and explore trending
					or latest posts. Behind the scenes, the app is powered by a React +
					Vite frontend, a Node.js and Express backend, MongoDB Atlas for data
					storage, and AWS S3 for secure media uploads. The frontend is deployed
					on Vercel and the backend on Render.
				</p>

				<br />

				<p>
					This project challenged me to think beyond “just code” and focus on
					scalability, security, and real-world deployment. The backend
					repository is kept private to protect infrastructure, but I’m always
					happy to discuss the architecture and design decisions. If you want to
					see it live, it’s already up and running.
				</p>

				<div className="project-image-frame">
					<img
						className="projects-image"
						src={OpenSourceWiki}
						alt="OpenSourceWiki preview"
					/>
				</div>

				<div className="links-container">
					<h3>Links:</h3>
					<p>
						Live Link:{"  "}
						<a href="https://opensourcewiki.tech/">
							https://opensourcewiki.tech/
						</a>
					</p>

					<p>
						Frontend Repo:{" "}
						<a href="https://github.com/Nitin-Shivhare/open-front">
							https://github.com/Nitin-Shivhare/open-front
						</a>
					</p>
				</div>

				<br />
				<hr />
				<br />

				<h3 className="clickable">nitinshivhare.com</h3>

				<p>
					nitinshivhare.com is my portfolio website and, yes, the one you are
					browsing right now. It’s currently under active development.
				</p>

				<p>
					This Windows 98–style interface is just the beginning. The end goal is
					a fully interactive 3D experience built with Three.js.
				</p>

				<br />
			</div>
		</div>
	)
}

export default ShowcaseContentProjects
