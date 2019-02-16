var inquirer = require('inquirer');
const cTable = require('console.table');
const con = require('./connection');

  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
   startBamazon();
  });

// const questions = [{
//         type: 'List',
//         name: 'command',
//         messages: 'List a set of menu options',
//         choices: [
//             'View products for Sale',
//             'Quit'
//         ]
// }];

// inquirer.prompt(questions)
//     .then(function (data) {
//         console.log('Data: ', data);
//     });



function startBamazon(){

    con.query('SELECT * FROM products', function(err, results){
        if(err){
            console.log(err, "Something went wrong!")
        }

     
        console.table(results);

        
        inquirer
          .prompt([
           {
               type: 'input',
               name: 'id',
               message: 'What would you like to purchase?'
           },
           {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like to purchase?'
        }
          ])
          .then(answers => {
            console.log(answers, " --------------")
            // Use user feedback for... whatever!!
            processOrder(answers)
          });
        
    })

}


function processOrder(answers) {
    con.query('SELECT * FROM products WHERE id=' + answers.id, function(err, results){
        console.log(results, "results in process order")
        var stock_quantity = results[0].stock_quantity
        if(answers.quantity > stock_quantity){
            console.log("Sorry not enough in stock")
        }else {
            // update data base with new quantity

        }

    })
}
// inquirer
//   .prompt([
//    {
//        type: 'input',
//        name: 'test',
//        message: 'say some thing'
//    }
//   ])
//   .then(answers => {
//       console.log(answers, "this is the answer")
//     // Use user feedback for... whatever!!
//   });
