var DB_HOST = process.env.OPENSHIFT_MONGODB_DB_HOST;
var DB_PORT = process.env.OPENSHIFT_MONGODB_DB_PORT;

var configuration = {
                        "port": "8080",
                        "mongoose": {
                            "uri": "mongodb://admin:r3rl4C-v7WT6@"+DB_HOST+":"+DB_PORT+"/checkiner",
                            "options": {
                                "server" : {
                                    "socketoptions": {
                                        "keepAlive": 1
                                    }
                                },
                                "user": "admin",
                                "pass": "r3rl4C-v7WT6"
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
