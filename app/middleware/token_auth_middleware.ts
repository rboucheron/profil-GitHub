import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import User from '#models/user';

export default class TokenAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const token = ctx.request.header('Authorization'); 

    if (!token) {
      return ctx.response.status(401).json({
        message: 'Token is missing'
      })
    }
  
    const user = User.findBy('token', token) 
  
    if(!user) {
      return ctx.response.status(401).json({
        message: 'Invalid token'
      })
    }




    return next()
  

 
  }
}

