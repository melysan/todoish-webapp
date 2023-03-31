import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
    const { method } = req;
    const taskid = req.query.taskid

    switch (method) {
        case "GET":
            const tasks = await prisma.task.findMany({
                where: {
                    id: Number(taskid)
                }
            });
            if (!tasks) {
                res.status(404).json({ message: "Your task was not found!" });
                break;
            }
            res.status(200).json(tasks);
            break;
        case "POST":
            const { title } = req.body;
            const task = await prisma.task.create({
                data: {
                    title,
                },
            });
            res.status(201).json(task);
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

        case "DELETE":
            try {
                const deletedTask = await prisma.task.delete({
                    where: {
                        id: Number(taskid)
                    },
                });
                res.status(200).json(deletedTask);
                break;
            } catch (err) {
                console.log(err)
                res.status(500).json("Internal Error");
            }

        default:
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
