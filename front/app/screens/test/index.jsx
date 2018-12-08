import React from 'react';
import * as Redux from 'react-redux';

class Test extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				TEST !!!
			</div>
		)
	}
}

function mapStateToProps(state) {
  return state;
}

export default Redux.connect(mapStateToProps)(Test);
