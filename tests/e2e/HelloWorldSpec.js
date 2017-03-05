describe('My e2e test environment', function() {

    it('sees hello world printed on a page',function() {
       browser.get('');
        expect(element(by.tagName('body')).getText()).toEqual('Hello World!');
    });

});

