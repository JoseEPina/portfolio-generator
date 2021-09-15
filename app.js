const inquirer = require('inquirer');
// const fs = require('fs');

inquirer
   .prompt([
      {
         type: 'input',
         name: 'name',
         message: 'What is your name?',
      },
   ])
   .then((answers) => console.log(answers));

//#region
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html'.pageHTML, (err) => {
//    if (err) throw err;

//    console.log('Portfolio complete! Check out index.html to see the output!');
// });

// const profileDataArgs = process.argv.slice(2);

// const [name, github] = profileDataArgs; // Assignment destructuring example!! *ES6 feature
//#endregion

//#region
// Notice the lack of parentheses around the `profileDataArr` parameter?
// const printProfileData = (profileDataArr) => {
//    // This ...
//    for (let i = 0; i < profileDataArr.length; i += 1) {
//       console.log(profileDataArr[i]);
//    }
//    console.log('================');

//    // Is the same as this...
//    profileDataArr.forEach(profileItem => console.log(profileItem));
// };
//#endregion
