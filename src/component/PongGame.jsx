import { useEffect, useRef, useState } from "react"
import "../styles/Pong.css"

// ─── Constants ────────────────────────────────────────────────────────────────

const ROUNDS = [5, 5, 5, 4, 4, 4, 3, 3, 3, 1]

const ROUND_COLOURS = [
	"#1ABC9C",
	"#16A085",
	"#2ECC71",
	"#27AE60",
	"#3498DB",
	"#2980B9",
	"#9B59B6",
	"#8E44AD",
	"#34495E",
	"#E74C3C",
	"#C0392B",
	"#D35400",
	"#E67E22",
]

const COLOURS = {
	DEFAULT: "#2C3E50",
	WHITE: "#FFFFFF",
}

const DIRECTION = {
	IDLE: "IDLE",
	UP: "UP",
	DOWN: "DOWN",
	LEFT: "LEFT",
	RIGHT: "RIGHT",
}

// ─── Audio (Web Audio API beeps — matches gdube's beep1/2/3) ─────────────────

function createBeep(frequency, duration, type = "square", volume = 0.3) {
	return {
		play() {
			try {
				const ctx = new (window.AudioContext || window.webkitAudioContext)()
				const oscillator = ctx.createOscillator()
				const gain = ctx.createGain()

				oscillator.connect(gain)
				gain.connect(ctx.destination)

				oscillator.type = type
				oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)
				gain.gain.setValueAtTime(volume, ctx.currentTime)
				gain.gain.exponentialRampToValueAtTime(
					0.001,
					ctx.currentTime + duration,
				)

				oscillator.start(ctx.currentTime)
				oscillator.stop(ctx.currentTime + duration)
			} catch (err) {
				/* audio not available */
				console.log(err.message)
			}
		},
	}
}

// beep1 = paddle hit (short, mid pitch)
const beep1 = createBeep(440, 0.05, "square", 0.25)
// beep2 = point scored (lower thud)
const beep2 = createBeep(220, 0.12, "square", 0.3)
// beep3 = level up (higher, longer)
const beep3 = createBeep(880, 0.2, "sine", 0.35)

// ─── Ball ─────────────────────────────────────────────────────────────────────

class Ball {
	BALL_SIZE = 20
	BALL_SPEED = 900
	BALL_SPEED_LEVEL_INCREMENT = 20

	constructor({ x, y }) {
		this.x = x
		this.y = y
		this.initialX = x
		this.initialY = y
		this.width = this.BALL_SIZE
		this.height = this.BALL_SIZE
		this.speedX = this.BALL_SPEED
		this.speedY = this.BALL_SPEED * (2 / 3)
		this.moveX = DIRECTION.IDLE
		this.moveY = DIRECTION.IDLE
	}

	reset() {
		this.x = this.initialX
		this.y = this.initialY
		this.moveX = DIRECTION.IDLE
		this.moveY = DIRECTION.IDLE
	}

	levelUp() {
		this.speedX += this.BALL_SPEED_LEVEL_INCREMENT
		this.speedY += this.BALL_SPEED_LEVEL_INCREMENT
	}

	isOutOfLeftBounds() {
		return this.x < 0
	}
	isOutOfRightBounds(canvas) {
		return this.x >= canvas.width - this.width
	}

	handlePaddleCollision(paddle) {
		if (this.moveX === DIRECTION.LEFT) {
			this.x = paddle.getX() + this.width
			this.moveX = DIRECTION.RIGHT
		} else {
			this.x = paddle.getX() - this.width
			this.moveX = DIRECTION.LEFT
		}
		beep1.play()
	}

	handleWallCollision(canvas) {
		if (this.y <= 0) this.moveY = DIRECTION.DOWN
		else if (this.y >= canvas.height - this.height) this.moveY = DIRECTION.UP
	}

	handleVerticalMovement(delta) {
		if (this.moveY === DIRECTION.UP) this.y -= this.speedY * delta
		else if (this.moveY === DIRECTION.DOWN) this.y += this.speedY * delta
	}

	handleHorizontalMovement(delta) {
		if (this.moveX === DIRECTION.LEFT) this.x -= this.speedX * delta
		else if (this.moveX === DIRECTION.RIGHT) this.x += this.speedX * delta
	}

	getRandomDirection() {
		return Math.round(Math.random()) ? DIRECTION.UP : DIRECTION.DOWN
	}

	handleServe(server, direction) {
		this.moveX = direction
		this.moveY = this.getRandomDirection()
		this.y = server.y + server.height / 2
		this.x =
			server.x + (direction === DIRECTION.LEFT ? -server.width : server.width)
	}

