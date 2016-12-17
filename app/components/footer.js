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

	onChange(state) {
		this.setState(state);
	}

	render() {
        
		return(

            <footer>
                <div className="container">
                    <div className="row">

                        <div>

                            <div className="col-sm-5">
                                <p>Powered by <span id="nodeFooter"><strong>Node.js</strong></span>, <span id="mongoFooter"><strong>MongoDB</strong></span> and <span id="reactFooter"><strong>React</strong></span></p>

                                <p>© 2016 <a href="http://kevhaas.com" target="#blank">Kevin Haas</a></p>
                            </div>

                        </div>

                    </div>
                </div>
            </footer>

		)
	}
}

export default Footer;
