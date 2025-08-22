import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message: "Unauthorized access"});
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user  = decoded;
        next();
    } catch (error) {
        return res.status(400).json({message: "Invalid token"});
    }
};

export default authenticate;