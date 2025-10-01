import jwt, { decode } from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    console.log("Authenticating user...");
    const authHeader = req.header("Authorization");

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message: "Unauthorized access"});
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user  = decoded;
        next();
    } catch (error) {
        return res.status(400).json({message: "Invalid token"});
    }
};

export default authenticate;