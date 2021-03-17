const http = require('http')
const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: "[ID]",
    secretAccessKey: "[SPEAKFRIENDANDENTER]",
    region: "eu-west-1",
});
const dynamo = new AWS.DynamoDB({apiVersion: '2012-08-10'});

async function writeToDynamo(dynamo, id, temp, gravity, tilt, battery){
    var params = {
        Item: {
            "iSpindelId": {
                S: id
            },
            "Temperature": {
                S: temp
            },
            "Gravity": {
                S: gravity
            },
            "Battery": {
                S: battery
            },
            "Tilt": {
                S: tilt
            },
            "Timestamp": {
                S: Date.now()
            }
        },
        ReturnConsumedCapacity: "TOTAL",
        TableName: "iSpindel"
    };
    dynamo.putItem(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });
}




http.createServer((request, response) => {
    const {headers, method, url} = request;
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk)
    }).on('end', ()=> {
        body = Buffer.concat(body).toString()
        console.log(body)
        const iSpindelData = JSON.parse(body)
        console.log(iSpindelData.temperature)
        console.log(iSpindelData.gravity)
        console.log(iSpindelData.angle)
        console.log(iSpindelData.battery)
        console.log(iSpindelData.ID)

        writeToDynamo(dynamo, iSpindelData.ID.toString(),
            iSpindelData.temperature.toString(), iSpindelData.gravity.toString(),
            iSpindelData.angle.toString(), iSpindelData.battery.toString()
        )

    })
}).listen(8085)