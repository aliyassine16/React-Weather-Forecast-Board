import MainSubNote from './MainSubNote';
import SubNote from './SubNote';

var DayWeather =React.createClass({


	componentWillMount:function(){

	},

	componentDidMount:function(){
		$(this.getDOMNode()).draggable();
	},


	render:function(){
		return(
			
			<div className="oneDayWeather" >
			<MainSubNote title={this.props.dayForecast.day}
						 date={this.props.dayForecast.date}
						 icon={this.props.dayForecast.icon}
						 description={this.props.dayForecast.note}
						 temperature={this.props.dayForecast.temperature}
			 />
			<SubNote allDayData={this.props.allDayData}  />

			</div>



			);

	}
});

export default DayWeather;