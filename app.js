const fs = require('fs');
const generatePage = require('./src/page-template.js');

const profileDataArgs = process.argv.slice(2);

const [name, github] = profileDataArgs; // Assignment destructuring example!! *ES6 feature

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

