import MainSubNote from './MainSubNote';
import SubNote from './SubNote';

var Note =React.createClass({

	randomBetween:function(min,max){
		return(min+Math.ceil(Math.random()*max));

	},
	componentWillMount:function(){
		this.style={
			position:'absolute',
			right:this.randomBetween(0,window.innerWidth-200) +'px',
			top:this.randomBetween(0,window.innerHeight-200) +'px',
			transform:'rotate('+this.randomBetween(-15,15)+'deg)'

		}
	},

	componentDidMount:function(){
		//$(this.getDOMNode()).draggable();
	},


	render:function(){
		return(
			
			<div className="oneDayWeather" >
			<MainSubNote title={this.props.children} date={this.props.date} icon={this.props.icon} temperature={this.props.temperature} />
			<SubNote allDayData={this.props.allDayData} />

			</div>



			);

	}
});

export default Note;