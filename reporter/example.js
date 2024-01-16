const { run } = require("apipecker");

// This test is not ready to be launched


const prod_url = "https://reporter.bluejay.governify.io/api/v4/contracts/tpa-CS169-2023-GH-cs169_fa23-chips-10.5-59/createPointsFromPeriods";
const dev_url = "http://localhost:5300/api/v4/contracts/tpa-class01-GH-cs169_fa23-chips-10.5-53/createPointsFromPeriods"

function myUrlBuilder(groupId){ 
    var url = dev_url;
    return url;
}

function myRequestBuilder(){
    var data = {
        "periods": [
            {
                "from": "2023-05-10T13:00:00.000Z",
                "to": "2023-05-10T13:59:58.999Z"
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    var requestConfig = {
        options : {
            method: "POST",
            headers: {
                'Api-Token': 'TOKEN',
                'Content-Type': 'application/json',
                'Content-Length': jsonData.length
            }
        },
        data : jsonData
    }

    return requestConfig;
}

function myResultsHandler(results){
    console.log(JSON.stringify(results.lotStats,null,2));
    console.log(JSON.stringify(results.summary,null,2));
}

run({
    concurrentUsers : 1,
    iterations : 1,
    delay : 5000,
    verbose : true,
    urlBuilder: myUrlBuilder,
    requestBuilder : myRequestBuilder,
    resultsHandler : myResultsHandler
});