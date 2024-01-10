const { run } = require("apipecker");


globalConfig = 
{
    execId: 0, // 0 = 1 hour, 1 = 2 hours, 2 = 4 hours, 3 = 8 hours, 4 = 16 hours, 5 = 24 hours
    production: true // true if you want to run the test in production, false if you want to run it in development
}

projectConfig =
{
    projectId: "tpa-CS169-2023-GH-cs169_fa23-chips-10.5-59", // id of the project you want to test
    year: "2019", // computing year
    month: "10", // computing month
}

// Test how times increase with respect to the number of hours ----------------------------------------------------------------

function myUrlBuilder(execId, project, year, month, day, prod){
    var hour = "";
    if(execId == 0){
        hour = "00"
        console.log("Requesting test for 1 hour...")
    } else if(execId == 1){
        hour = "01"
        console.log("Requesting test for 2 hours...")
    } else if(execId == 2){
        hour = "03"
        console.log("Requesting test for 4 hours...")
    } else if(execId == 3){
        hour = "07"
        console.log("Requesting test for 8 hours...")
    } else if(execId == 4){
        hour = "15"
        console.log("Requesting test for 16 hours...")
    } else if(execId == 5){
        hour = "23"
        console.log("Requesting test for 24 hours...")
    }

    var url = "";

    if(prod){
        var prod_url = "https://registry.bluejay.governify.io/api/v6/states/" + project + "/guarantees?from=" + year + "-" + month + "-" + day + "T00:00:00.000Z&to=" + year + "-" + month + "-" + day + "T" + hour + ":59:59.999Z&newPeriodsFromGuarantees=false";
        url = prod_url
    }else{
        var dev_url = "http://localhost:5400/api/v6/states/" + project + "/guarantees?from=" + year + "-" + month + "-" + day + "T00:00:00.000Z&to=" + year + "-" + month + "-" + day + "T" + hour + ":59:59.999Z&newPeriodsFromGuarantees=false"
        url = dev_url;
    }

    return url
}


function runAnalyzer(execId, project, year, month, prod) {
    run({
        concurrentUsers: 1,
        iterations: 1,
        delay: 500,
        verbose: true,
        url: myUrlBuilder(execId, project, year, month, "0" + (execId + 1).toString(), prod),
        consoleLogging: true,
    });
}

function runAllAnalyzers(execId, production) {
    if(!production){ //DEVELOP
        console.log("Requesting test in develop...")
        if(execId == 0){ // 1 hour
            runAnalyzer(0, projectConfig.projectId, projectConfig.year, projectConfig.month, production);
        } else if(execId == 1){ // 2 hours
            runAnalyzer(1, projectConfig.projectId, projectConfig.year, projectConfig.month, production);
        } else if(execId == 2){ // 4 hours
            runAnalyzer(2, projectConfig.projectId, projectConfig.year, projectConfig.month, production);
        } else if(execId == 3){ // 8 hours
            runAnalyzer(3, projectConfig.projectId, projectConfig.year, projectConfig.month, production);
        } else if(execId == 4){ // 16 hours
            runAnalyzer(4, projectConfig.projectId, projectConfig.year, projectConfig.month, production);
        } else if(execId == 5){ // 24 hours
            runAnalyzer(5, projectConfig.projectId, projectConfig.year, projectConfig.month, production);
        }else{
            console.log("invalid execId")
        }
    } else if(production){ //PRODUCTION
        console.log("Requesting test in production...")
        if(execId == 0){ // 1 hour
            runAnalyzer(0, projectConfig.projectId, projectConfig.year, projectConfig.month, production);
        } else if(execId == 1){ // 2 hours
            runAnalyzer(1, projectConfig.projectId, projectConfig.year, projectConfig.month, production);
        } else if(execId == 2){ // 4 hours
            runAnalyzer(2, projectConfig.projectId, projectConfig.year, projectConfig.month, production);
        } else if(execId == 3){ // 8 hours
            runAnalyzer(3, projectConfig.projectId, projectConfig.year, projectConfig.month, production);
        } else if(execId == 4){ // 16 hours
            runAnalyzer(4, projectConfig.projectId, projectConfig.year, projectConfig.month, production);
        } else if(execId == 5){ // 24 hours
            runAnalyzer(5, projectConfig.projectId, projectConfig.year, projectConfig.month, production);
        } else{
            console.log("invalid execId")
        }
    }

}

runAllAnalyzers(globalConfig.execId, globalConfig.production);
