if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
  echo -e "Starting to update gh-pages\n"
  git clone https://github.com/Vad1mo/JBake.git jbake  
  cd jbake
  mvn install -DskipTests
  cd ..
  rm -rf jbake  
  echo -e "Build jbake\n"
fi