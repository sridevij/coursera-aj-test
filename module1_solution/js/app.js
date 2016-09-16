(function(){

  'use strict';
  angular.module('LunchCheck',[])
  .controller('LunchCheckController', LunchCheckController);
    
  LunchCheckController.inject=['$scope','$filter'];
  
  function LunchCheckController($scope,$filter)
  {
    
    $scope.checkLunch = function(){
    	var str=$scope.menuText;
    	if (str!=undefined)
    	{
    	$scope.myStyle=
    		{
    			"border" : "3px solid green",
    			"color" : "green",   	
    		}
    	}
    	else
    	{
    	$scope.result="Please enter data first";
    	$scope.myStyle=
    		{
    			"border" : "2px solid red",
    			"color" : "red",    			
    		}
    		return false;
    	}	
    	var menuList=str.split(",");
    	var len=menuList.length;
    	$scope.result="";
    	for(var i=0;i<menuList.length;i++)
    	{   		
    		menuList[i]=menuList[i].trim();
    		if(menuList[i]=="")
    			len=len-1;
    	}
       	if (len <= 3)
    		$scope.result="Enjoy!";
    	else
    		$scope.result="Too much!";
    	

    	
    }; 
  }
  
})();