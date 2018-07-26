     //初始化实例
     let menu = interface.createMenu();
     let customer = interface.createCustomer();
     let restaurant = interface.restaurant;
     let waiter = interface.waiter;
     let cook = interface.cook;

     let cus = customer[0];

     let menuArray = [];
     let cusExist = true;

     function main() {

         restaurant.hire(waiter);
         restaurant.hire(cook);

         menuArray = cus.order(menu);
         let object = {
             name: cus.name,
             menuArray: menuArray
         }
         let promise = Promise.resolve(object);
         for (let i = 0; i < menuArray.length; i++) {
             if (!cusExist) {
                 promise = promise
                     .then(waiter.moveCook)
                     .then(cook.finishWork)
                     .then(waiter.finishWork)
                     .then(cus.eat);
             } else {
                 promise = promise
                     .then(waiter.moveCus)
                     .then(cus.seat)
                     .then(waiter.finishWork)
                     .then(cook.finishWork)
                     .then(waiter.finishWork)
                     .then(cus.eat)

                 cusExist = false;
             }
         }
     }

     main();