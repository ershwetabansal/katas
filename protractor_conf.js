exports.config = {
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

    capabilities: {
        'browserName': 'chrome'
    },

    suites: {
        'hello_world' :['tests/e2e/HelloWorldSpec.js']
    },
    framework: 'jasmine2',

    jasmineNodeOpts: {
        showColors: true
    },

    baseUrl: 'http://localhost:3000/',
    allScriptsTimeout: 1200000,
    onPrepare: function() {
        browser.driver.manage().window().setSize(1900, 3000);
        browser.driver.get('http://localhost:3000/');
        browser.ignoreSynchronization = true;
        return browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                console.log(url);
                return true;
            });
        }, 10000);
    }
};