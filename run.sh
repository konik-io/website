#/bin/bash
#run the website locally
mvn exec:java -Dexec.mainClass=org.jbake.launcher.Main -Dexec.args="-s target/website-0.0.1-SNAPSHOT"
