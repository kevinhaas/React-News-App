/*
 * Created by Kevo on 6/14/2016.
 */

module.exports = {

	mongoUrl: "mongodb://HOSTIP:PORT/DBNAME", // if the db doesn't exist, it will be created when a document is inserted if you have the correct privileges

	dbcfg: {
		server: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}},
		user: "$USERNAME",
		pass: "$USERPASS",
		auth: {authdb: "$AUTHDB IF NEEDED"}
	}
	
};