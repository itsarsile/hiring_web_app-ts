import jwt, { JwtPayload } from 'jsonwebtoken'

interface SignOptions {
  expiresIn?: string | number
}

const DEFAULT_SIGN_OPTION: SignOptions = {
  expiresIn: "1h",
}

export function signJwt(payload: JwtPayload, options: SignOptions = DEFAULT_SIGN_OPTION) {
  const secretKey = process.env.SECRET_KEY!
  const token = jwt.sign(payload, secretKey, options);
  return token
}

export function verifyJwt(token: string) {
  try {
    const secretKey = process.env.SECRET_KEY!;
    const decoded = jwt.verify(token, secretKey);
    return decoded as JwtPayload
  } catch (error) {
  console.log(error)
  }
}
