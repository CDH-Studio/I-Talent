# I-Talent

An improved directory and employee search tool.

![I-Talent Screenshot](docs\wikiFiles\I-Talent-page.jpg)

I-Talent can be accessed [here](http://mytalent-frontend-dev-mytalent.apps.dev.openshift.ised-isde.canada.ca/).

[Our promotional website](https://cdh-studio.github.io/UpSkill/)

API documentation can be accessed [here](https://documenter.getpostman.com/view/10159635/SzKQz14k?version=latest).

# Table of Contents

- [What is I-Talent?](#what-is-I-Talent)
- [Contributors](#contributors)
- [Tech Stack](#tech-stack)
- [Repo Structure](#repo-structure)
- [Local Development](#local-development)
- [Wiki](#wiki)
- [License](#license)
- [Contact](#contact)

# What is I-Talent?

I-Talent is an internal web-application that would enable employees to share information about their employment status, job position, skills, and credentials.

Any ISED employee will be able to login to I-Talent with their windows credentials, where they can create a profile or search for employees with the right expertise, education, competencies, experience and other essential qualifications at any time for talent management, staffing, succession planning, or simply for insight on a project or file.

# Contributors

- [Rizvi Rab](https://www.linkedin.com/in/rizvi-rab-370327160/)
  - Full Stack Developer
- [Mamadou Bah](https://www.linkedin.com/in/mamadou-bah-9962a711b/)
  - Full Stack Developer
- [Trevor Bivi](https://www.linkedin.com/in/trevor-bivi-736181193/)
  - Full Stack Developer
- [Kate Thornley](https://www.linkedin.com/in/kate-a-w-thornley/)
  - Full Stack Developer
- [Sukhsimranpreet Sekhon](www.linkedin.com/in/sukhsimranpreetsekhon/)
  - Full Stack Developer
- [Sagal Maxamud](https://www.linkedin.com/in/s-glmxmd/)
  - Full Stack Developer
- [Ali Nouri](https://www.linkedin.com/in/a-nouri/)
  - Full Stack Developer

# Tech Stack

- Frontend Service Framework: React
- Backend Service Framework: Node + Express
- Database: Postgres
- Testing Framework: Jest
- Hosting: OpenShift

# Architecture Overview

I-Talent is broken down into two different services: Frontend and Backend.

- Frontend: Serves the React app that is the web interface for I-Talent.
- Backend: Manages data coming into and out of the database.

# Local Development

The following is a guide on how to bring up the pieces of the application for development.

## Web App Development Prerequisites

You must have the following already installed:

- Docker

## Running the Entire Application

To run the entire application locally, run the following:

```
docker-compose up
```

You can access different components of the web application:

- The frontend at `localhost:3000`.
- The backend at `localhost:8080`.
- Postgres database at `localhost:5432`.
- Adminer at `localhost:3333`.

Checkout the `docker-compose.yml` file for information on which ports to use to access all of the other services.

# Wiki

You can find more information about the project in our [Github Wiki](https://github.com/CDH-Studio/UpSkill/wiki).

# Contact

- [CDH Studio Website](https://cdhstudio.ca/)
