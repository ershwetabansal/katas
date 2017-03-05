## Available unit tests frameworks

- Jasmine
- Mocha

# Available e2e tests framework

- Protractor

## Available tests runners

- Karma

## Installation

### JavaScript dependencies

```
npm install
```

### Set up Karma

- Run ```karma init``` which will prompt few questions to create karma.conf.js file 
- Choose the framework to be used - Jasmine/Mocha etc.
- Add the location of source and spec javascript files.
- Set ```singleRun``` to false if you would like tests to continuously running while development is going on.
- Set ```singleRun``` to true if you would like to run it just once such as in testing environment.
- Add browsers which you would like to test on. 
    * Chrome, Firefox etc. can be mentioned in the 'browsers' property.
    * To run the tests in virtual environment, headless browser can be used which is PhantomJS.
    * Do remember to install npm dependency of the corresponding launcher, such as karma-phantomjs-launcher  
- For ES6 development, we can add processors to the Karma config file.
    * Babel is required to translate ES6 to ES5.
    * And Add below configuration parameters to karma.conf.js file -    
    ~~~~
    webpack : {},
    webpackMiddleware: {
      noInfo: true
    },
    preprocessors: {
         'tests/**/*Spec.js': ['webpack'],
         'src/**/*.js': ['webpack']
    },	
    ~~~~
    * Then add .babelrc file in the root of the project where karma.conf.js is present and add below content -
    ~~~~
    {
      "presets": ["es2015"]
    }
    ~~~~
- Run **Karma start** to start running the tests. 

3. Setup protractor
- Install protractor globally using **npm install protractor -g**
- Add a protractor.conf.js file
- Install webdriver-manager
- Run webdriver using **webdriver-manager start**
- Start tests using **protractor protractor.conf.js**
- Different suites can be added and then run using **protractor protractor.conf.js --suite <suite>**