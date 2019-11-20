# DOM Explorer
Takes a diff of the DOM of visited pages and depicts the perctange in which the page has changed.

## Build Webpack File
A webpack JS file needs to be built in order to run node modules in the browser extension. <br>
`$ npm run build`

## Operation Instructions
1. Run `npm install`
2. Run `npm run build`
3. Add the source folder to chrome://extensions in Chrome
4. Navigate to https://web.archive.org/ and select a webpage
5. Press the "DIFF" button inside the extension's pop-up
6. Manually change an element on the webpage or visit the same webpage from another year
7. Press the "DIFF" button again
8. View the client-side changes