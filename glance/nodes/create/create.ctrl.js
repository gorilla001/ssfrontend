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

	self.selected_provider = "aliyun"

	self.selected_type = "" 

	self.selected_region = "";

	self.types = [];
	self.regions = [];

	self.select = function(x) {
	    self.selected_provider = x;
	    gHttp.Resource('node.types', {cloud_name: x}).get().then(function(data) {
	    	self.types = data.data;
		    console.log(self.types);
                self.selected_type = self.types[0].id;
	    });
	    gHttp.Resource('node.regions', {cloud_name: x}).get().then(function(data) {
	    	self.regions = data.data;
		    console.log(self.regions);
		self.selected_region = self.regions[0].location;
	    });
	};
        
        self.select_region = function(x) {
            self.selected_region = x;
	}

	self.select(self.selected_provider);   

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
	    value: 'qc'
	}];
    }
})();
