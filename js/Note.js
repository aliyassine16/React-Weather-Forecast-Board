import moment from 'moment';


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
			var url="http://api.openweathermap.org/data/2.5/forecast?q="+this.props.city+"&appid=fd21f7a3e4f3101954bee3ee68df7c8e"



			$.getJSON(url,function(data){

				var map=self.getMeTheMap(data);
				
				
				map.forEach((value, key, map)=> {
					console.log(`${key}`);
    				// console.log(`m[${key}] = ${value[0]}`);
    				console.log(value[0]);
    				self.add(value[0]);

    			});
				// console.log(map);
				

			});
		}

	},
	generateWeatherUnit:function(wUnit){
		var weather=wUnit.weather[0];
		return {
			id:wUnit.dt,
			date:moment.unix(wUnit.dt).format("MMM Do YY"),
			day:moment.unix(wUnit.dt).format("dddd"),
			main:weather.main,
			note:weather.description,
			icon:"http://openweathermap.org/img/w/"+weather.icon+".png",
			temperature:wUnit.main.temp,
			midDayUnit:{

			},
			allDayUnit:{

			}

		}

	},
	add:function(wUnit){
		var arr=this.state.notes;		
		arr.push(this.generateWeatherUnit(wUnit));
		this.setState({notes:arr});
	},


	eachNote:function(note,i){
		return(
			<Note key={note.id} date={note.date}  icon={note.icon} temperature={note.temperature} index={i}>{note.day}</Note>
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
		$(this.getDOMNode()).draggable();
	},


	render:function(){
		return(
			
			<div className="oneDayWeather" >
			<MainSubNote title={this.props.children} date={this.props.date} icon={this.props.icon} temperature={this.props.temperature} />
			<SubNote />

			</div>



			);

	}
});



var MainSubNote =React.createClass({
	
	render:function(){
		return(

			<div className="mainUnit">
			<div >{this.props.title}</div>
			<div>{this.props.date}</div>
			<div >
			<span>{this.props.temperature} &#x2103;</span>
			<span><img alt="" src={this.props.icon} /></span>
			</div>
			</div>	
			);

	}
});



var SubNote =React.createClass({

	render:function(){
		return(

			<div className="otherUnits">
			<div className="unit">
			<span>21:00</span>	
			<span>18 &#x2103;</span>
			<span><img alt="" src="http://openweathermap.org/img/w/10d.png" /></span>	
			</div>	
			</div>	
			);

	}
});


React.render(<Board  city="London,uk" />,document.body);