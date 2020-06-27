const express = require('express');
const router = express.Router();

const options = {
    apiKey: process.env.AT_API_KEY,
    username: 'sandbox'
}

const shortCode = '32531'

const AfricasTalking = require('africastalking')(options)

const sms = AfricasTalking.SMS

const ambulanceContacts = [
    { name: "AAR Insurance", location: "4th Ngong Avenue", phoneNumber: "254730633000" },
    { name: "AMREF Flying Doctors", location: "Wilson Airport", phoneNumber: "+254 20 6992299" },
    { name: "Avenue Rescue Services", location: "Parklands", phoneNumber: "+254203745750" },
    { name: "Emergency Response Services", location: "South C", phoneNumber: "+254770111090" },
    { name: "St John Ambulance Kenya", location: "St John's house, County Lane", phoneNumber: "+254720736591" },
    { name: "Intensive Care Air Ambulance LTD", location: "Langata Road", phoneNumber: "020604945" },
    { name: "West Ambulance service", location: "Meeky place - Ngong Rd", phoneNumber: "072022320705" },
]

const hospitalContacts = [
    { name: "Aga Khan", location: "Parklands", phoneNumber: "0722204146" },
    { name: "Coptic Hsp", location: "Ngong rd", phoneNumber: "0735558862" },
    { name: "KNH", location: "Ngong rd", phoneNumber: "0710600943" },
    { name: "Mbagathi Hsp", location: "Mbagathi way", phoneNumber: "020-2728530" },
    { name: "Jamaa Hsp", location: "Rabai Rd", phoneNumber: "0722681534" },
    { name: "Family Medical Center", location: "Mai Mahiu Rd", phoneNumber: "020 604296/7, 603923/7 " },
    { name: "Getrudes Garden Children's Hospital ", location: "Muthaiga Rd", phoneNumber: "020 244530/1, 020 720 6000" },
]

router.post('/', (req, res) => {
    let message;
    let { to, from, text } = req.body

    text = text.toString().toLowerCase().replace(/[\r\n]+/gm, "");

    switch (text) {
        case "help":
            message = "Reply with \n 1 if you would like ambulance services,\n 2 if you would like any hospital services and \n 3 for Fire Brigade Services"
            break;
        case "sos":
            message = "Reply with \n 1 if you would like ambulance services,\n 2 if you would like any hospital services and \n 3 for Fire Brigade Services"
            break;
        case "1":
            for (let contact of ambulanceContacts) {
                message = `${contact.name} - ${contact.phoneNumber}`
            }
            break;
        case "2":
            for (let contact of hospitalContacts) {
                message += `${contact.name} - ${contact.phoneNumber}`
            }
            break;
        case "3":
            message = "We're yet to add Firebrigade contacts here..."
            break;
        default:
            message = "Kindly type help or sos if you would like any form of emergency service"
            break;
    }

    if (to == shortCode) {
        sendResponse(from, message)
        res.json({ message: 'I guess that worked' })
    } else {
        res.json({ message: 'Oops, something went wrong' })
    }
});


sendResponse = (recipient, message) => {
    var opts = {
        from: shortCode,
        to: recipient,
        message: message
    }

    sms.send(opts)
        .then(res.json({ message: "Message sent successfully" }))
        .catch(res.json({ message: 'Something went wrong with message sending' }))
}

module.exports = router;


