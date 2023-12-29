const { run } = require("apipecker");

//tpa-class01-GH-cs169_fa23-chips-10.5-53
//Probar como aumentan los tiempos con respecto al numero de horas

function myUrlBuilder(test, project, year, month, day){
    var hour = "";
    if(test == 0){
        hour = "00"
    } else if(test == 1){
        hour = "01"
    } else if(test == 2){
        hour = "03"
    } else if(test == 3){
        hour = "07"
    } else if(test == 4){
        hour = "15"
    } else if(test == 5){
        hour = "23"
    }

    var dev_url = "http://localhost:5400/api/v6/states/" + project + "/guarantees?from=" + year + "-" + month + "-" + day + "T00:00:00.000Z&to=" + year + "-" + month + "-" + day + "T" + hour + ":59:59.999Z&newPeriodsFromGuarantees=false"

    return dev_url
}


function runAnalyzer(test, project, year, month){
    run({
        concurrentUsers : 1,
        iterations : 1,
        delay : 5000,
        verbose : true,
        url: myUrlBuilder(test, project, year, month, "0" + (test+1).toString()),
        consoleLogging : true
    });


}

runAnalyzer(5, "tpa-class01-GH-cs169_fa23-chips-10.5-53", "2022", "01")



 
