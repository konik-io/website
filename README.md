# Project website

The master branch of this repository contains the website source code of [konik.io](http://konik.io). 

The generated website which the visitor sees is located in the [gh-pages](https://github.com/konik-io/website/tree/gh-pages) branch.

You can see the result in action on [konik.io](http://konik.io).

## Setup

Before you start make sure Java and Maven are installed on your system and work correctly. 

After Checking out the code 


Build website 
```
> mvn package
or 
> mvn clean package
```

Open new Terminal window and start webserver.
```
> mvn exec:java
```

Open http://localhost:8820/



[![Build Status](https://travis-ci.org/konik-io/website.png?branch=master)](https://travis-ci.org/konik-io/website)
