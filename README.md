# DOM Explorer
Takes a diff of the DOM of visited pages and depicts the perctange in which the page has changed.

## Build Webpack File
A webpack JS file needs to be built in order to run node modules in the browser extension. <br>
`$ npm run build`

## Operation Instructions
1. Run `npm install`
2. Run `npm run build`
3. Add the source folder to chrome://extensions in Chrome
Optional to avoid warnings: run `$ rm node_modules/public-encrypt/test/*.pem` so as not to load key files in Google Chrome.
4. Navigate to https://web.archive.org/ and select a webpage
5. Press the "DIFF" button inside the extension's pop-up
6. Manually change an element on the webpage or visit the same webpage from another year
7. Press the "DIFF" button again
8. View the client-side changes

## Viewing Results
If you would like to view the raw details of the results that were discussed in the COMP4905 report for DOM Explorer, please view the .pdf or .docx files in the /Results directory.