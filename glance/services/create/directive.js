angular.module("glance.item")
.directive("ngUploadChange",function(){
    return{
        scope:{
            ngUploadChange:"&"
        },
        link:function($scope, $element, $attrs){
            $element.on("change",function(event){
                $scope.ngUploadChange({$event: event})
            })
            $scope.$on("$destroy",function(){
                $element.off();
            });
        }
    }
})
.directive('enlargePic',function(){
   return{
		restrict: "AE",
		link: function(scope,elem){
			elem.bind('click',function($event){
				var img = $event.srcElement || $event.target;
				angular.element(document.querySelector(".mask"))[0].style.display = "block";
				angular.element(document.querySelector(".bigPic"))[0].src = img.src;
			})
		}
	}
})
.directive('closePic',function(){
	return{
		restrict: "AE",
		link: function(scope,elem){
			elem.bind('click',function($event){
				angular.element(document.querySelector(".mask"))[0].style.display = "none";
			})
		}
	}
});
