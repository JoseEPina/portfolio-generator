const inquirer = require('inquirer');
// const fs = require('fs');

const promptUser = () => {
   return inquirer.prompt([
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
   ]);
};

const promptProject = (portfolioData) => {
   // If there's no 'projects' array property, create one
   if (!portfolioData.projects) {
      portfolioData.projects = [];
   }
   console.log(`
=================
Add a New Project
=================
`);
   return inquirer
      .prompt([
         {
            type: 'input',
            name: 'project_name',
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
      ])
      .then((projectData) => {
         portfolioData.projects.push(projectData);
         if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
         } else {
            return portfolioData;
         }
      });
};

promptUser()
   .then(promptProject)
   .then((portfolioData) => {
      console.log(portfolioData);
   });

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
