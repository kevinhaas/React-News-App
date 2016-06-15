/*
 * Created by Kevo on 6/15/2016.
 */

import React from "react";
import {Link} from "react-router";

class Footer extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		console.log("footer component mounted!");
	}

	componentWillUnmount() {
		console.log("footer component unMounted")
	}

	onChange(state) {
		this.setState(state);
	}

	handleClick() {
		// details here
	}

	render() {
		return(
			<div className="test">
				this is the f00ter
			</div>
		)
	}





}

export default Footer;