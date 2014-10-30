/* DON'T NEED TO MODIFY THIS UNLESS THERE'S A BUG */

var facades = {
	user: "UserFacade",
	public: "PublicFacade",
	toolinfo: "ToolUsageInformation",
	usage: "UsageInformation",
	friends: "FriendFacade",
	networks: "NetworkFacade",
	workflow: "WorkflowRepository"
}

var username = ""; // ADD YOUR GENSPACE USERNAME
var password = ""; // ADD YOUR GENSPACE PASSWORD

var facade = "toolinfo"; // KEY OF FACADE YOU WANT TO LOOK AT (FROM LIST ABOVE)

var soapFunction = "getAllWorkflowsIncluding"; // SOAP FUNCTION YOU WANT TO TRY (COMMENT OUT TO GET ALL FUNCTIONS FOR FACADE)
var soapArgs = {arg0: 32}; // ARGS TO PASS TO SOAP FUNCTION

/* SHOULDN'T NEED TO MODIFY BELOW THIS LINE */
var soap = require('soap');

var baseUrl = "http://genspace.cs.columbia.edu:8080/";

var url = baseUrl + facades[facade] + "Service/" + facades[facade] + "?wsdl";

hashedPassword = require('crypto').createHash('sha1').update(password).digest('hex');

soap.createClient(url, function(err, client) {
	if(err) {
		console.log("CLIENT ERROR" ,err);
	}
	else {
		client.setSecurity(new soap.BasicAuthSecurity(username, hashedPassword));
		
		if(typeof soapFunction == "string" && typeof client[soapFunction] == "function") {
		
			console.log("DESCRIPTION OF FUNCTION");
			console.log(client.describe()[facades[facade] + 'Service'][facades[facade] + 'Port'][soapFunction]);
		
			client[soapFunction](soapArgs, function(err, result) {
				if(err)
					console.log("ERROR" + err);
				else {
					console.log("FUNCTION RETURNED");
					console.log(result['return']);
				}
			});
		}
		else {
			console.log("Function not passed or doesn't exist");
			console.log("All available functions");
			console.log(client.describe()[facades[facade] + 'Service'][facades[facade] + 'Port']);
		}
	}
});



