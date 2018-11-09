(function () {
    'use strict';
    angular.module('glance.node')
        .controller('CreateDialogCtrl', CreateDialogCtrl);

    function CreateDialogCtrl($scope, $mdDialog, gHttp, $timeout) {
        var self = this;
	this.form = {
		"region_or_zone": "",
		"instance_type": "",
	};

	self.cancel = function() {
		$mdDialog.cancel();
	};

	self.create = function() {
	        gHttp.Resource('node.create',{provider_id: self.selected_provider})
		.post(self.form, {form: $scope.staticForm} ).then(function(data) {
		    self.cancel();
		    //$state.go('node.list', {reload: true});
		});

		//$timeout(function () {
		//	$state.reload();
	    	//}, 300);
	};
	self.selected_provider = "ln"

	self.selected_type = {} 

	self.selected_region = "";

	self.types = [];
	self.regions = [];

	self.type = {
	    "id": "512mb",
            "name": "-",
            "region_id": "-",
            "cpu": "1",
            "memory": "0.5GB",
            "disk": "20GB"
	}

	self.selected_types = {
	    "id": "512mb",
            "name": "-",
            "region_id": "-",
            "cpu": "1",
            "memory": "0.5GB",
            "disk": "20GB"
	};

	self.selected_region = "华北 1";

	self.types = [];
	self.regions = [];

	self.select = function(x) {
	    self.selected_provider = x;
	    gHttp.Resource('node.types', {cloud_name: x}).get().then(function(data) {
	    	self.types = data.data;
                self.selected_type = self.types[0];
		self.form.instance_type = self.types[0].id; 
	    });
	    gHttp.Resource('node.regions', {cloud_name: x}).get().then(function(data) {
	    	self.regions = data.data;
		self.selected_region = self.regions[0].location;
		self.form.region_or_zone = self.regions[0].id;
	    });
	};
        
        self.select_region = function(x) {
            self.selected_region = x;
	}

	self.select(self.selected_provider);   


	self.form = {
		"region_or_zone": "",
		"instance_type": "",
	}

	self.create = function() {
	        gHttp.Resource('node.create',{provider_id: self.selected_provider})
		.post(self.form, {form: $scope.staticForm} ).then(function(data) {
		    self.cancel();
		    //$state.go('node.list', {reload: true});
		});

		$timeout(function () {
			$state.reload();
	    	}, 300);
	};


	self.providers = [{
            img: "img/ln.jpeg",
	    title: "linode",
	    value: "ln",
	    },{
	    img: "img/aliyun.jpeg",
	    title: 'aliyun',
	    value: 'aliyun'
	    },{
	    img: "img/vultr.jpg",
	    title: 'vultr',
	    value: 'vultr'
	    },{
	    img: "img/aws.jpg",
	    title: 'aws',
	    value: 'aws'
	    },{
	    img: "img/tencent.jpg",
	    title: 'tencent',
	    value: 'tencent'
	    },{
	    img: "img/qingcloud.jpg",
	    title: 'qingcloud',
	    value: 'qc'
	}];
    }

})();
 
