import "../styles/ShowcaseContentAbout.css"
import ShowcaseNavigation from "./ShowcaseNavigation"
import ResumeCallOut from "./ResumeCallOut"

function ShowcaseContentAbout({ setShowcaseAppState }) {
	const handleThisFormAnchor = function () {
		setShowcaseAppState("contact")
	}

	return (
		<div className="showcase-layout">
			<div className="left-panel">
				<ShowcaseNavigation setShowcaseAppState={setShowcaseAppState} />
			</div>

			<div className="right-panel">
				{/* long content goes here */}
				<h1>Welcome</h1>
				<h3>I am Nitin Shivhare</h3>
				<br />
				<p>
					I'm a full stack MERN developer, currently seeking entry-level
					opportunities where I can continue learning, grow as a developer, and
					contribute to meaningful projects in a professional environment. I
					graduated in December 2025 with a Bachelor of Computer Applications
					(BCA) from Rabindranath Tagore University, Bhopal.
				</p>
				<br />
				<p>
					Thank you for taking the time to check out my portfolio. I really hope
					you enjoy exploring it as much as I enjoyed building it. If you have
					any questions or comments, feel free to contact me using{" "}
					<a
						style={{
							color: "blue",
							textDecoration: "underLine",
							cursor: "pointer",
							userSelect: "none",
							padding: "4px 6px",
						}}
						onClick={handleThisFormAnchor}
					>
						this form
					</a>{" "}
					or shoot me an email at nitin.alt99@gmail.com
				</p>

				{/* RESUME CALL--OUT */}
				<hr />
				<ResumeCallOut />

				<hr />

				{/* ABOUT ME */}
				<h3>About me</h3>
				<p>
					I have always been a logical and curious person. From an early age, I
					enjoyed solving mathematics problems, playing video games, and trying
					to understand how things work under the hood. Whether it was figuring
					out game mechanics or breaking down systems into smaller parts, I
					naturally gravitated toward problem-solving and analytical thinking.
				</p>
				<br />
				<p>
					I began taking programming seriously when I joined college, where I
					was formally introduced to computer science concepts and software
					development. What started as curiosity quickly turned into genuine
					interest as I learned how logic, structure, and creativity come
					together in code. Since then, I have been consistently building my
					skills through hands-on projects, focusing on writing clean,
					maintainable code and understanding how full-stack applications work
					end to end.
				</p>
				<br />

				<p>
					I enjoy learning by building, experimenting, and improving—always
					aiming to understand not just what works, but why it works.
				</p>

				<hr />

				{/* My Hobbies */}
				<h3>My Hobbies</h3>

				<p>
					Outside of software development, I enjoy staying active and creative.
					I have a strong interest in football and was part of a regional-level
					football team during my school years, which helped build discipline
					and teamwork. In my free time, I also enjoy cooking exotic meals and
					unwinding by playing video games.
				</p>
				<br />
				<br />
				<br />
			</div>
		</div>
	)
}

export default ShowcaseContentAbout
