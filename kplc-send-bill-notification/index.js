const aws = require("aws-sdk");
const s3 = new aws.S3();

exports.handler = function(event, context, callback) {
	let mailInfo = event.Records[0].ses.mail;
	let messageId = mailInfo.messageId;
	console.log(`Processing invoice for email ID ${messageId}`);

	let headers = mailInfo.headers.reduce((headers, header) => {
		headers[header.name] = header.value;
	}, {});

	let contentTypeBoundary = headers["Content-Type"]
		.match(/^multipart\/alternative; boundary="(.*)"$/)[0];

	console.log(`Content Type boundary ${contentTypeBoundary}`)
}
