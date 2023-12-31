const { run } = require("apipecker");

// TPA DE 10
    // dev: tpa-class01-GH-cs169_fa23-chips-10.5-53
    // prod:  tpa-Bluejay-2023-showcase-GH-gii-is-psg2_bluejay-psg2-23-24-bar-tpa

//TPA DE 5
    // dev: 
    // prod: tpa-CS169-2023-GH-cs169_fa23-chips-10.5-59

// Test how times increase with respect to the number of hours

function myUrlBuilder(test, project, year, month, day, prod){
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


function runAnalyzer(test, project, year, month, prod){
    run({
        concurrentUsers : 1,
        iterations : 5,
        delay : 5000,
        verbose : true,
        url: myUrlBuilder(test, project, year, month, "0" + (test+1).toString(), prod),
        consoleLogging : true
    });


}

//DEV
//runAnalyzer(0, "tpa-class01-GH-cs169_fa23-chips-10.5-53", "2023", "01", false)
//runAnalyzer(1, "tpa-class01-GH-cs169_fa23-chips-10.5-53", "2023", "01", false)
//runAnalyzer(2, "tpa-class01-GH-cs169_fa23-chips-10.5-53", "2023", "01", false)
//runAnalyzer(3, "tpa-class01-GH-cs169_fa23-chips-10.5-53", "2023", "01", false)
//runAnalyzer(4, "tpa-class01-GH-cs169_fa23-chips-10.5-53", "2023", "01", false)
//runAnalyzer(5, "tpa-class01-GH-cs169_fa23-chips-10.5-53", "2023", "01", false)

//PROD
//runAnalyzer(0, "tpa-Bluejay-2023-showcase-GH-gii-is-psg2_bluejay-psg2-23-24-bar-tpa", "2020", "05", true)
//runAnalyzer(1, "tpa-Bluejay-2023-showcase-GH-gii-is-psg2_bluejay-psg2-23-24-bar-tpa", "2020", "05", true)
//runAnalyzer(2, "tpa-Bluejay-2023-showcase-GH-gii-is-psg2_bluejay-psg2-23-24-bar-tpa", "2020", "05", true)
//runAnalyzer(3, "tpa-Bluejay-2023-showcase-GH-gii-is-psg2_bluejay-psg2-23-24-bar-tpa", "2020", "08", true)
//runAnalyzer(4, "tpa-Bluejay-2023-showcase-GH-gii-is-psg2_bluejay-psg2-23-24-bar-tpa", "2020", "05", true)
//runAnalyzer(5, "tpa-Bluejay-2023-showcase-GH-gii-is-psg2_bluejay-psg2-23-24-bar-tpa", "2020", "05", true)



 
