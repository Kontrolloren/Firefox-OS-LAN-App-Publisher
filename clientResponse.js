var querystring = require("querystring"),
    fs = require('fs');

function respond(response, app, pathname) {
    switch (app) {
        case "appNotFound":
            otherPage(response, pathname);
        break;
        default:
            appRespond(response, app);
        break;
    }
}

function appRespond(response, app) {
    var doc = "<html>\n" +
    "<head>\n" +
    "<script>\n" +
    "function start() {\n" +
    "var request = window.navigator.mozApps.install('http://192.168.0.115:8723/" + app + "/manifest.webapp');\n" +
    "request.onsuccess = function () {\n" +
    "var appRecord = this.result;\n" +
    "};\n" +
    "request.onerror = function () {\n" +
    "alert('Install failed, error: ' + this.error.name);\n" +
    "};\n" +
    "}\n" +
    "</script>\n" +
    "</head>\n" +
    "<body onload='start()'>\n" +
    "</body>\n" +
    "</html>\n";
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(doc);
    response.end();
    console.log("App request: " + app);
}

function otherPage(response, pathname) {
    var fileType = pathname.split('.').pop(),
        file = "." + pathname
        contentType = "",
        requestedFile = "";
    console.log("Path req: " + file);
    switch (fileType) {
        case "png": contentType = "image/png"; break;
        case "jpg": contentType = "image/jpeg"; break;
        case "jpeg": contentType = "image/jpeg"; break;
        case "mp3": contentType = "audio/mpeg"; break;
        case "html": contentType = "text/html"; break;
        case "zip": contentType = "application/zip"; break;
        case "php": contentType = "application/php"; break;
        case "css": contentType = "text/css"; break;
        case "js": contentType = "application/x-javascript"; break;
        default: contentType = "text/plain"; break;
    }
    fs.readFile(file, function(err, data) {
        if (err) requestedFile = "something went wrong...";
        else requestedFile = data;
        response.writeHead(200, {"Content-Type": "contentType"});
        response.end(requestedFile);
    });
}

exports.respond = respond;