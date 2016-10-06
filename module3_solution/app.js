( function(){
	
  'use strict';
  
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItems)
  .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

  function FoundItems(){
     var ddo = {
         templateUrl:'foundItems.html',    
        scope :{
          list:'<foundItem',
         remove:'@onRemove'
        // onRemove:'&'
          }                           
    };
    return ddo;
   }

  NarrowItDownController.$inject=['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
  	var foundListItem=this;
     foundListItem.textTosearch="";

    foundListItem.found = function (){
       foundListItem.itemList=[];
       if (foundListItem.textTosearch=="")
       {
         foundListItem.errorMessage="Item not found";
       }
       else{
      var promise= MenuSearchService.getMatchedMenuItems(foundListItem.textTosearch);
      console.log(promise);
       
      promise.then(function (response) {
           foundListItem.itemList = response;
           console.log(foundListItem.itemList.length);
           if(foundListItem.itemList.length===0)
           {
             foundListItem.errorMessage="Item not found";
           }
            else
            {
              foundListItem.errorMessage="";
            }
          });      
          console.log( foundListItem.found);
      }
     };
     foundListItem.remove= function(itemIndex){
      MenuSearchService.removeItem(itemIndex);
     };
    
  }
  
  MenuSearchService.$inject=['$http', 'ApiBasePath']
  function MenuSearchService($http, ApiBasePath)
  {
  	var service=this;
     var foundItems;
    
  	service.getMatchedMenuItems=function(searchTerm){
      foundItems=[];
      return $http({

        method: "GET",
        url:(ApiBasePath + "/menu_items.json")	
        
        }).then (function (response){
          
          console.log(searchTerm);
        console.log(response.data.menu_items[0].description);
        console.log(response.data.menu_items.length);
        var index=0;
        for(var i=0;i<response.data.menu_items.length;i++){
          var desc=response.data.menu_items[i].description;
          console.log(desc);
          if(desc.indexOf(searchTerm)!=-1){
           // console.log(response.data.menu_items[i]);
           foundItems[index]=response.data.menu_items[i];
           index=index+1;
          // console.log(foundItems);
          
          }
         } 
            
          return foundItems;
        });
       
        
        };
 
        
   service.removeItem = function (itemIndex) {
    foundItems.splice(itemIndex, 1);
     };

     
}
  
 
})();