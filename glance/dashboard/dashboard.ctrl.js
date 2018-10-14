(function () {
    'use strict';
    angular.module('glance.dashboard').controller('DashboardCtrl', DashboardCtrl);

    /* @ngInject */
    function DashboardCtrl(gHttp, $scope) {
        var self = this;

        self.nodes = 100;
        self.users = 500;
	self.traffics = 30;
	self.region = 3;

	gHttp.Resource('summary.get').get().then(function(resp) {
	        var summary = resp.data;
	        self.items = summary.items;
	        self.orders = summary.orders;
	        self.shops = summary.shops;
	        self.communities = summary.communities;
	});

	self.orderData = {
	    labels: ["January", "February", "March", "April", "May", "June", "July"],
	    datasets: [{
	       label: "My First dataset",
	       backgroundColor: 'rgb(255, 99, 132)',
	       borderColor: 'rgb(75, 192, 192)',
            data: [0, 10, 5, 2, 20, 30, 45],
            }]	     
	};
	self.saleData = {
	    labels: ["西红柿", "平菇", "圆白菜", "辣椒", "土豆", "鸡蛋", "黄瓜"],
	    datasets: [{
               label:"xxxx",
	       backgroundColor: ['rgb(255, 99, 132)', 'rgb(51,204,102)', 'rgb(102,153,153)',
	                         'rgb(153,51,153)', 'rgb(204,102,153)', 'rgb(204,255,102)',
				 'rgb(255,51,102)',
	       ],
	       borderColor: 'rgb(255, 99, 132)',
            data: [100, 150, 80, 95, 200, 120, 300],
            }]	     
	};
	
        var ctx = document.getElementById("saleChart");
        new Chart(ctx, {
            type: 'bar',
            data: {
	        labels: ["西红柿", "平菇", "圆白菜", "辣椒", "土豆", "鸡蛋", "黄瓜"],
                datasets: [{
                    data: [100, 150, 80, 95, 200, 120, 300],
	            backgroundColor: [
			    'rgb(255,99,132)',
			    'rgb(51,204,102)',
			    'rgb(102,153,153)',
	                    'rgb(153,51,153)',
			    'rgb(204,102,153)',
			    'rgb(204,255,102)',
			    'rgb(255,51,102)',
	            ],
		    borderWidth: 0
                }]
            },
            options: {
	        title:{
	            display:true,
		    text:'用户统计'
		},
                legend: {
        	    display: false
    		},
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
	});

        var ctx = document.getElementById("orderChart");
	new Chart(ctx, {
		 type: 'line',
                 data: {
		    labels: ["January", "February", "March", "April", "May", "June", "July"],
	            datasets: [{
	                label: "My First dataset",
	                backgroundColor: 'rgb(255, 99, 132)',
	                borderColor: 'rgb(75, 192, 192)',
                        data: [0, 10, 15, 2, 20, 30, 25],
			fill: false,
                    }],
		 },
		 options: {
	            title:{
	                display:true,
		        text:'流量统计'
		    },
                    legend: {
        		display: false
    		    },
		    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Month'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Value'
                            }
                        }]
                    }
		},
	});
    }
})();
