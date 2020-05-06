# BVTech - exercise (Peter Iring)

_This is a solution for the interview task given by BVTech, using ruby, rails, react, redux and typescript_

---
**NOTE:**

Please take into consideration that this was my first application written in ruby, so I mainly focused on the frontend.
Also I haven't worked with react in the past 3 years, so some of the solutions might be out of date.
Everything was implemented from scratch, I didn't (and couldn't) use any code from previous projects.

Sadly, unknown paths are currently not handled, because the implementation already took too much time, and I didn't know if it was necessary to do so for the excersise.

---


The task was to implement a basic application with ruby, rails and react, that follows the given url restrictions, and has 100% test coverage.
The JSON resource given was not reachable, from the country I worked from, so first I tried to setup a proxy that modifies the overpassing request's origin, but I couldn't manage it to work in a reasonable amount of time, so I followed a simpler approach, recommended by Juan, and downloaded the resource through a VPN server and placed it into the project's root folder. The resource can be found as `mini_inplay.json`.
I wrote a pretty simple json parser for the downloaded resource and served it as an API, so no database was necessary.

For the frontend I chose redux and typescript, with some additional packages and middlewares. I didn't feel the necessity to split up the reducer, since this is not a complex application, and the state is managable the way it is.
With using [material-ui](https://material-ui.com/), it wasn't required to write any scss.
I bundled the actions with their action-creators, and provided an OOP approach to handle them. I used [serializr](https://github.com/mobxjs/serializr/) for JSON and action serialization, because this package works quite well with typescript.

For testing I used jest, and enzyme, and provided nearly 100% test coverage.
The application is currently not handling any configuration options. It would be a nice to parse the environment variables to modify them.

# Installation

The application was written on Windows 10 (64bit), with VisualStudioCode 1.44.2 IDE, and Prettier extension 4.5.0. 

The versions of global dependencies were:
```
ruby: 2.6.6p146 (2020-03-31 revision 67876) [x64-mingw32]
rails: 6.0.2.2
node: v14.0.0
npm: 6.14.4
yarn: 1.22.4
typescript: 3.8.3
```
to install local dependencies:
```
bundle install
yarn
```


# Getting started

To start the application, run: `yarn start`

For the tests and coverage, run: `yarn test`

# Test coverage results

```
-----------------------|---------|----------|---------|---------|-------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------------|---------|----------|---------|---------|-------------------
All files              |     100 |     87.7 |     100 |     100 |
 components            |     100 |      100 |     100 |     100 |
  App.tsx              |     100 |      100 |     100 |     100 |
  AppBreadcrumbs.tsx   |     100 |      100 |     100 |     100 |
  EventDetails.tsx     |     100 |      100 |     100 |     100 |
  EventList.tsx        |     100 |      100 |     100 |     100 |
  Loader.tsx           |     100 |      100 |     100 |     100 |
  SportList.tsx        |     100 |      100 |     100 |     100 |
  SportPlaceholder.tsx |     100 |      100 |     100 |     100 |
 models                |     100 |      100 |     100 |     100 |
  event.model.ts       |     100 |      100 |     100 |     100 |
  index.ts             |     100 |      100 |     100 |     100 |
  sport.model.ts       |     100 |      100 |     100 |     100 |
 services              |     100 |      100 |     100 |     100 |
  backend.service.ts   |     100 |      100 |     100 |     100 |
  index.ts             |     100 |      100 |     100 |     100 |
 state                 |     100 |      100 |     100 |     100 |
  index.ts             |     100 |      100 |     100 |     100 |
  root.reducer.ts      |     100 |      100 |     100 |     100 |
  store.tsx            |     100 |      100 |     100 |     100 |
 state/actions         |     100 |    60.53 |     100 |     100 |
  base.action.ts       |     100 |      100 |     100 |     100 |
  get-event.action.ts  |     100 |       50 |     100 |     100 | 28-64
  get-events.action.ts |     100 |       50 |     100 |     100 | 16-55
  get-sport.action.ts  |     100 |       50 |     100 |     100 | 16-49
  get-sports.action.ts |     100 |     62.5 |     100 |     100 | 33-57
  index.ts             |     100 |      100 |     100 |     100 |
 utility               |     100 |      100 |     100 |     100 |
  index.ts             |     100 |      100 |     100 |     100 |
  unique.ts            |     100 |      100 |     100 |     100 |
-----------------------|---------|----------|---------|---------|-------------------

Test Suites: 12 passed, 12 total
Tests:       76 passed, 76 total
Snapshots:   0 total
Time:        13.612s, estimated 27s
```
