export default {

    tokenEmail: {
        secret: (<string>process.env.TOKEN_EMAIL_SECRET),
        expiresIn:(<string | number> process.env.TOKEN_EMAIL_EXPIRE_IN),
    }
}