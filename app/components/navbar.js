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
			articleRes: []
		}
	}

	componentDidMount() {
		console.log("navbar component mounted!");
	}

	render() {

		console.log(this.state);

		return (

			<Navbar className="navbar-fixed-top" inverse>

				<Navbar.Header>

					<Navbar.Brand>
						<Link to="/">
							<strong id="navTitle">NYT Search
							<br />
							<small>powered by <strong className="reactColor">React</strong></small>
							</strong>
						</Link>

					</Navbar.Brand>

					<Navbar.Toggle />

				</Navbar.Header>

				<Navbar.Collapse>

					<Nav pullRight>

                        <div id="navDiv">
                            <Link to="/">
                                <span className="navLink" id="latestNavLink" eventKey={1}><i>Latest</i></span>
                            </Link>

                                <span className="navLink reactColor">|</span>

                            <Link to="/favorite">
                                <span className="navLink" eventKey={1}><i>Favorites</i></span>
                            </Link>
                        </div>

					</Nav>

				</Navbar.Collapse>

			</Navbar>
		);
	};
}

export default NavBar;