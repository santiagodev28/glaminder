import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Espera formato: Bearer <token>

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Datos del token
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};