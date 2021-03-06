// create the about section element. Tt checks for 'aboutText' === true to generate the 'about' <section> element
const generateAbout = (aboutText) => {
   if (!aboutText) {
      return '';
   }
   return `
    <section class="my-3" id="about">
      <h2 class="text-dark bg-primary p-2 display-inline-block">About Me</h2>
      <p>${aboutText}</p>
    </section>
  `;
};

// generates a html <section> FOR EACH ELEMENT of projectsArr.
// FIRST: FILTERING
// for 'featured' projects, filters projects with  the FILTERING FUNCTION 'feature' === true (feature => feature)
// for 'non-featured' projects, filters projects with  the FILTERING FUNCTION 'feature' === false (feature => !feature)
// SECOND: MAPING
// creates a NEW array (to prevent destroying the original one - because it needs to be processed twice) using an arrow
// function with four parameters - { name, description, languages, link } - coming from the projectsArr.
// As you can see, the arrow function creates AND RETURNS a new array element that is a <div> section by using
// the template literal ` `.
// Inside the <div> element, we can see that the property 'languages' is an array too; therefore we use the '.join'
// method to return a new string by concatenating all of the elements in an array (or an array-like object), separated
// by comma.
// THIRD: JOIN ALL THE <div> elements
// we use th 'join' method to join all the <div> elements together.align-center
const generateProjects = (projectsArr) => {
   return `
    <section class="my-3" id="portfolio">
      <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
      <div class="flex-row justify-space-between">
      ${projectsArr
         .filter(({ feature }) => feature)
         .map(({ projectName, description, languages, link }) => {
            return `
          <div class="col-12 mb-2 bg-dark text-light p-3">
            <h3 class="portfolio-item-title text-light">${projectName}</h3>
            <h5 class="portfolio-languages">
              Built With:
              ${languages.join(', ')}
            </h5>
            <p>${description}</p>
            <a href="${link}" class="btn"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
          </div>
        `;
         })
         .join('')}

      ${projectsArr
         .filter(({ feature }) => !feature)
         .map(({ projectName, description, languages, link }) => {
            return `
          <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
            <h3 class="portfolio-item-title text-light">${projectName}</h3>
            <h5 class="portfolio-languages">
              Built With:
              ${languages.join(', ')}
            </h5>
            <p>${description}</p>
            <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
          </div>
        `;
         })
         .join('')}
      </div>
    </section>
  `;
};

// local module export of arrow function;
// function name: as defined in calling program in local module require
// parameter: portfolioData
module.exports = (templateData) => {
   // destructure projects and about data from portfolioData based on their property key NAMES
   // uses the 'rest' operator '...' to get the rest of the parameters in the header variable
   const { projects, about, ...header } = templateData;
   // promise that returns the basic HTML template; note the ${variable} substitution expressions
   return `
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Portfolio Demo</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
    <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
  </head>

  <body>
    <header>
      <div class="container flex-row justify-space-between align-center py-3">
        <h1 class="page-title text-secondary bg-dark py-2 px-3">${header.name}</h1>
        <nav class="flex-row">
          <a class="ml-2 my-1 px-2 py-1 bg-secondary text-dark" href="https://github.com/${header.github}">GitHub</a>
        </nav>
      </div>
    </header>
    <main class="container my-5">
      ${generateAbout(about)}
      ${generateProjects(projects)}
    </main>
    <footer class="container text-center py-3">
      <h3 class="text-dark">&copy; ${new Date().getFullYear()} by ${header.name}</h3>
    </footer>
  </body>
  </html>
  `;
};
