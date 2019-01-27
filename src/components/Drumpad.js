import React from "react";
class Drumpad extends React.Component {
	render() {
		let data = this.props.padData;
		return (
			<div
				id="drumpad"
				className="drum-pad"
				data-key={data.keyCode}
				data-name={data.id}
			>
				{data.keyTrigger}
				<audio src={data.url} className="clip" />
			</div>
		);
	}
}
export default Drumpad;
