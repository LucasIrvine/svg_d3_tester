	$(document).ready(function(){
		var jsonData = {
			"x" : [],
			"y" : [],
			"clusterId" : []
		},
		
		posNeg = [600,-600];

		function makePoints(num){
			
			for (var r = 0; r < num; r++) {
				
				var pointsObj = {
						x : Math.floor(Math.random() * posNeg[Math.floor(Math.random()*2)]),
						y : Math.floor(Math.random() * posNeg[Math.floor(Math.random()*2)]),
				clusterId : colors[Math.floor(Math.random()*colors.length)]

				jsonData.x.push(Math.floor(Math.random() * posNeg[Math.floor(Math.random()*2)]));
				jsonData.y.push(Math.floor(Math.random() * posNeg[Math.floor(Math.random()*2)]));
				jsonData.clusterId.push(Math.floor(Math.random() * 50));

				};
				
				console.log(jsonData);
			}
		}


		function makePoints(1000);

	});