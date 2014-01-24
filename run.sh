#/bin/bash
#run the website locally
mvn -q clean package
mvn -q exec:java 
