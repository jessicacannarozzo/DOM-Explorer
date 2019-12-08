# DOM Explorer
Takes a diff of the DOM of visited pages and depicts the perctange in which the page has changed. 

**It is recommended to use the *wayback-machine* branch as it is more versatile and can be used on non-bookmarked websites. However, it does not save data under the full URL and instead uses the main name of a webpage. This means that in order to get a true diff of changes made to a specific webpage, avoid comparing two different webpages of the same url, such as https://github.com/ and https://github.com/marketplace**
To use the wayback-machine branch, after cloning the repository, run `$ git checkout wayback-machine`

## Build Webpack File
A webpack JS file needs to be built in order to run node modules in the browser extension. <br>
`$ npm run build`

## Operation Instructions
1. Run `npm install`
2. Run `npm run build`
3. Add the source folder to chrome://extensions in Chrome
4. Navigate to a bookmarked webpage
5. Press the "DIFF" button inside the extension's pop-up
6. Manually change an element on the webpage or wait until you notice a change in your bookmarked website
7. Press the "DIFF" button again
8. View the client-side changes

## Viewing Results
If you would like to view the raw details of the results that were discussed in the COMP4905 report for DOM Explorer, please view the .pdf or .docx files in the /Results directory.
<<<<<<< HEAD
=======
>>>>>>> 593e71b... Update README.md
=======
>>>>>>> e489774... Update README
