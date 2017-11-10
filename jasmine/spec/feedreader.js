/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Tests whether feed item contains URL.
        it('URLs are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            })
        });

        // Tests whether feed item contains name.
        it('Names are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            })
        });
    });


    // Suite tests whether the sliding menu works properly on page load and when clicked.
    describe('The menu', function() {
        
        // Setup body and menu icon variables
        let body = document.body;
        let menuBurger = document.querySelector(".menu-icon-link");

        // Tests whether the menu is hidden on page load.
        it('Menu hidden by default', function() {
            expect(body.className).toContain("menu-hidden");
        });
        
        // Tests whether menu toggles hide/show when burger icon is clicked
        it('Menu toggles on clicky-click', function() {
            menuBurger.click();
            expect(body.className).not.toContain("menu-hidden");
            menuBurger.click();
            expect(body.className).toContain("menu-hidden");
        });
    });


    // Suite tests whether loadFeed is loading content.
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        // Checks if feed contains at least 1 feed after loadFeed runs
        it("Contains at least 1 feed", function(done) {
            let numEntries = document.querySelector(".feed").getElementsByClassName("entry").length;
            expect(numEntries).toBeGreaterThan(0);
            done();
        });
    });

    // Suite tests if content on initial load matches content after loadFeed.
    describe('New Feed Selection', function() {
        
        // Check content on initial load.
        let feedOnLoad;
        beforeEach(function(done) {
            loadFeed(0, function() {
                feedOnLoad = document.querySelector(".feed").innerHTML;
                loadFeed(1, function() {
                    done();
                });
            });
        });

        // Tests whether content loaded by loadFeed is actually new, compated to the original content.
        it("Content changes on load", function(done) {
            let feedAfterLoader = document.querySelector(".feed").innerHTML;
            expect(feedOnLoad).not.toBe(feedAfterLoader);
            done();
        });

    });
    /* TODO: Clean up ugly ES5 anonymous functions" */
});
