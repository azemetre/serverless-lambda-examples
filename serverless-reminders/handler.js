require('dotenv').config();

'use strict';

module.exports.sendReminderDaily = (event, context, callback) => {
    
    var AWS = require('aws-sdk');
    AWS.config.update({region:'us-east-1'});
    var ses = new AWS.SES();
    var fs = require('fs');

    var emailHtml = fs.readFileSync('./dailyReminder.html', 'utf-8');

    var toAndFromAddress = process.env.VERIFIED_AWS_EMAIL;
    var params = {
        Destination: {
            ToAddresses: [toAndFromAddress]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8", 
                    Data: emailHtml
                }, 
                Text: {
                    Charset: "UTF-8", 
                    Data: "Remember to continue helping flossing your teeth!"
                }
            }, 
            Subject: {
                Charset: "UTF-8", 
                Data: "Dental Hygiene Reminder"
            }
        },
        ReplyToAddresses: [toAndFromAddress],
        Source: toAndFromAddress, 
    };

    ses.sendEmail(params, function(err, data) {
        // an error occurred
        if (err) console.log(err, err.stack); 
        // successful response
        else callback(null, data);
    }); 
};

module.exports.sendReminderWeekend = (event, context, callback) => {
    
    var AWS = require('aws-sdk');
    AWS.config.update({region:'us-east-1'});
    var ses = new AWS.SES();
    var fs = require('fs');

    var emailHtml = fs.readFileSync('./weekendReminder.html', 'utf-8');

    var toAndFromAddress = 'replace.with.verified.ses.email@aws.com'
    var params = {
        Destination: {
            ToAddresses: [toAndFromAddress]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8", 
                    Data: emailHtml
                }, 
                Text: {
                    Charset: "UTF-8", 
                    Data: "Here's a weekend reminder: floss your damn teeth."
                }
            }, 
            Subject: {
                Charset: "UTF-8", 
                Data: "Dental Hygiene Reminder"
            }
        },
        ReplyToAddresses: [toAndFromAddress],
        Source: toAndFromAddress, 
    };

    ses.sendEmail(params, function(err, data) {
        // an error occurred
        if (err) console.log(err, err.stack); 
        // successful response
        else callback(null, data);
    }); 
};