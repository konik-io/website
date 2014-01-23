if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
  echo -e "building jbake snapshot from repository\n"
  git clone https://github.com/Vad1mo/JBake.git jbake  
  cd jbake
  mvn -q install -DskipTests
  cd ..
  rm -rf jbake  
  echo -e "Build jbake\n"
fi