	update(canvas, delta) {
		this.handleVerticalMovement(delta)
		this.handleHorizontalMovement(delta)
		this.handleWallCollision(canvas)
	}

	draw(context) {
		context.fillRect(
			this.x - this.width / 2,
			this.y - this.height / 2,
			this.width,
			this.height,
		)
	}
}

// ─── Paddle ───────────────────────────────────────────────────────────────────

class Paddle {
	constructor({ x, y }) {
		this.x = x
		this.y = y
		this.width = 20
		this.height = 100
		this.score = 0
		this.speed = 500
		this.movement = DIRECTION.IDLE
	}

	addScore() {
		this.score += 1
	}
	getScore() {
		return this.score
	}
	getX() {
		return this.x
	}
	getY() {
		return this.y
	}

	draw(context) {
		context.fillStyle = COLOURS.WHITE
		context.fillRect(this.x, this.y, this.width, this.height)
	}
}

// ─── PaddleBot ────────────────────────────────────────────────────────────────

class PaddleBot extends Paddle {
	SPEED_INCREMENT = 20

	constructor(parameters) {
		super(parameters)
	}

	levelUp() {
		this.score = 0
		this.speed += this.SPEED_INCREMENT
	}

	handleUpMovement(delta, target) {
		if (this.y > target.y - this.height / 2) {
			this.y -=
				(target.moveX === DIRECTION.RIGHT ? this.speed : this.speed / 4) * delta
		}
	}

	handleDownMovement(delta, target) {
		if (this.y < target.y - this.height / 2) {
			this.y +=
				(target.moveX === DIRECTION.RIGHT ? this.speed : this.speed / 4) * delta
		}
	}

	handleWallCollision(canvas) {
		if (this.y >= canvas.height - this.height)
			this.y = canvas.height - this.height
		else if (this.y <= 0) this.y = 0
	}

	update(canvas, target, delta) {
		this.handleUpMovement(delta, target)
		this.handleDownMovement(delta, target)
		this.handleWallCollision(canvas)
	}
}

// ─── Player ───────────────────────────────────────────────────────────────────

class Player extends Paddle {
	SPEED_INCREMENT = 20

	constructor(parameters) {
		super(parameters)
		this.speed = 700
	}

	move(direction) {
		this.movement = direction
	}

	levelUp() {
		this.score = 0
		this.speed += this.SPEED_INCREMENT
	}

	handleMovement(delta) {
		if (this.movement === DIRECTION.UP) this.y -= this.speed * delta
		else if (this.movement === DIRECTION.DOWN) this.y += this.speed * delta
	}

	handleWallCollision(canvas) {
		if (this.y <= 0) this.y = 0
		else if (this.y >= canvas.height - this.height)
			this.y = canvas.height - this.height
	}

	update(canvas, delta) {
		this.handleMovement(delta)
		this.handleWallCollision(canvas)
	}
}

// ─── React Component ──────────────────────────────────────────────────────────

const CANVAS_W = 1800
const CANVAS_H = 1100
const WALL_OFFSET = 150
const TURN_DELAY_MS = 1000

