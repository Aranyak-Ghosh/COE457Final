/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var wsbroker = "broker.mqttdashboard.com"; //mqtt websocket enabled broker
var wsport = 8000 // port for above
var client = new Paho.MQTT.Client(wsbroker, wsport,
    "myclientid_" + parseInt(Math.random() * 100, 10));

var options = {
    timeout: 3,
    onSuccess: function () {
        console.log("mqtt connected");
        client.subscribe('COE457/Animals/AK', { qos: 1 });
        var message = new Paho.MQTT.Message("AK connected");
        message.destinationName = "/COE457/Presence/AK";
        client.send(message);
    },
    onFailure: function (message) {
        console.log("Connection failed: " + message.errorMessage);
    }
};

var animals={
    default:'https://www.pablopicasso.org/images/paintings/the-roaster.jpg',
    rabbit:"https://www.peta.org/wp-content/uploads/2010/06/iStock_000008440542XSmall1.jpg"

};

client.onMessageArrived = function (message) {
    console.log(message.destinationName, ' -- ', message.payloadString);
    var name=message.payloadString;
    document.getElementById('msg').innerHTML=name;
    if(animals[name])
    {
        document.getElementById('img').src=animals[name];
    }
    else
    {
        document.getElementById('img').src=animals.default;
    }
};

var app = {
    // Application Constructor

    initialize: function () {
        
        client.connect(options);
    }
    
};

app.initialize();