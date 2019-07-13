const aws = require("aws-sdk");
const s3 = new aws.S3();

exports.handler = function(event, context, callback) {
	let mailInfo = event.Records[0].ses.mail;
	let messageId = mailInfo.messageId;
	console.log(`Processing invoice for email ID ${messageId}`);

	let contentType = mailInfo.headers.filter((header) => header.name === "Content-Type")[0];
	let contentTypeBoundary = contentType.value.match(/^multipart\/alternative; boundary="(.*)"$/)[1];

	console.log(`Content Type boundary ${contentTypeBoundary}`)

	let inboxS3Prefix = process.env.INBOX_S3_PREFIX
	let s3Key = inboxS3Prefix ? `${inboxS3Prefix}/${messageId}` : messageId;
		
	console.log(`S3 Key ${s3Key}`);

	s3.getObject(
		{
			Bucket: process.env.INBOX_S3_BUCKET,
			Key: s3Key
		},
		(err, data) => {
			if(err) {
				console.error("ERROR", err);
			} else {
				let email = data.Body.toString();
				
				console.log("Email contents START");
				console.log(email);
				console.log("Email contents END");

				let accountNumber = email.match(/ACCOUNT NO: (.*)/)[1];
				console.log(`ACCOUNT NUMBER ${accountNumber}`)

				let amount = email.match(/AMOUNT BALANCE: (.*)/)[1];
				console.log(`AMOUNT: KES ${amount}`)

				let lastAmountPaid =  email.match(/LAST AMOUNT PAID: (.*)/)[1];
				console.log(`LAST AMOUNT PAID ${lastAmountPaid}`);

				let dueDate = email.match(/DUE DATE: (.*) 00:00:00/)[1];
				console.log(`DUE DATE: ${dueDate}`);

			}
		}
	);
}
