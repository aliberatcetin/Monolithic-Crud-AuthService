module.exports = {
    dbUser:process.env.DB_USER,
    dbPass:process.env.DB_PASS,
    jwtSecret: process.env.API_KEY,
    port: process.env.PORT,
    fireBaseApiToken: process.env.FIREBASE_API_TOKEN,
    notificationMail:process.env.NOTIFICATION_MAIL,
    notificationMailPass:process.env.NOTIFICATION_MAIL_PASS,
    secret:process.env.APP_SECRET,
    dbUrl:process.env.DB_URL
}