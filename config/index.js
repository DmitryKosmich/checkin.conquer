
var configuration = {
                        "port": "8080",
                        "mongoose": {
                            "uri": "mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/checkiner",
                            "options": {
                                "server" : {
                                    "socketoptions": {
                                        "keepAlive": 1
                                    }
                                },
                                "user": "admin",
                                "pass": "Hl2NLYYtsHBK"
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