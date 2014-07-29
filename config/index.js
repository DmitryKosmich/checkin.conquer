#!/bin/env node
var connection_string = "mongodb://localhost/chat";

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME;
  }

var configuration = {
                        "port": "8080",
                        "mongoose": {
                            "uri": connection_string,
                            "options": {
                                "socketoptions": {
                                    "keepAlive": 1
                                }
                            }
                        },
                        "session": {
                            "secret": "KillerIsJim",
                            "key": "sid",
                            "cookie": {
                                "path": "/",
                                "httpOnly": true,
                                "maxAge": null
                            }
                        }
                    }

module.exports = configuration;
