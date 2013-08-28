	$(document).ready(function(){
		var jsonData = [],
		colors = ['#61c6d9', '#61d99c', '#a8d54c', '#adaf30', '#c49846', '#c46e46', '#c4464c', '#bf4280', '#bb46c4', '#976dff', '#6d85ff', '#81c2ff', '#83ba99', '#a0ad90', '#ad9090', '#9b90ad', '#88a4b5', '#0ca48a', '#bdbdbd', '#545454'];


		$('#render').on('click', function(){
			$('.mainGraph').html('');
			$('.warning').text('');
			num = $('#numPoints').val();
			
			if(isNaN(num)){
				$('.warning').text('Please enter a valid number...c\'Mon!!');
			}else {
				makePoints(num);
			}
			

		});

		var posNeg = [600,-600];

		function makePoints(num){
			start = new Date().getTime();
			for (var r = 0; r < num; r++) {
				var pointsObj = {
					x : Math.floor(Math.random() * posNeg[Math.floor(Math.random()*2)]),
					y : Math.floor(Math.random() * posNeg[Math.floor(Math.random()*2)]),
					fillColor : colors[Math.floor(Math.random()*colors.length)]
				};
				jsonData.push(pointsObj);
			}
			drawBoard(jsonData);
		}

		function drawBoard(displayedPoints){
			
		//Dimensions, can change to show number scale
			var margin = {top: 0, right: 0, bottom: 0, left: 0},
				width = 1048 - margin.left - margin.right,
				height = 650 - margin.top - margin.bottom;
		//Define scales
			var x = d3.scale.linear()
				.domain([-width / 1.65, width / 1.65])
				.range([0, width]);

			var y = d3.scale.linear()
				.domain([-height, height])
				.range([height, 0]);
		//X axis
			var xAxis = d3.svg.axis()
				.scale(x)
				.orient('bottom')
				.ticks(5)
				.tickSize(-height)
				.tickFormat(d3.format('s'));
		//Y axis
			var yAxis = d3.svg.axis()
				.scale(y)
				.orient('left')
				.ticks(5)
				.tickSize(-width)
				.tickFormat(d3.format('s'));
		
		//Create svg element
			var svg = d3.select('.mainGraph')
				.append('svg')
				.attr({
					'width' : width + margin.left + margin.right,
					'height': height + margin.top + margin.bottom
				})
				.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
				.call(d3.behavior.zoom().x(x).y(y).scaleExtent([1, 50]).on('zoom', zoom));
		
		//draw main board
			svg.append('rect')
				.attr({
					'width': width,
				   'height': height
				});

			svg.append('g')
				.attr({
					'class' : 'x axis',
				 'transform': 'translate(0,' + height + ')'
				})
				.call(xAxis);

			svg.append('g')
				.attr('class', 'y axis')
				.call(yAxis);
		
		//map and draw points
			var circler = svg.selectAll('.circPoint')
				.data(displayedPoints)
				.enter()
				.append('circle')
				 .style('fill', function(d,i){
		        	return d.fillColor;
		        })
		        .attr({
		        	   'class':'circPoint',
		        	      'r' : '3',
		          'transform' : function(d, i) {return 'translate('+x(d.x)+','+y(d.y)+')';},
		        })
		        .on('click', function(d,i){
					displayInfo(d,i)
				});
				
			function zoom() {
				svg.select('.x.axis').call(xAxis);
				svg.select('.y.axis').call(yAxis);
				svg.selectAll('.circPoint, .labeler, .texter')
				.attr('transform', function(d, i) {
					return 'translate('+x(d.x)+','+y(d.y)+')';
				});
			}

			var amount = displayedPoints.length,
			elapsed = new Date().getTime() - start;
			$('p.tester').text('Load time was ' + elapsed + 'ms, with ' + amount + ' data points.');
		}
	});