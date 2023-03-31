import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
    const { method } = req

    switch (method) {
        case 'POST':
            const { title } = req.body
            const list = await prisma.list.create({
                data: {
                    title
                }
            })
            res.status(201).json(list)
            break
        default:
            res.status(405).end(`Method ${method} Not Allowed`)

        case "GET":
            const lists = await prisma.list.findMany();
            if (!lists) {
                res.status(404).json({ message: "Your list was not found!" });
                break;
            }
            res.status(200).json(lists);
            break;
    }
}