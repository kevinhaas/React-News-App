/*
 * Created by Kevo on 6/17/2016.
 */

import React from "react";
import NavBar from "../components/navbar";
// import Home from "../components/home";

class App extends React.Component {
	render() {
		return(
			<div>
				<NavBar history={this.props.history} />
				{this.props.children}
			</div>
		);
	}
}

export default App;