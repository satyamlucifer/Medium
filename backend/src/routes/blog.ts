import { Hono } from 'hono'
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createPostInput, updatePostInput } from "@satyamdeveloper/medium-common"


export const blogRouter = new Hono<
  {
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET_KEY: string
    },
    Variables: {
        id:string
    }
  }>()

  blogRouter.use('/*', async (c, next) => {
    const token = c.req.header("authorization") || "";
    const header = token.split(" ")[1]
    const response = await verify(header, c.env.JWT_SECRET_KEY)
    if (response.id) {
      c.set('id',response.id)
      await next()
    }
    else {
      c.status(403)
      return c.json({ message: "unauthorized" })
    }
  })

  blogRouter.post('', async (c) => {
    const body = await c.req.json();
    const {success} = createPostInput.safeParse(body);
    if(!success)
        {
            c.status(411)
            return c.json({error: "WRONG INPUTS"})
        }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: c.get('id')
    }})

    return c.json({id: blog.id})
  })
  blogRouter.put('', async (c) => {
    const body = await c.req.json();
    const {success} = updatePostInput.safeParse(body);
    if(!success)
        {
            c.status(411)
            return c.json({error: "WRONG INPUTS"})
        }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
    }})
    return c.json({id: blog.id})
  })
  blogRouter.get('/', async (c) => {

    const body = await c.req.json();

    try{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.findFirst({
        where: {
            id: c.req.query('id')
        }})

    return c.json({blog})}
    catch(e){
        c.status(500)
        return c.json({error :"Error while fetching blog"})
    }
  })
  //Todo : Add pagination
  blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.findMany();
    return c.json({blog})
  })
  