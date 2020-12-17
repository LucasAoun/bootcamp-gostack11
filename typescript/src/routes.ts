import {Request, Response} from 'express'
import createUser from './services/CreateUser'

export function helloWorld(req: Request, res: Response){
  const user = createUser({
    name: 'Lucas Aoun',
    email: 'souolucas2009@gmail.com',
    password: '140858',
    techs: [
      'Node.js',
      'ReactJS',
      'React Native',
      {title: 'javascript', experience: 100}
    ]
  })
  return res.json({message: 'hello world'})
}