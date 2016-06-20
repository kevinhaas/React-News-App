/*
 * Created by Kevo on 6/14/2016.
 */

import React from "react";
import {Link} from "react-router";
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from "react-bootstrap";

class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
		console.log("home page component mounted!");
	}

	componentWillUnmount() {
		console.log("home page component unMounted")
	}

	onChange() {
	}

	handleSubmit(event) {
	}

	render() {

		console.log(this.state);

		return (
			<Navbar inverse>

				<Navbar.Header>

					<Navbar.Brand>
						<a href="/">
							<strong id="navTitle">NYT Search
							<br />
							<small>powered by React</small>
							</strong>
						</a>
					</Navbar.Brand>

					<Navbar.Toggle />

				</Navbar.Header>

				<Navbar.Collapse>

					<Nav pullRight>

						<NavItem eventKey={1} href="#">Favorites</NavItem>
						<NavDropdown eventKey={3} title="Categories" id="basic-nav-dropdown">
							<MenuItem eventKey={3.1}>Tech</MenuItem>
							<MenuItem eventKey={3.2}>Music</MenuItem>
							<MenuItem eventKey={3.3}>Food</MenuItem>
							<MenuItem eventKey={3.3}>Sports</MenuItem>
							<MenuItem divider />
							<MenuItem eventKey={3.3}>Add Category</MenuItem>
						</NavDropdown>

					</Nav>

				</Navbar.Collapse>

			</Navbar>
		);
	};
}

export default NavBar;