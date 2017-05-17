import moment from 'moment';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

var SubNote =React.createClass({

	render:function(){
		console.log("subnote data",this.props.allDayData);

		const mylist= this.props.allDayData.map((item, i)=>{			
			
			return <div className="otherUnits" key={i}>
			<div className="unit">
			<span>{moment.unix(item.dt).format('LT')} |</span>	
			<span> {item.main.temp} &#x2103;</span>
			<span> <img alt="" src={"http://openweathermap.org/img/w/"+item.weather[0].icon+".png"} /> </span>	
			</div>	
			</div>

		});

		return (
			<section>{mylist}</section>
			);

	}
});

export default SubNote;