(function () {
    'use strict';
    angular.module('glance.item')
        .controller('CreateItemCtrl', CreateItemCtrl);

    /* @ngInject */
    function CreateItemCtrl(appservice, $state, $scope) {
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
    }
})();
