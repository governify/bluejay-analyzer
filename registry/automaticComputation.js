const { run } = require("apipecker");


globalConfig = 
{
    production: true, // true if you want to run the test in production, false if you want to run it in development
    delay: 10000, // waiting time between one iteration and another
    iterations: 1, // number of iterations to be made
    concurrentUsers: 1 // number of requests to be made in 1 iteration
}

projectConfig =
{
    projectId: "tpa-CS169-2023-GH-cs169_fa23-chips-10.5-59", // id of the project you want to test
    year: 2022, // start computing year
    month: 1, // start computing month
    day: 1 // start computing day
}

// Tests the system's ability to perform calculations one after another ----------------------------------------------------------------
var globalHour;
var globalDay;
var globalMonth;
var globalYear;


function myUrlBuilder(){
    console.log("Requesting test for 1 hour...")

    var url = "";

    globalHour = tranformHour();
    globalDay =  tranformDay();
    globalMonth = tranformMonth();
    globalYear = tranformYear();

    if(globalConfig.production){
        var prod_url = "https://registry.bluejay.governify.io/api/v6/states/" + projectConfig.projectId + "/guarantees?from=" + globalYear + "-" + globalMonth + "-" + globalDay + "T" + globalHour + ":00:00.000Z&to=" + globalYear + "-" + globalMonth + "-" + globalDay + "T" + globalHour + ":59:59.999Z&newPeriodsFromGuarantees=false";
        url = prod_url
    }else{
        var dev_url = "http://localhost:5400/api/v6/states/" + projectConfig.projectId + "/guarantees?from=" + globalYear + "-" + globalMonth + "-" + globalDay + "T" + globalHour + ":00:00.000Z&to=" + globalYear + "-" + globalMonth + "-" + globalDay + "T" + globalHour + ":59:59.999Z&newPeriodsFromGuarantees=false"
        url = dev_url;
    }

    globalHour = tranformHour();
    globalDay =  tranformDay();
    globalMonth = tranformMonth();
    globalYear = tranformYear();

    if(globalHour != 23){
        globalHour++;
    } else if(globalHour == 23 && globalDay != 28){ // Day change
        globalHour = 0;
        globalDay++;
    } else if(globalHour == 23 && globalDay == 28 && globalMonth != 12){ // Month change
        globalHour = 0;
        globalDay = 1;
        globalMonth++;
    } else if(globalHour == 23 && globalDay == 28 && globalMonth == 12){ // Year change
        globalHour = 0;
        globalDay = 1;
        globalMonth = 1;
        globalYear++;
    }

    return url
}

function tranformHour(){
    if(typeof globalHour == "string"){
        globalHour = parseInt(globalHour, 10);
    } else {
        if(globalHour.toString().length == 1){
            globalHour = "0" + globalHour.toString();
        } else{
            globalHour = globalHour.toString();
            console.log(globalHour)
        }
    }
    return globalHour;
}

function tranformDay(){
    if(typeof globalDay == "string"){
        globalDay = parseInt(globalDay, 10);
    } else {
        if(globalDay.toString().length  == 1){
            globalDay = "0" + globalDay.toString();
        } else{
            globalDay = globalDay.toString();
        }
    }
    return globalDay;
}

function tranformMonth(){
    if(typeof globalMonth == "string"){
        globalMonth = parseInt(globalMonth, 10);
    } else {
        if(globalMonth.toString().length  == 1){
            globalMonth = "0" + globalMonth.toString();
        } else{
            globalMonth = globalMonth.toString();
        }
    }
    return globalMonth;
}

function tranformYear(){
    if(typeof globalYear == "string"){
        globalYear = parseInt(globalYear, 10);
    } else {
        globalYear = globalYear.toString();
    }
    return globalYear;
}

function initializeGlobalVariables(){
    globalHour = 0;
    globalDay = projectConfig.day;
    globalMonth = projectConfig.month;
    globalYear = projectConfig.year;
}


function runAnalyzer() {
    run({
        concurrentUsers: 50,
        iterations: globalConfig.iterations,
        delay: globalConfig.delay,
        verbose: true,
        urlBuilder: myUrlBuilder,
        consoleLogging: true,
    });
}


function runAllAnalyzers() {
    initializeGlobalVariables();
    if(!globalConfig.production){ //DEVELOP
        console.log("Requesting test in develop...")
        runAnalyzer();
    } else if(globalConfig.production){ //PRODUCTION
        console.log("Requesting test in production...")
        runAnalyzer();
    }
}

runAllAnalyzers();
