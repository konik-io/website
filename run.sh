#!/usr/bin/env sh

#run the website locally
mvn -q package
mvn -q exec:java 
