import { Hono } from 'hono'
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from "@satyamdeveloper/medium-common"

export const userRouter = new Hono<
  {
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET_KEY: string
    }
  }>()

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success)
        {
            c.status(411)
            return c.json({error: "WRONG INPUTS"})
        }
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name
      },
    })
  
    const id = newUser.id
  
  
    const token = await sign({ id: id }, c.env.JWT_SECRET_KEY)
  
    return c.json({ token })
  
  })
  userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
    const {success} = signinInput.safeParse(body);
    if(!success)
        {
            c.status(411)
            return c.json({error: "WRONG INPUTS"})
        }
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password
      }
    }
    );
  
    if (!user) {
      c.status(403);
      return c.json({ error: "user not found" });
    }
  
    const token = await sign({ id: user.id }, c.env.JWT_SECRET_KEY)
  
    return c.json({ token })
  })