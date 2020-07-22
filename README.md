<img src="services/frontend-v3/src/assets/MyTalent-Logo-Full-v2-dark.svg" alt="I-Talent Logo" width="170" />

An improved directory and employee search tool.

Development version of I-Talent can be accessed [here](http://italent-dev.apps.dev.openshift.ised-isde.canada.ca/).<br>
API documentation can be accessed locally [here](http://localhost:8080/api-docs) (needs the backend server running).

# Table of Contents

- [What is I-Talent?](#what-is-I-Talent)
- [Contributors](#contributors)
- [Tech Stack](#tech-stack)
- [Repo Structure](#repo-structure)
- [Architecture Overview](#architecture-overview)
- [Local Development](#local-development)
- [Wiki](#wiki)
- [Contact](#contact)

# What is I-Talent?

I-Talent is an internal web-application that would enable employees to share information about their employment status, job position, skills, and credentials.

Any ISED employee will be able to login to I-Talent with their windows credentials, where they can create a profile or search for employees with the right expertise, education, competencies, experience and other essential qualifications at any time for talent management, staffing, succession planning, or simply for insight on a project or file.

# Contributors
Our full stack developers

__Active developers__
- [Trevor Bivi](https://www.linkedin.com/in/trevor-bivi-736181193/)
- [Kate Thornley](https://www.linkedin.com/in/kate-a-w-thornley/)
- [Ali Nouri](https://www.linkedin.com/in/a-nouri/)
- [Benoît Jeaurond](https://www.linkedin.com/in/benoit-jeaurond/)
- [Mohamed Radwan](https://www.linkedin.com/in/mo-radwan/)

__Previous developers__
- [Rizvi Rab](https://www.linkedin.com/in/rizvi-rab-370327160/)
- [Mamadou Bah](https://www.linkedin.com/in/mamadou-bah-9962a711b/)
- [Sukhsimranpreet Sekhon](https://www.linkedin.com/in/sukhusekhon/)
- [Sagal Maxamud](https://www.linkedin.com/in/s-glmxmd/)

# Tech Stack

- Frontend Service Framework: React
- Backend Service Framework: Node + Express + Prisma
- Database: Postgres
- Testing Framework: Jest
- Hosting: OpenShift

# Architecture Overview

I-Talent is broken down into two different services: Frontend and Backend.

- Frontend: Serves the React app that is the web interface for I-Talent.
- Backend: Manages data coming into and out of the database (see its [README](services/backend/README.md))

# Local Development

The following is a guide on how to bring up the pieces of the application for development.

## Web App Development Prerequisites

You must have the following already installed:

- Docker
- Vscode

#### Linter

The following extensions need to be installed for the linter:

- Prettier (plugin)
- Eslint (plugin)

Eslint is used for the project with Airbnb style guide.

[React Airbnb style guide documentation](https://github.com/airbnb/javascript/tree/master/react)
[Javascript Airbnb style guide documentation](https://github.com/airbnb/javascript)

## Running the Entire Application

To run the entire application locally, run the following:

```
docker-compose up
```

You can access different components of the web application:

- Frontend at `localhost:3000`.
- Backend at `localhost:8080`.
- API documentation at `localhost:8080/api-docs`.
- Postgres database at `localhost:5432`.
- Prisma studio at `localhost:5555`.
- Keycloak at `localhost:8180`.

Checkout the `docker-compose.yml` file for information on which ports to use to access all of the other services.

# Wiki

In order to contribute to I-Talent, see our [Github Wiki](https://github.com/CDH-Studio/UpSkill/wiki) to understand our Way of Working.

# Contact

- [CDH Studio Website](https://cdhstudio.ca/)
