import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
    const { method } = req

    switch (method) {
        case 'POST':
            const { title } = req.body
            const task = await prisma.task.create({
                data: {
                    title,
                    listId: Number(req.query.listsid),
                }
            })
            res.status(201).json(task)
            break
        default:
            res.status(405).end(`Method ${method} Not Allowed`)

        case "GET":
            const tasks = await prisma.task.findMany();
            if (!tasks) {
                res.status(404).json({ message: "Your task was not found!" });
                break;
            }
            res.status(200).json(tasks);
            break;

        case "DELETE":
            const deletedTask = await prisma.task.delete({
                where: {
                    listId: Number(req.query.listsid)
                },
            });
            res.status(200).json(deletedTask);
            break;

        case "PATCH":
            const { updatedTitle } = req.body;
            const updatedTask = await prisma.task.update({
                where: {
                    listId: Number(req.query.listsid)
                },
                data: {
                    title: updatedTitle,
                },
            });
            res.status(200).json(updatedTask);
            break;
    }
}