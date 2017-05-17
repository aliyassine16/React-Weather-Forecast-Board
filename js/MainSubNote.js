
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

var MainSubNote =React.createClass({
	
	render:function(){
		return(

			<div className="mainUnit">
			<div >{this.props.title}</div>
			<div>{this.props.date}</div>
			<div>{this.props.description}</div>
			<div >
			<span>{this.props.temperature} &#x2103;</span>
			<span><img alt="" src={this.props.icon} /></span>
			</div>
			</div>	
			);

	}
});


export default MainSubNote;
