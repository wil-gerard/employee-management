<div align="center">

![Next](https://img.shields.io/badge/-Next.js-000?&logo=next.js&style=for-the-badge)
![Material UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)

</div>

<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#goals">Goals</a> •
  <a href="#summary">Summary</a> •
  <a href="#improvements">Improvements</a> •
</p>

## Installation

```shell
#Clone the repository locally via HTTPS/SSH/GithubCli
#SSH will look like the command below
git clone git@github.com:{github username here}/employee-management.git
```

```shell
#Install dependencies
npm install
```

```shell
#Start development environment
npm run dev
```

## Goals

- [x] Complete within 4hrs

- [x] Use Typescript

- [x] Users can create an employee

- [x] Users can delete an employee

- [x] Users can update an employee

- [x] Users can search for an employee

- [x] Use local storage to persist data

- [x] Users can assign an employee to a team

- [x] Refactor code into smaller components

- [ ] Write Cypress inegration tests

## Summary

In this project, I set out my goals and prioritized them based on time constraints. I wanted to challenge myself by finding the most efficient solution to the problem at hand. I began by examining examples of employee management apps and using this approach of reverse engineering. I discovered that Material UI had a suitable component that could be used to solve the problem. I read through the documentation to implement basic CRUD functionality, refactored the code for improved readability, and then sought feedback from other engineers for critique.

## Improvements

The UX for adding a new employee is a bit confusing. Currently, users have to scroll to the last page to find the new row, and then update the information from there. A more intuitive approach would be to have a form pop up in a modal when users click the "add employee" button. This would provide direct feedback that the button works and would reduce the time needed to fill out the information. Additionally, I attempted to learn about writing Cypress integration tests by reading through the documentation, but I did not have enough time to write a meaningful test. I am planning to spend more time this weekend to further understand Cypress.