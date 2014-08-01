#!/bin/env node

var configuration = {
                        "port": "8080",
                        "mongoose": {
                            "uri": "mongodb://localhost/checkiner",
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
