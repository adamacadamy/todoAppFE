// // live-server-config.js
 
// module.exports = {
//     port: 8080,              // Server runs on port 8080
//     open: true,              // Automatically opens the browser
//     file: "index.html",      // Default file served
//     wait: 1000,              // Waits 1 second before reloading
//     logLevel: 2,             // Verbose logging
//     watch: ['app'],          // Watches "app" directory
//     ignore: 'node_modules',  // Ignores "node_modules"
//     mount: [['/', '/app']], // Serves all "app" content at "/"
//     middleware: [function(req, res, next) { next(); }] // Basic middleware
// };
// module.exports = {
//     port: 8080,              // Change port if needed
//     root: "app",             // Ensure 'app' is set as the root
//     open: true,              // Automatically open browser
//     file: "index.html",      // Default file to open
//     wait: 500,               // Delay reload by 500ms
//     logLevel: 2,             // Minimal logs
    
// };
module.exports = {
    port: 8080,               // Server runs on port 8080
    open: true,               // Automatically opens the browser
    root: ".",               // Serve from the current directory
    file: "index.html",       // Default file to serve
    wait: 1000,               // Wait before reloading
    logLevel: 2,              // Verbose logging 
};

