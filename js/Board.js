import moment from 'moment';
import DayWeather from './DayWeather';



var Board=React.createClass({

	dayForecastContainer:[],

	getInitialState:function(){
		
		return {
			notes:[]			
		};

	},
	getTheMap:function(data){
		const map = new Map();
		data.list.forEach((item) => {
			const key = moment.unix(item.dt).format("dddd");
			if (!map.has(key)) {
				map.set(key, [item]);
			} else {
				map.get(key).push(item);
			}

		});
		return map;

	},

	processWeatherData:function(data){

		var map=this.getTheMap(data);				
		var counter=0;
		map.forEach((value, key, map)=> {
			if(counter==0){
				this.addDayForecast(value[0],value);
			}else{
				console.log("index=",Math.floor(value.length/2));
				this.addDayForecast(value[Math.floor(value.length/2)],value);
			}
			counter++;
		});
		this.updateUI();


	},
	
	componentWillMount:function(){
		var self=this;		
		if(this.props.city){

			var url="http://api.openweathermap.org/data/2.5/forecast?&type=accurate&units=metric&q="+this.props.city+"&appid=fd21f7a3e4f3101954bee3ee68df7c8e"
			$.ajax({ 
				url: url,  
				success: self.processWeatherData, 
			  	timeout: 5000, //5 second timeout, 
			  	error: function(jqXHR, status, errorThrown){   //the status returned will be "timeout" 			     
			  	console.log(errorThrown);
			  	alert("Connection Error: !");
			  } 
			}); 
		}

	},


	generateWeatherUnit:function(wUnit,allDayWeather){
		console.log(allDayWeather);
		var weather=wUnit.weather[0];
		return {
			id:wUnit.dt,
			date:moment.unix(wUnit.dt).format("MMM Do YY"),
			day:moment.unix(wUnit.dt).format("dddd"),
			main:weather.main,
			note:weather.description,
			icon:"http://openweathermap.org/img/w/"+weather.icon+".png",
			temperature:wUnit.main.temp,
			allDayWeather:allDayWeather

		}

	},
	updateUI:function(){
		
		this.setState({notes:this.dayForecastContainer});
	},

	addDayForecast:function(wUnit,allDayWeather){				
		this.dayForecastContainer.push(this.generateWeatherUnit(wUnit,allDayWeather));
	},


	eachNote:function(note,i){
		return(
			<DayWeather key={note.id} 
			dayForecast={note}  
			index={i} 
			allDayData={note.allDayWeather}>
			</DayWeather>
			);
	},

	render:function(){
		return(
			
			<div className="board">
			<h1>{this.props.title} {this.props.city}</h1>
			{this.state.notes.map(this.eachNote)}			
			</div>

			);
	}
});


React.render(<Board title="Weather Forecast in the city of "  city="London,uk" />,document.body);