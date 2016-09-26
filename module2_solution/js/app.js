(function() {

  'use strict';
  
   angular.module('ShoppingListCheckOff', [])
   .controller('ToBuyShoppingController', ToBuyShoppingController)
   .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
   .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

   ToBuyShoppingController.$inject=['ShoppingListCheckOffService'];
   function ToBuyShoppingController(ShoppingListCheckOffService)
   {
    var toBuy=this;
     toBuy.toBuyList= ShoppingListCheckOffService.getTobuyItems();
     
     toBuy.removeItems=function(itemIndex){
      try{
     	var boughtItem=ShoppingListCheckOffService.removeItem(itemIndex);
     } catch(error) {
      toBuy.errorMessage=error.message;
     } 
     //	console.log("boughtItem");
     };
     
   }


   AlreadyBoughtShoppingController.$inject=['ShoppingListCheckOffService'];
   function AlreadyBoughtShoppingController(ShoppingListCheckOffService)
   {
      var alreadyBought=this;
       
       
       alreadyBought.itemList=ShoppingListCheckOffService.getBoughtItems();
       
       alreadyBought.isEmpty=function(){
         return ShoppingListCheckOffService.checkEmpty();
       } 
        
      
      console.log("alreadyBought.itemList");
       
   }
	

    function ShoppingListCheckOffService()
    {
    	var service=this;
    	service.toBuyList=[
          {
  	         itemName:'cookie',
  	         itemQuantity:'10'
           },
          {
          	itemName:"Apples",
         	itemQuantity:"8"
          },
          {
  	        itemName:"Bananas",
  	         itemQuantity:"12"
           },
           {
  	         itemName:"Potatos",
  	         itemQuantity:"7"
            },
            {
         	itemName:"Carrot",
         	itemQuantity:"9"
           }
           ];

          service.boughtList=[];
          service.checkEmpty=function()
          {
             if(service.boughtList.length===0)
              return true;
          };
          service.addItem= function(boughtItem){
          	console.log(boughtItem);
            service.boughtList.push(boughtItem);
            console.log(service.boughtList);
          };
          service.getTobuyItems=function(){
          	return service.toBuyList;
          };
          service.getBoughtItems=function(){
             
               return service.boughtList;
              
            };          
          service.removeItem=function(itemIndex){
          	var boughtItem=service.toBuyList[itemIndex];
            service.addItem(boughtItem); 
            service.toBuyList.splice(itemIndex, 1);   
              if(service.toBuyList==0){
              throw new Error("Everything is bought!");
              }      
           };
          }           
    
	})();
