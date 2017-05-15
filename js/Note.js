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
					self.add(value[0],value);
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
			<Note key={note.id} date={note.date}  icon={note.icon} temperature={note.temperature} index={i} allDayData={note.allDayWeather}>{note.day}</Note>
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
			<SubNote allDayData={this.props.allDayData} />

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
		console.log("subnote data",this.props.allDayData);

		const mylist= this.props.allDayData.map((item, i)=>{			
			 
			 return <div className="otherUnits" key={i}>
				<div className="unit">
				<span>{moment.unix(item.dt).format('ddd, hA')} </span>	
				<span> 18 &#x2103;</span>
				<span> <img alt="" src={"http://openweathermap.org/img/w/"+item.weather[0].icon+".png"} /> </span>	
				</div>	
				</div>

		});




		return (
				<div>{mylist}</div>

			);

	}
});


React.render(<Board  city="London,uk" />,document.body);