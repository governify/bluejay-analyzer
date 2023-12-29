const { run } = require("apipecker");

//tpa-class01-GH-cs169_fa23-chips-10.5-53
//Probar como aumentan los tiempos con respecto al numero de horas

var testNumber = 0;

function myUrlBuilder(project, year, month, day){
    var hour = "";
    if(testNumber == 0){
        hour = "00"
    } else if(testNumber == 1){
        hour = "01"
    } else if(testNumber == 2){
        hour = "03"
    } else if(testNumber == 3){
        hour = "07"
    } else if(testNumber == 4){
        hour == "15"
    } else if(testNumber == 5){
        hour == "24"
    }


    var dev_url = "http://localhost:5400/api/v6/states/" + project + "/guarantees?from=" + year + "-" + month + "-" + day + "T00:00:00.000Z&to=" + year + "-" + month + "-" + day + "T" + hour + ":59:59.999Z&newPeriodsFromGuarantees=false"

    testNumber++;
    return dev_url
}


function runAnalyzer(tests, project, year, month, day){
    run({
        concurrentUsers : 1,
        iterations : 1,
        delay : 5000,
        verbose : true,
        url: myUrlBuilder(project, year, month, day),
        consoleLogging : true
    });

    if(testNumber == 6){
        console.log("FINALIZADO CON " + (testNumber) + " EJECUCIONES")
        return
    } else{
        runAnalyzer(tests-1, "tpa-class01-GH-cs169_fa23-chips-10.5-53", "2022", "01","0" + (testNumber+1).toString())
    }
}

runAnalyzer(6, "tpa-class01-GH-cs169_fa23-chips-10.5-53", "2022", "01","01")



 
