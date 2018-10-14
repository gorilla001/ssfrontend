(function () {
    'use strict';
    angular.module('glance.item')
        .controller('UpdateItemCtrl', UpdateItemCtrl);

    /* @ngInject */
    function UpdateItemCtrl(gHttp, $state, $scope, $stateParams) {
        var self = this;
	
	self.form = {};

	gHttp.Resource('item.detail', {item_id: $stateParams.item_id}).get().then(function(data) {
		self.form = data.data;
	});

	self.reader = new FileReader();
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

	self.updateItem = function() {
		console.log(self.form);
		gHttp.Resource('item.update', {item_id: $stateParams.item_id}).
			patch(self.form, {form: $scope.staticForm}).then(
			       function(data) {
			       $state.go('item.list', {reload: true});
			       });	       
	};

	self.goBack = function() {
		$state.go('item.list', {reload: true});
	};
    }
})();
	/*
        self.createApp = function () {
            setConstraints();
            setCustomRegistry();
            return appservice.createApp(self.form, self.form.cluster_id, $scope.staticForm)
                .then(function (data) {
                    Notification.success('应用' + self.form.name + '创建中！');
                    $state.go('app.detail.config', {cluster_id: self.form.cluster_id, app_id: data}, {reload: true});
                });
        };

        self.updateApp = function () {
            setConstraints();
            setCustomRegistry();
            delete self.form.cluster_id;
            return appservice.updateApp(self.form, app.cid, app.id, $scope.staticForm)
                .then(function (data) {
                    $state.go('app.detail.version', {cluster_id: app.cid, app_id: app.id}, {reload: true});
                });
        };

        function listApps() {
            appservice.listApps()
                .then(function (data) {
                    angular.forEach(data.App, function (app, index) {
                        self.appNames.push(app.name);
                    });
                });
        }

        function listClusters() {
        }

        function listRegistries() {
        }

        function listNodesBySelectedLabels() {
            return appLabelService.listNodesByLabelIds(self.multiSelect.selectedLabels, self.form.cluster_id)
                .then(function (data) {
                    var nodes = data.nodes;
                    self.multiSelect.nodes = [];
                    self.multiSelect.selectedNodes = [];
                    angular.forEach(nodes, function (node) {
                        if (node.role != 'master' || self.cluster.cluster_type == '1_master') {
                            self.multiSelect.nodes.push(node);
                            self.multiSelect.selectedNodes.push(node);
                        }
                    });
                    setTick(self.multiSelect.selectedNodes, true);
                });
        }

        function setTick(items, value) {
            angular.forEach(items, function (item, index) {
                item.tick = value;
            });
        }

        function setConstraints() {
            var defaultEles = [];
            var hostEles = ["hostname", "UNIQUE"];
            if (self.multiSelect.selectedNodes) {
                self.form.constraints = getConstraintsByNode(self.multiSelect.selectedNodes, defaultEles, 'ip');
            } else {
                self.form.constraints = defaultEles;
            }
            if (self.single) {
                self.form.constraints.push(hostEles)
            }
        }

        function getConstraintsByNode(nodesSelect, elements, attribute) {
            if (attribute === 'ip') {
                var temp = ["ip", "LIKE"];
            } else if (attribute === 'lableName') {
                var temp = ["lable", "LIKE"];
            }

            var regular = nodesSelect.map(function (item) {
                return item[attribute]
            }).join('|');

            if (nodesSelect.length) {
                temp.push(regular);
                elements.push(temp);
            }
            return elements;
        }

        function setSelectNodes(iplist) {
            angular.forEach(self.multiSelect.nodes, function (node) {
                if (iplist.indexOf(node.ip) > -1) {
                    self.multiSelect.selectedNodes.push(node);
                }
            });
            setTick(self.multiSelect.selectedNodes, true);
        }

        function openImageModal(ev) {
            selectImageModal.open(ev).then(function (data) {
                self.form.imageName = $filter("filterVersion")(data.image, 'url');
                self.form.imageVersion = $filter("filterVersion")(data.image, 'version');
            });
        }

	*/
//})();
