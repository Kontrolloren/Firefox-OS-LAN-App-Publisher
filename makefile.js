var sys = require("sys"),
    lastUpdate = 0;

function make(text, apps) {
    var app = text.split(" ")[1],
        dir = text.split(" ")[2],
        dir = dir.split("\n")[0];
    copy(app, dir);
    apps.push([app,dir]);
}

function update(text, apps) {
    var text = text.split("\n")[0];
    if (text.length == 1) {
        for (var i in apps) {
            copy(apps[i][0], apps[i][1]);
        }
    }
    else {
        if (text.split(" ")[1] == "-a") {
            var app = text.split(" ")[2];
            for (var i in apps) {
                if (apps[i][0] == app) {
                    console.log("Auto update of " + app + " initialized");
                    setInterval(function(){copyOnInterval(app, apps[i][1])}, 500);
                }
            } 
        }
        else {
            var app = text.split(" ")[1];
            for (var i in apps) {
                if (apps[i][0] == app) {
                    copy(app, apps[i][1]);
                }
            }
        }
    }
}

function copyOnInterval (app, dir) {
    var exec = require("child_process").exec;
    function puts(error, stdout, stderr) {
        var updateTime = stdout.split("\n")[0];
        if (updateTime > lastUpdate) {
            lastUpdate = updateTime;
            copy(app, dir);
        }
    }
    exec("find " + dir + " -exec stat \\{} --printf='%Y\\n' \\; | sort -n -r | head -1", puts);

}

function copy(app, dir) {
    var exec = require("child_process").exec;
    function puts(error, stdout, stderr) { sys.puts(stdout) }
    exec("rm -rf ./" + app + " && cp -rf " + dir + " " + app, puts);
    console.log("The app " + app + " from " + dir + " was updated");
}

exports.make = make;
exports.update = update;