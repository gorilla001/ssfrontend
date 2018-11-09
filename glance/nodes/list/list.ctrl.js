(function () {
    'use strict';
    angular.module('glance.node')
        .controller('ListNodeCtrl', ListNodeCtrl)
    	.controller('PanelDialogCtrl', PanelDialogCtrl);

    function PanelDialogCtrl(mdPanelRef, gHttp, $scope, $state, $timeout) {
	var self = this;

	self.form = {
		"region_or_zone": "",
		"instance_type": "",
	};

	self.panelRef = mdPanelRef;
	self.cancel = function() {
	    self.panelRef && self.panelRef.close().then(function() {
	        self.panelRef.destroy();
	    });
	};

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

	self.selected_provider = "ln"
	self.selected_region = "";
	self.selected_types = "",
	
	self.types = [];
	self.regions = [];

	self.select = function(x) {
	    self.selected_provider = x;
	    gHttp.Resource('node.types', {cloud_name: x}).get().then(function(data) {
	    	self.types = data.data;
                self.form.instance_type= self.types[0].id;
	    });
	    gHttp.Resource('node.regions', {cloud_name: x}).get().then(function(data) {
	    	self.regions = data.data;
		self.form.region_or_zone = self.regions[0].id;
	    });
	};
        
	self.select(self.selected_provider);   

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

    /* @ngInject */
    function ListNodeCtrl(gHttp,$stateParams, $state, confirmModal, $rootScope, $mdPanel, $interval, $mdDialog, $scope) {

        var self = this;
	self.showDialog = function(evt) {

       $mdDialog.show({
          clickOutsideToClose: true,
          scope: $scope,        // use parent scope in template
          preserveScope: true,  // do not forget this if use parent scope
	  templateUrl: 'glance/nodes/list/dialog.html',
	  targetEvent: evt,
	  controller: 'CreateDialogCtrl',
	  controllerAs: 'ctrl',
          //controller: function DialogController($scope, $mdDialog) {
          //  $scope.closeDialog = function() {
          //    $mdDialog.hide();
          //  }
          //}
       });
    }	
	self.nodes = [];
	self.selected = [];
	self.total = 0;
	self.query = {
	    filter: "",
    	    limit: 10,
    	    page: 0
  	};

	self.search = function() {
	    self.getNodes();
	}
	
	self.next = function() {
	    self.query.page++;
	    self.getNodes();
	}

        self.previous = function() {
	    self.query.page--;	
	    self.getNodes();
	}

	self.getNodes = function() {
	    gHttp.Resource('node.list').get({params:self.query}).then(function(resp) {
	    	self.nodes = resp.data;
		self.total=resp.headers["total-records"];
	    });
	}

	self.getNodes();
	//$interval(function(){
	//	self.getNodes();
	//}, 2000);

	self.stateMap = {
	       "online": "在线",
       	       "offline": "离线",
	       "deploying": "部署中",
	       "deleting": "删除中",
	}	       

	self.delete = function(x) {
	    confirmModal.open("确认删除该节点?").then(function () {
		gHttp.Resource('node.delete', {node_id: x}).delete().then(function(data){
			$state.reload();
		});
	    });
	};

	self.enableItem = function() {
            angular.forEach(self.selected, function (item) {
		gHttp.Resource('item.enable', {item_id: item.id}).patch().then(function(data){
			$state.reload();
		})
	    })
	};

	self.disableItem = function() {
	    angular.forEach(self.selected, function (item) {
		gHttp.Resource('item.disable', {item_id: item.id}).patch().then(function(data){
			$state.reload();
		})
	    })
	};

	self.deleteItem = function() {
	    confirmModal.open("确认删除选中的商品?").then(function () {
	           angular.forEach(self.selected, function (item) {
		        gHttp.Resource('item.delete', {item_id: item.id}).delete().then(function(data) {
		    	    $state.reload();
		        });
		    });
		})
	};

	const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	self.niceBytes = function (x){
		  let l = 0, n = parseInt(x, 10) || 0;
		    while(n >= 1024 && ++l)
			          n = n/1024;
		      return(n.toFixed(n >= 10 || l < 1 ? 0 : 1) + ' ' + units[l]);
	}

        this._mdPanel = $mdPanel;
        this.openFrom = 'right';
        this.closeTo = 'right';
        this.animationType = 'slide';
        
        self.showDialog1 = function() {
          var position = $mdPanel.newPanelPosition().absolute();
              	    	//.absolute()
        		//.centerHorizontally();
          var animation = this._mdPanel.newPanelAnimation();
        
          switch(this.openFrom) {
            case 'right':
              animation.openFrom({
                top:0,
                left:document.documentElement.clientWidth
              });
              break;
          }
          switch(this.closeTo) {
            case 'right':
              animation.openFrom({
                top:0,
                left:document.documentElement.clientWidth
              });
              break;
          }
        
          switch(this.animationType) {
            case 'custom':
              animation.withAnimation({
                open: 'demo-dialog-custom-animation-open',
                close: 'demo-dialog-custom-animation-close'
              });
              break;
            case 'slide':
              animation.withAnimation(this._mdPanel.animation.SLIDE);
              break;
            case 'none':
              animation = undefined;
              break;
          }


            var config = {
                  attachTo: angular.element(document.body),
                  controller: PanelDialogCtrl, //PanelDialogCtrl,
                  controllerAs: 'ctrl',
                  disableParentScroll: false,
                  templateUrl: 'glance/nodes/list/panel.tmp.html.html',
                  hasBackdrop: true,
                  panelClass: 'demox-dialog-example',
                  position: position,
	          animation: animation, //panelAnimation,
	          //fullscreen: true,
                  trapFocus: true,
                  zIndex: 10,
                  clickOutsideToClose: false,
                  escapeToClose: true,
                  focusOnOpen: true
            };

  	    $mdPanel.open(config);	
    	}
    }
})();
