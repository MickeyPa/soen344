import {Component} from "react";
import React from "react";
import HomepagePatient from "./HomepagePatient";
import HomepageDoctor from "./HomepageDoctor";
import HomepageNurse from "./HomepageNurse";

class Homepage extends Component {
    constructor(props) {
        super(props)
    }

    render(){
        let homepage;
           if (typeof(this.props.user.hcnumber) !== 'undefined') {
            homepage = <div>
                <HomepagePatient user={this.props.user}/>
            </div>
        //if doc is logged in
        } else if (typeof(this.props.user.permit_number) !== 'undefined') {
            homepage = <div>
                <HomepageDoctor user={this.props.user}/>
            </div>
        //if nurse is logged in
        } else if (typeof(this.props.user.access_ID) !== 'undefined') {
            homepage = <div>
                <HomepageNurse user={this.props.user}/>
            </div>
        //if admin is logged in
        } else {
               homepage = <div>
                <p></p>
            </div>
        }
           return homepage;
    }
}

export default Homepage;