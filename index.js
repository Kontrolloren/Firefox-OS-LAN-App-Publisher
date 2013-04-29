process.stdin.resume();
process.stdin.setEncoding('utf8');

var util = require('util'),
    server = require("./server"),
    makefile = require("./makefile"),
    clientResponse = require("./clientResponse");
    os = require("os");
    apps = [];

process.stdin.on('data', function(text) {
    switch (text.toLowerCase()) {
        case "help\n":
            help();
            break;
        case "h\n":
            help();
            break;
        default:
            if (text.split(" ")[0] == "add") makefile.make(text, apps);
            if (text.split(" ")[0] == "u" || text.split("\n")[0] == "u") makefile.update(text, apps);
            break;
    }
    if (text === 'quit\n') {
        done();
    }
});

function help() {
    var interfaces = os.networkInterfaces();
    var ipAddress = [];
    for (k in interfaces) {
        for (k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family == 'IPv4' && !address.internal) {
                ipAddress.push(address.address)
            }
        }
    }
    console.log("\n--- HELP ---\n" +
        "Add app: \"add appname root/dir/of/app\" - (add awesomeapp /home/usr/awesomeapp)\n" +
        "Edit manifest.webapp so that '\"launch_path\": \"appname/index.html\"'\n" + 
        "To update on phone, go to: " + ipAddress[0] + ":8723/?app=appname\n" +
        "Type \"u\" to update all apps, or \"u appname\" to update one app\n" +
        "Autoupdate: u -a tg");
}

help();
server.start(clientResponse.respond);