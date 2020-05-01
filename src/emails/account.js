const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

//sending welcome email
const sendWelcomeEmail = (email, name) => {
    sgMail.send(msg1)
}

const msg1 = {
    to: 'sodjanathan@gmail.com',
    from: 'sodjanathan@gmail.com',
    subject: 'Welcome!',
    text:`I hope this one actually gets to you.`
}

//sending cancellation email
const sendCancellationEmail = (email, name) => {
    sgMail.send(msg2)
}

const msg2 = {
    to: 'sodjanathan@gmail.com',
    from: 'sodjanathan@gmail.com',
    subject: 'Thanks for being here, we will miss you...',
    text:'Sorry to see you go, what can we do better next time...'
}

// sgMail.send(msg).then(() => {
//     console.log('Message sent')
// }).catch((error) => {
//     console.log(error.response.body)
// })

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}