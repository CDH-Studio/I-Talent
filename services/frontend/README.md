# UpSkill

An improved directory and employee search tool.

![Upskill Screenshot](docs/wikiFiles/upskill-splash.png?raw=true)

Upskill can be accessed [here](http://upskill-upskill.apps.dev.openshift.ised-isde.canada.ca/).

[![CircleCI](https://circleci.com/gh/CDH-Studio/UpSkill.svg?style=svg)](https://circleci.com/gh/CDH-Studio/UpSkill)

[Our promotional website](https://cdh-studio.github.io/UpSkill/)

# Table of Contents

- [What is UpSkill?](#what-is-upskill)
- [Contributors](#contributors)
- [Tech Stack](#tech-stack)
- [Repo Structure](#repo-structure)
- [Local Development](#local-development)
- [Wiki](#wiki)
- [License](#license)
- [Contact](#contact)
  [Available Scripts](#available-scripts)
  [learn more](#learn-more)

# What is UpSkill?

Upskill is an internal web-application that would enable employees to share information about their employment status, job position, skills, and credentials.

Any ISED employee will be able to login to Upskill with their windows credentials create a profile or search for employees with the right expertise, education, competencies, experience and other essential qualifications at any time for talent management, staffing, succession planning, or simply for insight on a project or file.

# Contributors

- [Mamadou Bah](https://www.linkedin.com/in/mamadou-bah-9962a711b/)
  - Full Stack Developer
- [Rizvi Rab](https://www.linkedin.com/in/rizvi-rab-370327160/)
  - Full Stack Developer
- [Trevor Bivi](https://www.linkedin.com/in/trevor-bivi-736181193/)
  - Full Stack Developer
- [Kate Thornley](https://www.linkedin.com/in/kate-a-w-thornley/)
  - Full Stack Developer
- [Suku Sekhon](www.https://www.linkedin.com/in/sukhusekhon/)
  - Full Stack Developer
- [Sagal Maxamud](www.linkedin.com/in/s-glmxmd)
  - Full Stack Developer

# Tech Stack

- Frontend Service Framework: React
- Backend Service Framework: Node + Express
- Database: Postgres
- Testing Framework: Jest
- Hosting: OpenShift/GCP

# Architecture Overview

Upskill is broken down into two different services: Frontend and Backend.

- Frontend: Serves the React app that is the web interface for Upskill.
- Backend: Manages data coming into and out of the database.

# Local Development

The following is a guide on how to bring up the pieces of the application for development.

## Web App Development Prerequisites

You must have the following already installed:

- Node.js
- Visual code

## Running the Entire Application

To run the frontend service locally, run the following:

```
npm start
```

To setup the database schema, run the following:

```
npm run dbsetup
```

To run the backend service locally, run the following:

```
npm run dev
```

You can then access the frontend at `localhost:3000`.

# Wiki

You can find more information about the project in our [Github Wiki](https://github.com/CDH-Studio/UpSkill/wiki).

# License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# Contact

- [CDH Studio Website](https://cdhstudio.ca/)

- [Our Promotional Website](https://cdh-studio.github.io/UpSkill/)
