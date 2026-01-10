import "../styles/ResumeCallOut.css"
import ResumeDownloadIcon from "../assets/icons/resumedownload.gif"

function ResumeCallOut() {
	return (
		<div className="resume-callout">
			<img src={ResumeDownloadIcon} alt="Resume icon" className="resume-icon" />

			<div className="resume-text">
				<h4>Looking for my resume?</h4>
				<a
					href="/src/assets/resume/Nitin_Shivhare_Resume_2026.pdf"
					target="_blank"
					rel="noopener noreferrer"
				>
					Click here to download it!
				</a>
			</div>
		</div>
	)
}

export default ResumeCallOut
