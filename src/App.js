import React, { Component } from "react";
import Drumpad from "./components/Drumpad";
import "./App.css";

const bankOne = [
	{
		keyCode: 81,
		keyTrigger: "Q",
		id: "Heater-1",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
	},
	{
		keyCode: 87,
		keyTrigger: "W",
		id: "Heater-2",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
	},
	{
		keyCode: 69,
		keyTrigger: "E",
		id: "Heater-3",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
	},
	{
		keyCode: 65,
		keyTrigger: "A",
		id: "Heater-4",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
	},
	{
		keyCode: 83,
		keyTrigger: "S",
		id: "Clap",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
	},
	{
		keyCode: 68,
		keyTrigger: "D",
		id: "Open-HH",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
	},
	{
		keyCode: 90,
		keyTrigger: "Z",
		id: "Kick-n'-Hat",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
	},
	{
		keyCode: 88,
		keyTrigger: "X",
		id: "Kick",
		url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
	},
	{
		keyCode: 67,
		keyTrigger: "C",
		id: "Closed-HH",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
	}
];

const bankTwo = [
	{
		keyCode: 81,
		keyTrigger: "Q",
		id: "Chord-1",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
	},
	{
		keyCode: 87,
		keyTrigger: "W",
		id: "Chord-2",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
	},
	{
		keyCode: 69,
		keyTrigger: "E",
		id: "Chord-3",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
	},
	{
		keyCode: 65,
		keyTrigger: "A",
		id: "Shaker",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
	},
	{
		keyCode: 83,
		keyTrigger: "S",
		id: "Open-HH",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
	},
	{
		keyCode: 68,
		keyTrigger: "D",
		id: "Closed-HH",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
	},
	{
		keyCode: 90,
		keyTrigger: "Z",
		id: "Punchy-Kick",
		url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
	},
	{
		keyCode: 88,
		keyTrigger: "X",
		id: "Side-Stick",
		url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
	},
	{
		keyCode: 67,
		keyTrigger: "C",
		id: "Snare",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
	}
];

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			bank: 1,
			power: 1,
			volume: 0.5
		};
	}

	displayDrumpad() {
		let drumpads = [];
		let chosenBank = this.state.bank === 1 ? bankOne : bankTwo;
		chosenBank.forEach((padData, index) => {
			drumpads.push(<Drumpad padData={padData} key={index} />);
		});
		return drumpads;
	}

	toggleBankPower(e) {
		let btn = e.target.id.split("-")[0];

		if (btn === "power") {
			if (this.state.power === 1) {
				this.setState({ power: 0 });
			} else {
				this.setState({ power: 1 });
			}
		} else if (btn === "bank") {
			this.state.bank === 1
				? this.setState({ bank: 2 })
				: this.setState({ bank: 1 });
		}
	}

	changeVolume(e) {
		this.setState({ volume: e.target.value / 100 });
	}

	playPad(pad) {
		if (this.state.power !== 0) {
			let audio = pad.childNodes[1];
			// console.log(pad.childNodes);
			audio.play();
			console.log(audio.volume);

			this.controlScreen.innerText = pad.dataset.name;
		}
	}

	manualHover(pad) {
		pad.classList.add("hover");
		setTimeout(() => {
			pad.classList.remove("hover");
		}, 200);
	}

	componentDidMount() {
		//Add eventListeners for each drumpad click and keyCode press

		this.drumpadList = document.getElementsByClassName("drum-pad");
		this.controlScreen = document.getElementById("controls-screen");
		this.bankBtns = document.getElementsByClassName("bank-btns");
		this.powerBtns = document.getElementsByClassName("power-btns");
		this.audioList = document.getElementsByTagName("audio");
		console.log(this.audioList);

		let keyCodeList = [];

		[...this.drumpadList].forEach(pad => {
			pad.addEventListener("click", () => this.playPad(pad));
			keyCodeList.push(parseInt(pad.dataset.key));
		});

		// init bank sounds
		document.addEventListener("keydown", e => {
			if (keyCodeList.includes(e.keyCode)) {
				// console.log("yes");
				let selectedPad = [...this.drumpadList].filter(pad => {
					return pad.dataset.key == e.keyCode;
				})[0];

				this.playPad(selectedPad);
				this.manualHover(selectedPad);
			}
		});

		// Hide non-selected power, bank
		if (this.state.power === 1) {
			this.powerBtns[0].classList.add("hide");
		} else {
			this.powerBtns[1].classList.add("hide");
		}

		if (this.state.bank === 1) {
			this.bankBtns[1].classList.add("hide");
		} else {
			this.bankBtns[0].classList.add("hide");
		}

		// Add EL for volume Slider
	}

	componentDidUpdate(prevProps, prevState) {
		// Add EL for bank toggle
		// Add EL for power toggle
		if (this.state.power !== prevState.power) {
			this.powerBtns[1].classList.toggle("hide");
			this.powerBtns[0].classList.toggle("hide");

			if (this.state.power === 1) {
				//switch on
			}
		}

		if (this.state.bank !== prevState.bank) {
			this.bankBtns[0].classList.toggle("hide");
			this.bankBtns[1].classList.toggle("hide");
		}

		if (this.state.volume !== prevState.volume) {
			[...this.audioList].forEach(aud => {
				aud.volume = this.state.volume;
			});

			this.controlScreen.innerText = "Volume: " + this.state.volume;
		}
	}

	render() {
		return (
			<div id="drum-machine" className="App">
				<h2 id="drum-title">FCC Drumset!</h2>
				<div id="display">
					<div id="display-drumpads">{this.displayDrumpad()}</div>
					<div id="display-controls">
						<div id="controls-power" onClick={e => this.toggleBankPower(e)}>
							<h3>Power</h3>

							<div id="power-0" className="power-btns" />
							<div id="power-1" className="power-btns" />
						</div>
						<div id="controls-screen">Name Here</div>
						<div id="controls-volume">
							<input
								id="volume-control"
								min="0"
								max="100"
								defaultValue="50"
								type="range"
								onChange={e => this.changeVolume(e)}
							/>
						</div>
						<div id="controls-bank" onClick={e => this.toggleBankPower(e)}>
							<h3>Bank</h3>

							<div id="bank-1" className="bank-btns" />
							<div id="bank-2" className="bank-btns" />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
