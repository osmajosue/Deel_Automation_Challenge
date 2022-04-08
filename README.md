# Deel_Automation_Challenge
 This is a small framework created to automate the creation of a Fixed Rate Contract on Deel's trainning page. Its built using JavaScript, WebdriverIO-v7, Mocha, Babel and Allure.

# Pre-requisites:
### Before running this test framework, you will need (Preferred):
* The Chrome web browser version 100.0 or higher is required to run the tests.
* Node version 14 or higher (16.14.2 was used in the project) installed. ([nodeJS] https://nodejs.org/en/)
* NPM (version 8.6 was used in the project) installed. For installation just type in any terminal ``` npm i ```
* Mocha test framework.
* Babel core 7.17.8.
* Allure-commandline version 2.17.2 for reporting. For installation just type in any terminal ``` npm i allure-commandline ```
* Any text editor or IDE (VScode was used in the project)


## USAGE

In order to run all tests (spec files) from the terminal the following command will need to be used while on the project path:
```
npx wdio
```

Use this command to generate and open a report using allure commandline while on the project path:
```
allure generate allure-results $$ allure open
```

## Some approaches explained:

Here is a briefly explanation on how the framework works, the strategies used and, the approach taken.

### Component and Page Objects approach:
In the project are two main approaches:
* Component Objects: This is a design approach that builts on top pf Page Objects, in which we try to modularize each aspect of the application as much as possible, dividing the pages into functional components that can be reused in more places.
* Page Objects: In this approach the application is divided into pages, helping with organization, escalability, abstraction and maintainability.

## Utilities
* Test Data: A json file was created to help parameterize the tests as much as possible.
* Allure Reporting: We included the dependency for allure reports to have as much feedback as we can while running our tests or debugging any unwanted errors.

For the sake of this project, because of its simplicity and being just one particular test, I decided not to abstract it more. However, more modularization and abstraction is the recommended way to do it in a Page/Component Object Model designed project.
