/*
 * Created by Kevo on 6/14/2016.
 */

import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router";
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			articleRes: [],
			searchQuery: [],
			propTest: "propTest"
		}
	}

	componentDidMount() {
		console.log("navbar component mounted!");
	}

	componentWillUnmount() {
		console.log("navbar component unMounted")
	}

	onChange() {

	}

	handleClick() {

	}

	handleSubmit(event) {
	}

	render() {

		console.log(this.state);

		return (

			<Navbar inverse>

				<Navbar.Header>

					<Navbar.Brand>
						<Link to="/">
							<strong id="navTitle">NYT Search
							<br />
							<small>powered by <strong id="navTitleReact">React</strong></small>
							</strong>
						</Link>

					</Navbar.Brand>

					<Navbar.Toggle />

				</Navbar.Header>

				<Navbar.Collapse>

					<Nav pullRight>

                        <LinkContainer to="/">
                            <NavItem id="test" eventKey={1} onClick={this.handleClick.bind(this)}>Latest</NavItem>
                        </LinkContainer>

                        <LinkContainer to="/favorite">
                            <NavItem eventKey={1}>Favorites</NavItem>
                        </LinkContainer>
                        
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