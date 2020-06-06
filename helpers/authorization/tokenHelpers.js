const sendJwtToClient = (user, res) =>{
    //Generate JWT
    const token = user.generateJwtFromUser();
    const title = user.title ? user.title : null
    const about = user.about ? user.about : null
    const website = user.website ? user.website : null
    const place = user.place ? user.place : null


    const {JWT_COOKIE, NODE_ENV} = process.env;
    return res
    .status(200)
    .cookie('access_token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
        secure : NODE_ENV === "development" ? false: true //if we are on development phase, "work only https" = false, else true
    })
    .json({
        success: true,
        access_token: token,
        data: {
            name: user.name,
            email: user.email,
            imgUrl: user.profile_image,
            title: title,
            about: about,
            place: place,
            website: website
        }
    });
};
const isTokenIncluded = (req) => {
    return (req.headers.authorization && req.headers.authorization.startsWith('Bearer:')
    );
};
const getAccessTokenFromHeader = (req) => {
    const authorization = req.headers.authorization;
    const access_token = authorization.split(" ")[1];
    return access_token;
}
module.exports = {
    sendJwtToClient,
    isTokenIncluded,
    getAccessTokenFromHeader
}
    // Response
