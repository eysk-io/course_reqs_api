# :books: Course Reqs Backend API

<p align="center">
  <img alt="License" src="https://img.shields.io/github/license/eyskim/course_reqs_api">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/eyskim/course_reqs_api">
  <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/eyskim/course_reqs_api">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/eyskim/course_reqs_api">
  <img alt="Lines of code" src="https://img.shields.io/tokei/lines/github/eyskim/course_reqs_api">
</p>

<p align="center">
  <img alt="GitHub followers" src="https://img.shields.io/github/followers/eyskim?style=social">
</p>

General-purpose API backend for the pre-requisite chain of specified courses at post-secondary institutions. In-depth documentation can be found at: https://course-reqs.notion.site/course-reqs/Course-Reqs-560a1df7302a4a358fb14b7196b1d52d.

## Getting Started

A local installation of `MongoDB` is required for local development. A free community version can be found here: https://www.mongodb.com/try/download/community.


### Building & Running the Program

The examples use `npm` but they can be executed using a node package manager of your choice.

```shell
git clone git@github.com:eyskim/course_reqs_api.git
cd course_reqs_api/
npm install
npm run build
npm start:dev
```

You can also run the program with a `$MONGO_URI` specified as an `env` variable. To do so:

```shell
git clone git@github.com:eyskim/course_reqs_api.git
cd course_reqs_api/
npm install
npm run build
npm start
```

### Testing

The application depends on `jest` (https://jestjs.io/) for its unit tests. To run:

```shell
npm run test
```

(Eventually commands to run specific test suites will be added)

### Upcoming

See: https://github.com/eyskim/course_reqs_api/issues for current development efforts.

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are welcome.

## Links

- Repository: https://github.com/eyskim/course_reqs_api/
- Issue tracker: https://github.com/eyskim/course_reqs_api/issues
  - In case of sensitive bugs like security vulnerabilities, please contact `erickim195@gmail.com` directly instead of using issue tracker. Thank you for your efforts to improve the security and privacy of this project!
- Related projects:
  - Scraper: https://github.com/eyskim/course_reqs_scraper/

## Licensing

The code in this project is licensed under MIT license.