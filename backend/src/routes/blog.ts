import { Hono } from "hono";

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@sammar568/medium-common";


export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
        JWT_SECRET: string;
	}, 
    Variables: {
        userId: string
    }
}>();


blogRouter.use("/*", async (c, next) => {

    const authHeader = c.req.header("authorization");

    if (!authHeader) {
        return c.json({ message: "You are not logged in" }, 403);
    }

    try {
        const token = authHeader.split(" ")[1];

        const user = await verify(
        token,
        c.env.JWT_SECRET,
        "HS256"
        ) as { id: string };

        c.set("userId", user.id);
        await next();
    } catch {
        return c.json({ message: "Invalid token" }, 403);
    }
});


blogRouter.post('/',  async (c) => {

    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

    const authorId = c.get("userId");
    const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.blog.create({
        data: {
        title: body.title,
        content: body.content,
        authorId: Number(authorId),
        },
    })

    return c.json({
        id: blog.id
    })

  

})

blogRouter.put('/', async (c) => {
	const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

    const authorId = c.get("userId");
    const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.blog.update({
        where: {
            id: body.id
        }, 
        data: {
            title: body.title,
            content: body.content
        }
    })

    return c.json({
        id: blog.id
    })


})

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.blog.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });

    return c.json({
        blogs
    })
})

blogRouter.get('/:id', async (c) => {

    const id = c.req.param("id");
	const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.blog.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
    
        return c.json({
            blog
        });
    } catch(e) {
        c.status(411); // 4
        return c.json({
            message: "Error while fetching blog post"
        });
    }
})

