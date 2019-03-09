# ArticleManager
Article Manage API for Technical Assessment Back End Developer.

## Overview

This is an Backend API built using expressJS, it manages articles and users and persist the data on a mongo Data Base.

## Requirement

- Running MongoDB Server

## Installation

```
$ npm install
$ npm run setup
```

If you don't want any dummy data use
```
$ npm install
$ npm run setup-no-dummy
```

same Environment Variables as npm start apply for Mongo connection when running setup

## Basic use

Basic usage listening on default port
```
$ npm start
```

Running on a different port
```
$ PORT=9999 npm start
```
Now api is running on port 9999

Setting up a different ApiKey
```
$ TOKEN=123456 npm start
```

Setting up a different MongoDB Server or DB
```
$ MONGO="mongodb://localhost:27018" DB="anotherDB" npm start
```

## API Docs

API Socumentation can be found on host:port/api/v1/api-docs
