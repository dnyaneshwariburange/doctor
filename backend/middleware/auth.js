import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log(token)
    if (!token) {

        return res.status(401).send({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'prathamesh');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send({ message: 'Invalid token.' });
    }
};

export default auth;
