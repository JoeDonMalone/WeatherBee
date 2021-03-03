var inquirer = require('inquirer');
const fs = require('fs');
var repoName = 'README Builder';

inquirer
.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is your GitHub repository Name?',
    },
    {
      type: 'input',
      name: 'motivation',
      message: 'What was your motivation for building this project?',
    },
    {
      type: 'input',
      name: 'problemsSolved',
      message: 'What problem does it solve?',
    },
    {
      type: 'input',
      name: 'installationSteps',
      message: "What are the Steps to Install this project on the User's current Runtime Environment? i.e. (Step 1. 'some Step' Step 2. 'Some Other Step')",
    },
    {
      type: 'input',
      name: 'usage',
      message: "Where/How Can this application be used?",
    },
    {
      type: 'input',
      name: 'creditDue',
      message: "Are there any contributors to this project?",
    },
    {
      type: 'input',
      name: 'licensing',
      message: "How do you feel your work should be licensed? (probably 'MIT')",
    },
    {
      type: 'input',
      name: 'badges',
      message: "List your Badges",
    },
    {
      type: 'input',
      name: 'features',
      message: "Particular features you'd like to add?",
    },
    {
      type: 'input',
      name: 'tests',
      message: "Particular features you'd like to add?",
    },
  ])
  .then((data) => {
    const filename = 'README.md'; //`${data.contact}.md`

    fs.writeFile(filename, readMeText(data), (err) =>
      err ? console.log(err) : console.log('Success!')
    );
  });

const readMeText = (data) => 
`# ${data.title}
## Description
- ${data.motivation}
- Lessons Learned:
  * ${data.problemsSolved}
## Installation
- ${data.installationSteps}
## Usage
 - ${data.usage}
## Credits
 - ${data.creditDue}
## License
 - Licensed under the [${data.licensing.toUpperCase()}]('./license.txt') license.
## Badges
 - ${data.badges}
## Features
 - ${data.features}
## Tests
 - ${data.tests}
`

// To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:
//     ```md
//     ![alt text](assets/images/screenshot.png)
//     ```