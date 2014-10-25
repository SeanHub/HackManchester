#Project Template

Project template including a node server, file watcher, bower dependency injector and karma test runner.  

- Install NodeJS then run the following in a terminal
>``
npm install -g grunt-cli
``  
>``
npm install -g bower
``  

- The following command will create the node_modules folder and add all of the packages defined inside of package.json
>``
npm install
``

- The following command will create the folder referenced inside of .bowerrc and add the css/javascript dependencies
>``
bower install
``

- Now run the Grunt tasks that have been added inside of gruntfile.js
>``
grunt build
``  
>``
grunt test
``  
>``
grunt run
``