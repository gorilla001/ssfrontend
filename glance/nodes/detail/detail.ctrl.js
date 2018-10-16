(function () {
    'use strict';
    angular.module('glance.node')
        .controller('DetailNodeCtrl', DetailNodeCtrl);

    /* @ngInject */
    function DetailNodeCtrl(gHttp, $stateParams, $timeout) {
        var self = this;

	self.node = {};
	self.nodeString = "";

	self.node_id = $stateParams.node_id;
	

	gHttp.Resource('node.detail', {node_id: $stateParams.node_id}).get().then(function(data) {
		self.node = data.data;
		self.nodeString = JSON.stringify(data.data,null,2);
		//document.getElementById("basic").innerHTML = JSON.stringify(data.data,null,'\t');
	});

	self. diskData = {
    		datasets: [{
        		data: [11403740, 40070284], 
			backgroundColor: ['rgb(51,204,102)', 'rgb(255, 99, 132)'],
    		}],

    		// These labels appear in the legend and in the tooltips when hovering different arcs
    		//labels: [
    		//    '已使用',
    		//    '剩余',
    		//]
	};

	$timeout(function () {
	var ctx = document.getElementById("diskChart");
        new Chart(ctx, {
		type: 'pie',
		data: self.diskData,
	}), 300});

	var cpuData = {
            datasets: [{
		data: [2, 98],
		backgroundColor: ['rgb(51,204,102)', 'rgb(255, 99, 132)'],
	    }],		    
	}
	$timeout(function () {
	    var ctx = document.getElementById("cpuChart");
            new Chart(ctx, {
	    	type: 'pie',
	    	data: cpuData,
	    }), 300});

	var memData = {
            datasets: [{
		data: [379330560, 578584576, 1040912384-379330560-578584576],
		backgroundColor: ['rgb(51,204,102)', 'rgb(255, 99, 132)', 'rgb(102,153,153)'],
	    }],		    
	}
	$timeout(function () {
	    var ctx = document.getElementById("memChart");
            new Chart(ctx, {
	    	type: 'pie',
	    	data: memData,
	    }), 300});

	const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	self.niceBytes = function (x){
		  let l = 0, n = parseInt(x, 10) || 0;
		    while(n >= 1024 && ++l)
			          n = n/1024;
		      return(n.toFixed(n >= 10 || l < 1 ? 0 : 1) + ' ' + units[l]);
	}


    }
        

})();
