const img_sheet = new Image();
img_sheet.src = "src/sheet.png";

const aCtx = new AudioContext();
function loadAudio(src) {
	const obj = { play: audioPlayMethod };
	loadAudioBuffer(obj, src);
	return obj;
}
function audioPlayMethod() {
	if (!this.buffer) return;
	const node = aCtx.createBufferSource();
	node.buffer = this.buffer;
	node.connect(aCtx.destination);
	node.start();
}
async function loadAudioBuffer(obj, src) {
	const response = await fetch(src);
	obj.buffer = await aCtx.decodeAudioData(await response.arrayBuffer());
}

const snd_clock_1 = loadAudio("src/clock_1.wav"),
	snd_clock_2 = loadAudio("src/clock_2.wav"),
	snd_clock = [snd_clock_1, snd_clock_2],
	snd_jump = loadAudio("src/jump.wav"),
	snd_jingle = new Audio("src/jingle.wav");

const favicon = document.getElementById("favicon"),
	canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d");

var clock = 0, lastTimestamp;

function MAIN(timestamp) {
	if (lastTimestamp) Math.min(clock += (timestamp - lastTimestamp) / 16, 10);
	lastTimestamp = timestamp;
	
	if (endCard.active) {
		endCard.MAIN();
		if (clock >= 360) return;
	} else clockFace.MAIN();
	
	requestAnimationFrame(MAIN);
}

const clockFace = {
	ticks: 0,
	eyePeriod: 25,
	lastEyeX: 0,
	lastEyeVelocity: 0,
	showEyes: true,
	
	MAIN() {
		if (this.showEyes) {
			let eyeY = 0;
			
			if (this.ticks >= 4) {
				if (this.ticks < 200) {
					if (this.ticks >= 12) {
						if (!this.eyePeriodDecreaseStart) this.eyePeriodDecreaseStart = clock;
						this.eyePeriod = 25 - (clock - this.eyePeriodDecreaseStart) / 100;
						
						if (this.ticks == 20) document.title = "...";
						else if (this.ticks == 50) favicon.href = "src/dirty.ico";
					}
					eyeY = Math.sin(clock / this.eyePeriod + 1.57) * 5;
					
					if (this.ticks < 8) eyeY = Math.abs(eyeY);
				} else {
					snd_jump.play();
					this.showEyes = false;
					clock = 0;
					favicon.href = "src/black.ico";
					document.title = "Time stopped.";
				}
			}
			
			const eyeX = Math.sin(clock / this.eyePeriod) * 15;
			const thisVelocity = eyeX - this.lastEyeX;
			
			if (this.lastEyeX != 0 && Math.sign(this.lastEyeVelocity) != Math.sign(thisVelocity)) {
				this.ticks++;
				
				const clockSound = snd_clock[this.ticks % 2];
				clockSound.currentTime = 0;
				clockSound.play();
			}
			
			this.lastEyeX = eyeX;
			this.lastEyeVelocity = thisVelocity;
			
			ctx.translate(Math.round(eyeX), Math.round(eyeY));
			ctx.drawImage(img_sheet, 216, 0, 88, 47, 16, 143, 88, 47);
			ctx.drawImage(img_sheet, 216, 0, 88, 47, 106, 143, 88, 47);
			ctx.resetTransform();
		} else {
			if (clock > 150) {
				canvas.style.top = (Math.pow(clock - 150, 2) / 17).toString() + "px";
				
				if (canvas.offsetTop > document.body.offsetHeight) {
					ctx.clearRect(0, 0, 216, 292);
					
					clock = 0;
					canvas.style.top = "0px";
					document.title = "...";
					endCard.active = true;
					return;
				}
			}
			
			ctx.fillStyle = "#000";
			ctx.fillRect(0, 0, 216, 292);
		}
		
		ctx.drawImage(img_sheet, 0, 0, 216, 292, 0, 0, 216, 292);
	}
}

const endCard = {
	active: false,
	finished: false,
	
	clampAlpha: value => Math.max(Math.min(value, 1), 0),
	MAIN() {
		ctx.globalAlpha = 1;
		ctx.drawImage(img_sheet, 304, 0, 216, 292, 0, 0, 216, 292);
		
		ctx.fillStyle = "#fff";
		ctx.globalAlpha = this.clampAlpha(2 - clock / 40);
		ctx.fillRect(0, 0, 216, 60);
		ctx.globalAlpha = this.clampAlpha(6 - clock / 40);
		ctx.fillRect(0, 60, 216, 60);
		ctx.globalAlpha = this.clampAlpha(9 - clock / 40);
		ctx.fillRect(0, 120, 216, 200);
		
		if (!this.finished && clock >= 320) {
			document.getElementById("canvasLink").href = "https://doubledenial.neocities.org";
			snd_jingle.play();
			favicon.href = "src/normal.ico";
			document.title = "DOUBLEDENIAL";
			
			this.finished = true;
		}
	}
}

img_sheet.addEventListener("load", function() {
	ctx.drawImage(img_sheet, 216, 0, 88, 47, 16, 143, 88, 47);
	ctx.drawImage(img_sheet, 216, 0, 88, 47, 106, 143, 88, 47);
	ctx.drawImage(img_sheet, 0, 0, 216, 292, 0, 0, 216, 292);
	
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 50, 216, 17);
	
	ctx.font = "15px Verdana, sans-serif";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillStyle = "#000";
	ctx.fillText("Click me to begin.", 108, 59);
	window.addEventListener("click", function() { requestAnimationFrame(MAIN); }, { passive: true, once: true });
}, { passive: true, once: true });