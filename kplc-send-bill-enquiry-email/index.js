const aws = require("aws-sdk");
const nodemailer = require("nodemailer");

const ses = new aws.SES();

exports.handler = async(event) => {
	const mailOptions = {
		"from": process.env.CUSTOMER_EMAIL,
		"to": process.env.KPLC_EMAIL,
		"subject": process.env.CUSTOMER_ACCOUNT_NUMBER,
	}

	const transporter = nodemailer.createTransport({
		SES: ses,
	});

	transporter.sendMail(mailOptions, (err, info) => {
		console.log(info.envelope);

		if(err) {
			console.error("ERROR", err);
		} else {
			console.log(`SUCCESS. ID: ${info.messageId}`);
		}
	});
}
