import moment from 'moment';
import Note from './Note';



var Board=React.createClass({


	getInitialState:function(){
		return {
			notes:[]			
		};

	},
	getMeTheMap:function(data){
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
	componentWillMount:function(){
		var self=this;
		if(this.props.city){
			var url="http://api.openweathermap.org/data/2.5/forecast?&type=accurate&units=metric&q="+this.props.city+"&appid=fd21f7a3e4f3101954bee3ee68df7c8e"



			$.getJSON(url,function(data){
				var map=self.getMeTheMap(data);				
				var counter=0;
				map.forEach((value, key, map)=> {
					if(counter==0){
						self.add(value[0],value);
					}else{
						console.log("index=",Math.floor(value.length/2));
						self.add(value[Math.floor(value.length/2)],value);
					}
					counter++;
				});
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
	add:function(wUnit,allDayWeather){
		var arr=this.state.notes;		
		arr.push(this.generateWeatherUnit(wUnit,allDayWeather));
		this.setState({notes:arr});
	},


	eachNote:function(note,i){
		return(
			<Note key={note.id} date={note.note}  icon={note.icon} temperature={note.temperature} index={i} allDayData={note.allDayWeather}>{note.day}<br />{note.date}</Note>
			);
	},

	render:function(){
		return(

			<div className="board">
			{this.state.notes.map(this.eachNote)}			
			</div>

			);
	}
});


React.render(<Board  city="London,uk" />,document.body);