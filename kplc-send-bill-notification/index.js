const aws = require("aws-sdk");
const s3 = new aws.S3();

exports.handler = function(event, context, callback) {
	let mailInfo = event.Records[0].ses.mail;
	let messageId = mailInfo.messageId;
	console.log(`Processing invoice for email ID ${messageId}`);

	let contentType = mailInfo.headers.filter((header) => header.name === "Content-Type")[0];
	let contentTypeBoundary = contentType.value.match(/^multipart\/alternative; boundary="(.*)"$/)[1];

	console.log(`Content Type boundary ${contentTypeBoundary}`)
}