function PongGame() {
	const canvasRef = useRef(null)

	// All mutable game state lives in one ref — no re-renders mid-loop
	const G = useRef(null)

	const [uiState, setUiState] = useState({
		phase: "idle", // idle | playing | gameover
		message: "",
		round: 1,
		totalRounds: ROUNDS.length,
		scoreA: 0,
		scoreB: 0,
		roundTarget: ROUNDS[0],
	})

	// ── Helpers ──────────────────────────────────────────────────────────────

	const getRandomColour = (available) => {
		const index = Math.floor(Math.random() * available.length)
		const colour = available[index] || COLOURS.DEFAULT
		available.splice(index, 1)
		return colour
	}

	const hasCollision = (ball, paddle) =>
		ball.x < paddle.x + paddle.width &&
		ball.x + ball.width > paddle.x &&
		ball.y < paddle.y + paddle.height &&
		ball.y + ball.height > paddle.y

	const isTurnDelayOver = () =>
		performance.now() - G.current.timer >= TURN_DELAY_MS

	const getServeDirection = () =>
		G.current.playerTurn === G.current.playerA
			? DIRECTION.RIGHT
			: DIRECTION.LEFT

	// ── Draw ─────────────────────────────────────────────────────────────────

	const draw = (canvas, ctx) => {
		const g = G.current

		ctx.clearRect(0, 0, canvas.width, canvas.height)

		// Background — changes colour per round
		ctx.fillStyle = g.colour
		ctx.fillRect(0, 0, canvas.width, canvas.height)

		// Paddles
		g.playerA.draw(ctx)
		g.playerB.draw(ctx)

		// Ball — only visible after serve delay
		if (isTurnDelayOver()) {
			ctx.fillStyle = COLOURS.WHITE
			g.ball.draw(ctx)
		}

		// Court net
		ctx.beginPath()
		ctx.setLineDash([2, 15])
		ctx.moveTo(canvas.width / 2, canvas.height - WALL_OFFSET)
		ctx.lineTo(canvas.width / 2, WALL_OFFSET)
		ctx.lineWidth = 10
		ctx.strokeStyle = COLOURS.WHITE
		ctx.stroke()
		ctx.setLineDash([])

		// Scores
		ctx.fillStyle = COLOURS.WHITE
		ctx.font = "100px 'W95 Sans Serif', Courier New, monospace"
		ctx.textAlign = "center"
		ctx.fillText(g.playerA.getScore(), canvas.width / 2 - 300, 200)
		ctx.fillText(g.playerB.getScore(), canvas.width / 2 + 300, 200)

		// Round info
		ctx.font = "25px 'W95 Sans Serif', Courier New, monospace"
		ctx.fillText(
			`ROUND ${g.round + 1} OF ${ROUNDS.length}`,
			canvas.width / 2,
			45,
		)
		ctx.font = "30px 'W95 Sans Serif', Courier New, monospace"
		ctx.fillText(`${ROUNDS[g.round]} TO WIN`, canvas.width / 2, 100)
	}

	// ── Update ────────────────────────────────────────────────────────────────

	const update = (canvas, delta) => {
		const g = G.current

		g.ball.update(canvas, delta)
		g.playerB.update(canvas, g.ball, delta)
		g.playerA.update(canvas, delta)

		if (g.ball.isOutOfLeftBounds()) resetTurn(g.playerB, g.playerA)
		else if (g.ball.isOutOfRightBounds(canvas)) resetTurn(g.playerA, g.playerB)

		if (isTurnDelayOver() && g.playerTurn) {
			g.ball.handleServe(g.playerTurn, getServeDirection())
			g.playerTurn = null
		}

		if (hasCollision(g.ball, g.playerA)) g.ball.handlePaddleCollision(g.playerA)
		if (hasCollision(g.ball, g.playerB)) g.ball.handlePaddleCollision(g.playerB)

		// Round won by player
		if (g.playerA.getScore() >= ROUNDS[g.round]) {
			if (!ROUNDS[g.round + 1]) {
				// Game over — player wins
				g.gameOver = true
				setUiState((prev) => ({
					...prev,
					phase: "gameover",
					message: "You win!",
				}))
			} else {
				levelUp()
			}
		} else if (g.playerB.getScore() >= ROUNDS[g.round]) {
			// Game over — CPU wins
			g.gameOver = true
			setUiState((prev) => ({
				...prev,
				phase: "gameover",
				message: "Game over!",
			}))
		}
	}

	const resetTurn = (winner, loser) => {
		const g = G.current
		g.ball.reset()
		g.playerTurn = loser
		g.timer = performance.now()
		winner.addScore()
		beep2.play()
		setUiState((prev) => ({
			...prev,
			scoreA: g.playerA.getScore(),
			scoreB: g.playerB.getScore(),
		}))
	}

	const levelUp = () => {
		const g = G.current
		g.round += 1
		g.playerA.levelUp()
		g.playerB.levelUp()
		g.ball.levelUp()
		g.colour = getRandomColour(g.availableColours)
		beep3.play()
		setUiState((prev) => ({
			...prev,
			round: g.round + 1,
			scoreA: 0,
			scoreB: 0,
			roundTarget: ROUNDS[g.round],
		}))
	}

	// ── Game loop ─────────────────────────────────────────────────────────────

	const loop = (canvas, ctx, lastFrameRef, rafRef) => {
		if (G.current.paused || G.current.gameOver) return

		const now = performance.now()
		const delta = (now - lastFrameRef.current) / 1000

		if (delta >= 1 / 60) {
			lastFrameRef.current = now
			update(canvas, delta)
			draw(canvas, ctx)
		}

		rafRef.current = requestAnimationFrame(() =>
			loop(canvas, ctx, lastFrameRef, rafRef),
		)
	}

	// ── Init ──────────────────────────────────────────────────────────────────

	const initGame = () => {
		const canvas = canvasRef.current
		if (!canvas) return

		const availableColours = [...ROUND_COLOURS]

		G.current = {
			playerA: new Player({ x: WALL_OFFSET, y: canvas.height / 2 }),
			playerB: new PaddleBot({
				x: canvas.width - WALL_OFFSET,
				y: canvas.height / 2,
			}),
			ball: new Ball({ x: canvas.width / 2, y: canvas.height / 2 }),
			round: 0,
			gameOver: false,
			paused: false,
			playerTurn: null, // set after init
			timer: performance.now(),
			colour: COLOURS.DEFAULT,
			availableColours,
		}

		// loser serves first — start with playerB serving
		G.current.playerTurn = G.current.playerB

		setUiState({
			phase: "playing",
			message: "",
			round: 1,
			totalRounds: ROUNDS.length,
			scoreA: 0,
			scoreB: 0,
			roundTarget: ROUNDS[0],
		})
	}

	// ── Start / restart ───────────────────────────────────────────────────────

	const handleStart = () => {
		initGame()
	}

	// ── Key listeners ─────────────────────────────────────────────────────────

	useEffect(() => {
		const down = (e) => {
			if (!G.current) return

			if (e.key === "ArrowUp") {
				e.preventDefault()
				G.current.playerA.move(DIRECTION.UP)
			}
			if (e.key === "ArrowDown") {
				e.preventDefault()
				G.current.playerA.move(DIRECTION.DOWN)
			}
		}

		const up = (e) => {
			if (!G.current) return
			if (e.key === "ArrowUp" || e.key === "ArrowDown") {
				G.current.playerA.move(DIRECTION.IDLE)
			}
		}

		window.addEventListener("keydown", down)
		window.addEventListener("keyup", up)
		return () => {
			window.removeEventListener("keydown", down)
			window.removeEventListener("keyup", up)
		}
	}, [])

	// ── Canvas setup & idle screen ────────────────────────────────────────────

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext("2d", { alpha: false })

		// Draw idle screen
		ctx.fillStyle = COLOURS.DEFAULT
		ctx.fillRect(0, 0, canvas.width, canvas.height)
		ctx.fillStyle = COLOURS.WHITE
		ctx.font = "bold 120px 'W95 Sans Serif', Courier New, monospace"
		ctx.textAlign = "center"
		ctx.fillText("PONG", canvas.width / 2, canvas.height / 2)
		ctx.font = "40px 'W95 Sans Serif', Courier New, monospace"
		ctx.fillStyle = "rgba(255,255,255,0.5)"
		ctx.fillText(".EXE", canvas.width / 2, canvas.height / 2 + 60)
	}, [])

	// ── Start loop when game initialises ─────────────────────────────────────

	useEffect(() => {
		if (uiState.phase !== "playing" || !G.current) return

		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext("2d", { alpha: false })

		const lastFrameRef = { current: performance.now() }
		const rafRef = { current: null }

		rafRef.current = requestAnimationFrame(() =>
			loop(canvas, ctx, lastFrameRef, rafRef),
		)

		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [uiState.phase])

	// ─── Render ───────────────────────────────────────────────────────────────

	return (
		<div className="pong-wrapper">
			<canvas
				ref={canvasRef}
				width={CANVAS_W}
				height={CANVAS_H}
				className="pong-canvas"
			/>

			{uiState.phase === "idle" && (
				<div className="pong-overlay">
					<div className="pong-overlay-card">
						<p className="pong-overlay-title">
							PONG<span>.EXE</span>
						</p>
						<p className="pong-overlay-sub">
							{ROUNDS.length} rounds · score changes each round
						</p>
						<p className="pong-overlay-sub">↑ ↓ to move your paddle</p>
						<button className="pong-btn" onClick={handleStart}>
							New Game
						</button>
					</div>
				</div>
			)}

			{uiState.phase === "gameover" && (
				<div className="pong-overlay">
					<div className="pong-overlay-card">
						<p className="pong-overlay-title">
							{uiState.message === "You win!" ? (
								<span className="pong-you-scored">You win!</span>
							) : (
								<span className="pong-cpu-scored">Game over!</span>
							)}
						</p>
						<p className="pong-overlay-score">
							<span className="pong-score-you">{uiState.scoreA}</span>
							<span className="pong-score-sep"> — </span>
							<span className="pong-score-cpu">{uiState.scoreB}</span>
						</p>
						<button className="pong-btn" onClick={handleStart}>
							Play Again
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default PongGame
