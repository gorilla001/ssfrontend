(function () {
    'use strict';
    angular.module('glance.node')
        .controller('CreateNodeCtrl', CreateNodeCtrl);

    /* @ngInject */
    function CreateNodeCtrl(appservice, $state, $scope, gHttp) {
        var self = this;

	self.form = {
		"name": "",
		"desc": "",
		"price": "",
		"size": "",
		"origin": "",
	}

	self.reader = new FileReader();
	self.form.images = [];

	self.imgUpload = function($event) {       //单次提交图片的函数
	    var files = $event.target.files;
            var guid = (new Date()).valueOf();   //通过时间戳创建一个随机数，作为键名使用
            self.reader.readAsDataURL(files[0]);  //FileReader的方法，把图片转成base64
            self.reader.onload = function(ev) {
                $scope.$apply(function(){
	        self.form.images.push(ev.target.result);	
                });
            };
	};

	self.imgDel = function($index) {
		self.form.images.splice($index, 1);
	};

	self.createItem = function() {
		return appservice.createItem(self.form, $scope.staticForm).then(function (data) {
			$state.go('item.list', {reload: true});
		});	
	};

	self.goBack = function() {
		$state.go('item.list', {reload: true});
	};

	self.selected = "aliyun";

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
	    self.selected = x;
	    gHttp.Resource('node.types', {cloud_name: x}).get().then(function(data) {
	    	self.types = data.data;
	    });
	    gHttp.Resource('node.regions', {cloud_name: x}).get().then(function(data) {
	    	self.regions = data.data;
	    });
	};

	self.providers = [{
	    img: "img/aliyun.jpeg",
	    title: 'aliyun',
	    value: 'aliyun'
	    },{
	    img: "img/vultr.jpg",
	    title: 'vultr',
	    value: 'ln'
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
	    value: 'qingcloud'
	}];
    }
})();
