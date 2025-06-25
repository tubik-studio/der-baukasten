import nodemailer from "nodemailer";
import fs from "fs";

let transporter;
let htmlNotification;
let htmlGreetings;

const config = useRuntimeConfig();

// fs.readFile("./public/html/email-notification.html", function(err, html) {
//     if (err) {
//         throw err;
//     } else {
//         htmlNotification = String(html);
//     }
// });
//
// fs.readFile("./public/html/email-greetings.html", function(err, html) {
//     if (err) {
//         throw err;
//     } else {
//         htmlGreetings = String(html);
//     }
// });

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
async function createTransporter() {
    // create reusable transporter object using the default SMTP transport
    transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: config.smtpUser,
            pass: config.smtpPass
        }
    });
}

// Create transporter on server start
createTransporter().catch(console.error);

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const keys = Object.keys(body);
    const mapObject = {};
    let regExpString = "";

    // Create object and regExp to replace values in html file
    keys.forEach((key, id) => {
        mapObject[`%${key}%`] = body[key] || ""; // Create data object in format: '%key%': value
        regExpString += id ? `|%${key}%` : `%${key}%`; // Create regExp from keys in format: '%key%|%key%|%key%'
    });

    // Set Date
    mapObject["%dateNow%"] = new Date().toLocaleString();
    regExpString += "|%dateNow%";

    // Set domain
    mapObject["%domain%"] = config.nuxtHost;
    regExpString += "|%domain%";

    console.log(config);

    // Send email to Utopia
    let hostEmail = await transporter.sendMail({
        from: `Project name <${body.emailHost}>`, // sender address
        to: body.emailHost, // list of receivers
        subject: body.subjectHost, // Subject line
        html: htmlNotification.replace(new RegExp(regExpString, "gi"), function(matched) {
            return mapObject[matched];
        }) // html body
    });

    // Send greeting email to the user
    let userEmail = await transporter.sendMail({
        from: `Project name <${body.emailHost}>`, // sender address
        to: body.email, // list of receivers
        subject: body.subjectUser, // Subject line
        html: htmlGreetings.replace(new RegExp(regExpString, "gi"), function(matched) {
            return mapObject[matched];
        }) // html body
    });

    return {};
});