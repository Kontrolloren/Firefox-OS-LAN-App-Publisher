var http = require("http"),
    url = require("url"),
    querystring = require("querystring");

function start (clientResponse) {
    http.createServer(function(request,response) {
        var url_parts = url.parse(request.url, true),
            query = url_parts.query,
            appName = query.app,
            pathname = url.parse(request.url).pathname;
        if (appName !== undefined) clientResponse(response, appName);
        else clientResponse(response, "appNotFound", pathname);
	}).listen(8723);
    console.log("Server has started");
}

exports.start = start;