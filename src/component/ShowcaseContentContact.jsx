import ShowcaseNavigation from "./ShowcaseNavigation"
import "../styles/ShowcaseContentContact.css"
import emailjs from "emailjs-com"

function ShowcaseContentContact({ setShowcaseAppState }) {
	const handleSubmit = (e) => {
		e.preventDefault()

		emailjs
			.sendForm(
				import.meta.env.VITE_EMAILJS_SERVICE_ID, // ✅ your Service ID
				import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // ✅ paste Template ID
				e.target,
				import.meta.env.VITE_EMAILJS_PUBLIC_KEY
				// ✅ paste Public Key
			)
			.then(
				() => {
					alert("Message sent successfully.")
					e.target.reset()
				},
				(error) => {
					alert("Failed to send message.")
					console.error(error)
				}
			)
	}

	return (
		<div className="showcase-layout">
			<div className="left-panel">
				<ShowcaseNavigation setShowcaseAppState={setShowcaseAppState} />
			</div>

			<div className="right-panel contact">
				<h1>Contact</h1>

				<p className="contact-intro">
					I am currently open to opportunities, collaborations, and
					conversations. If you have something in mind, feel free to reach out.
				</p>

				<p className="contact-email">
					Email:{" "}
					<a href="mailto:nitin.alt99@gmail.com">nitin.alt99@gmail.com</a>
				</p>

				<form className="contact-form" onSubmit={handleSubmit}>
					<label>
						<span>* Your name:</span>
						<input
							type="text"
							name="from_name" // ✅ REQUIRED
							placeholder="Name"
							required
						/>
					</label>

					<label>
						<span>* Email:</span>
						<input
							type="email"
							name="from_email" // ✅ REQUIRED
							placeholder="Email"
							required
						/>
					</label>

					<label>
						<span>Company (optional):</span>
						<input
							type="text"
							name="company" // ✅ REQUIRED
							placeholder="Company"
						/>
					</label>

					<label>
						<span>* Message:</span>
						<textarea
							name="message" // ✅ REQUIRED
							placeholder="Message"
							rows="5"
							required
						/>
					</label>

					<button type="submit">Send</button>
				</form>
			</div>
		</div>
	)
}

export default ShowcaseContentContact
