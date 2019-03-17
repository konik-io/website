# Konik.io Project Website

The master branch contains the website source code of [konik.io](http://konik.io).

The generated website which the visitor sees is located in the docs/ folder.

The published result is located at [konik.io](http://konik.io).

## Setup

Before you start make sure Java (1.8) and Maven are installed on your system and work correctly.

After Checking out the code

Build website:

```sh
> mvn package
or
> mvn clean package
```

Start the local webserver to see the rendered page locally.

```sh
> mvn exec:java
```

Open http://localhost:8820/

## References

- The Website [konik.io](https://konik.io)
- Konik is made with [JBake](https://jbake.org) a Java based, open source, static site/blog generator for developers & designers.