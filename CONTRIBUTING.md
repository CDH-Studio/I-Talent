# Contributing

The following is the documentation for a general Way of Working for CDH Studio’s I-Talent development team. For more information, read our [README](README.md) and our [wiki](https://github.com/CDH-Studio/I-Talent/wiki).

**Start of Sprint**

At CDH Studio, the I-Talent sprints last two weeks. Each sprint contains multiple scrums between developers and a final scrum between the dev team and manager to discuss what has been accomplished and what will be on the next sprint. The following are steps to starting a new sprint on I-Talent:
* With the manager and developer team, address any unfinished issues and decide on issues to be tackled from backlog and feature list from client for the next two weeks.
* Create issues for any new tickets to be completed during the sprint through Github Issues. See the below section on ‘Creating Github Issues’ for more information.
* Assign sprint issues to at least one member per ticket

**During the Sprint**

While completing tasks during each sprint the workflow is as follows:
* Create a Branch: When working on tickets each dev should be making branches for the item on the ticket that will be solved through your addition to the code. Each local branch should (usually) be based off of the ‘development’ branch. 
* Submit Pull Request (PR) for approval: 
  * First assure your code passes Linter checks
  * Link PR to the issue in the sprint that it will close when the PR is merged assign another member of the dev team to review your PR
  * Merge PR into development and delete your branch from the PR once any changes have been made and is approved  by reviewer
* Review other PRs:
  1. Pull local branch PR was done through and test your local app to make sure everything functions as expected
  2. Check change tree for each file that’s been modified by PR for any syntax or consistency errors
  3. Mark any change requests or questions you have regarding the code by specifying the code in question on Github’s PR review section
  4. Re-review code once changes have been applied
  5. Once PR is ready to be merged, approve the changes and notify the developer who opened the PR so that they can merge their branch into development
* Create issues: When a new feature idea or bug is found, you should create a github issue to be added to the backlog project for a future sprint. There are two types of github issues, a fix and a new feature request. See the below section on ‘Creating Github Issues’ for more information.

**Creating GitHub Issues**

* Creating a Fix GH Issue:
  1. Under the issues tab, click create a new issue, then create a ‘Bug Report’
  2. Offer a short but precise description of the bug and where it was found
  3. Indicate the steps to reproduce the bug
  4. Mark down the expected behaviour so the dev that takes the issue on knows what solution to aim for
  5. Add any additional information or screenshots that help specify the issue
* Creating a New Feature GH Issue:
  1. Under the issues tab, click create a new issue, then create a ‘Feature Request’
  2. Describe the feature you want implemented and if it solves a problem on the site
  3. Describe alternatives you’ve considered to the solution youre proposing
  4. Add any additional information (like links to forums or resources, and mockups) to help other devs understand your feature request

**Naming Conventions**

* Branches: should have short, descriptive names, using ”-” in place of spaces, and should contain your name at the end if multiple other devs are working on the same feature on their own local branches. 
  * Ex: linter-error-fixes-kate
* Pull Requests: should first indicate if PR is a fix ([Fix]) or a new feature([New]), then uses a short descriptive title of the work done in the PR followed by the PR number
  * Ex for new feature PR: [New] Added new developers to Readme contributors section #235 
  * Ex for bug fix PR: [Fix] Removed incorrect form titles on user profile #238

**Linters**

The backend and the frontend uses Prettier and ESLint to keep consistency in the codebase code style.

ESLint is used for the project with Airbnb style guide.

[React Airbnb style guide documentation](https://github.com/airbnb/javascript/tree/master/react)
[Javascript Airbnb style guide documentation](https://github.com/airbnb/javascript)
