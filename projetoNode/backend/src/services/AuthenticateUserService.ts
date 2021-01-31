import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import User from '../model/User'
import authConfig from '../config/auth'

interface Request{
  email: string
  password: string
}

interface Response{
  user: User
  token: string
}

class AuthenticateUserService {
  public async execute ({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User)
    const user = await usersRepository.findOne({ where: { email } })
    if (!user) {
      throw new Error('Incorrect Email/Password combination.')
    }
    // user.password - senha criptografada
    // password - senha nao criptograda
    const passwordMatched = await compare(password, user.password)
    if (!passwordMatched) {
      throw new Error('Incorrect Email/Password combination.')
    }
    // usuario autenticado

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn
    })

    return {
      user,
      token
    }
  }
}
export default AuthenticateUserService
