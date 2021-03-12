const admin = require('../firebase/firebase')

exports.authCheck = async (req, res, next) =>{
    // console.log(req.headers)
    try {
        const firebaseuser = await admin.auth().verifyIdToken(req.headers.authtoken)
        console.log("firebase Check in: ", firebaseuser)
        req.user = firebaseuser
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            err: "invalid or expired token"
        })
        
    }
}


