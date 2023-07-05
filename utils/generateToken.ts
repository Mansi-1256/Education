import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    const jwtSecret = process.env.JWT_SECRET as string
    return jwt.sign({ id: user.id }, jwtSecret, {
        expiresIn: '30d',
    })

}