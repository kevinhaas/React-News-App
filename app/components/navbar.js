/*
 * Created by Kevo on 6/14/2016.
 */

import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router";
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from "react-bootstrap";
import ArticleList from "./article-list";

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
							<small>powered by React</small>
							</strong>
						</Link>

					</Navbar.Brand>

					<Navbar.Toggle />

				</Navbar.Header>

				<Navbar.Collapse>
					<Nav pullRight>

						<NavItem eventKey={1} onClick={this.handleClick.bind(this)}><Link to="/">Latest</Link></NavItem>

						<NavItem eventKey={1}><Link to="/favorite">Favorites</Link></NavItem>

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