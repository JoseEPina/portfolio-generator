// const generateSite = require('./utils/generate-site.js');
// const { writeFile, copyFile } = require('./utils/generate-site.js');
// const generatePage = require('./src/page-template.js');
// const inquirer = require('inquirer');

// New ES6 way of calling js files and inquirer program. Older version still lister above for ref
// Destructuring the modules.export from page-template.js file
import { writeFile, copyFile } from './utils/generate-site.js';
//
import generatePage from './src/page-template.js';
// imports the inquirer 3P Module
import inquirer, { prompt } from 'inquirer';

// Array for inquirer.prompt for user-data
const userQuestions = [
   /* Pass your questions in here */
   {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: (nameInput) => {
         if (nameInput) {
            return true;
         } else {
            console.log('Please enter your name!');
            return false;
         }
      },
   },
   {
      type: 'input',
      name: 'github',
      message: 'Enter your Github Username. (Required)',
      validate: (githubNameInput) => {
         if (githubNameInput) {
            return true;
         } else {
            console.log('Please enter your Github Username!');
            return false;
         }
      },
   },
   {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true,
   },
   {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => {
         if (confirmAbout) {
            return true;
         } else {
            return false;
         }
      },
   },
];

// Array for inquirer.prompt for project-data
const projectQuestions = [
   {
      type: 'input',
      name: 'projectName',
      message: 'What is the name of your project? (Required)',
      validate: (projectNameInput) => {
         if (projectNameInput) {
            return true;
         } else {
            console.log('Please enter your project name!');
            return false;
         }
      },
   },
   {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: (descriptionInput) => {
         if (descriptionInput) {
            return true;
         } else {
            console.log('Please enter a valid description!');
            return false;
         }
      },
   },
   {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node'],
   },
   {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: (linkInput) => {
         if (linkInput) {
            return true;
         } else {
            console.log('Please enter a valid GitHub link to your project.');
            return false;
         }
      },
   },
   {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false,
   },
   {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false,
   },
];

// wrapper for inquirer. Note return inquirer.prompt(...) below that makes promptProject return a Promise
const promptProject = (portfolioData) => {
   // Create array of portfolio projects if the array does not exists already
   if (!portfolioData.projects) {
      portfolioData.projects = [];
   }
   console.log(`
   =================
   Add a New Project
   =================
   `);

   // creates Promise by returning inquirer.prompt(...)
   return inquirer.prompt(projectQuestions).then((projectData) => {
      // Receives promise from prompt
      portfolioData.projects.push(projectData); // pusher projectData into array
      if (projectData.confirmAddProject) {
         // Validates if there are more projects to add
         return promptProject(portfolioData); // recursive call for next project
      } else {
         return portfolioData;
      }
   });
};

// creates Promise by returning inquirer.prompt(...)
const promptUser = () => {
   return inquirer.prompt(userQuestions);
};

// Compare with the commented code below
// Start portfolio generator
promptUser() // 'returns' (promise) of  promptUser
   // captures the 'returning' data from promptUser() then recursively calls promptProject (inside promptProject), which in turn 'returns' the projects' data (promise)
   .then(promptProject)
   .then((portfolioData) => {
      // processes 'returned' data set from promptProject()
      return generatePage(portfolioData); // 'returns' (promise) the finished HTML template
   })
   .then((pageHTML) => {
      // processes 'returned' HTML template
      return writeFile(pageHTML); // processes 'writeFile' which was written as a wrapper Promise object around fs.writeFile and 'returns' (promise) its settled state: 'resolved' or 'rejected'
   })
   .then((writeFileResponse) => {
      // process the 'resolve' response (promise) from writeFile and then ....
      console.log(writeFileResponse);
      return copyFile(); //  processes 'copyFile' which was written as a wrapper Promise object around fs.copyFile and 'returns' (promise) its settled state: 'resolved' or 'rejected
   })
   .then((copyFileResponse) => {
      // process the 'resolve' response (promise) from copyFile and then ....
      console.log(copyFileResponse);
   })
   .catch((err) => {
      // otherwise process error (rejected) from any of the promises above
      console.log(err);
   });

//#region
//       fs.writeFile('./dist/index.html', pageHTML, (err) => {
//          if (err) {
//             console.log(err);
//             return;
//          }
//          console.log('Page created! Check out index.html in this directory to see it!');

//          fs.copyFile('./src/style.css', './dist/style.css', (err) => {
//             if (err) {
//                console.log(err);
//                return;
//             }
//             console.log('Style sheet copied successfully!');
//          });
//       });
//    });
//#endregion

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
