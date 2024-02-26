const fs = require('fs');
const myArgs = process.argv.slice(2);

const { configjson } = require('./templates');

function theDisplayConfig() {
    if(DEBUG) console.log('config.displayConfig()');
    fs.readFile(__dirname + "/config.json", (error, data) => {
        if(error) throw error;
        console.log(JSON.parse(data));
    });
}

function theResetConfig() {
    if(DEBUG) console.log('config.resetConfig()');
    let configData = JSON.stringify(configjson, null, 2);
    fs.writeFile(__dirname + '/config.json', configData, (error) => {
        if(error) throw error;
        if(DEBUG) console.log('Config file reset to original state');
    });
}

function theSetConfig() {
    if(DEBUG) console.log('config.setConfig()');
    if(DEBUG) console.log(myArgs);

    let theMatch = false;
    fs.readFile(__dirname + '/config.json', (error, data) => {
        if(error) throw error;
        if(DEBUG) console.log(JSON.parse(data));
        let cfg = JSON.parse(data);
        for(let key of Object.keys(cfg)){
            if(DEBUG) console.log(`K E Y: ${key}`);
            if(key === myArgs[2]) {
                cfg[key] = myArgs[3];
                theMatch = true;
            }
        }
        if(!theMatch) {
            console.log(`An invalid key: ${myArgs[2]}, try another one.`);
        }
        if(DEBUG) console.log(cfg);
        data = JSON.stringify(cfg, null, 2);
        fs.writeFile(__dirname + '/config.json', data, (error) => {
            if (error) throw error;
            if(DEBUG) console.log('Config file updated successfully!');
        });
    });
}

function configApp() {
    if(DEBUG) console.log('configApp()');

    switch (myArgs[1]) {
        case '--show':
            if(DEBUG) console.log('--show');
            theDisplayConfig();
            break;
        case '--reset':
            if(DEBUG) console.log('--reset');
            theResetConfig();
            break;
        case '--set':
            if(DEBUG) console.log('--set');
            theSetConfig();
            break;
        case '--help':
        case '--h':
        default:
            fs.readFile(__dirname + "/cliUsage.txt", (error, data) => {
                if(error) throw error;
                console.log(data.toString());
            });
    }
}

module.exports = {
    configApp,
}


