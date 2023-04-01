import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { prisma } from '../server/db/client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from '../components/navbar'
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"

export default function Page({ tasks, listsid }) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [tasksList, setTasksList] = useState(tasks);

    useEffect(() => {
        setTasksList(tasks)
    }, [tasks])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.post(`/api/lists/${listsid}/tasks`, { title: newTaskTitle })
        setTasksList([...tasksList, res.data])
        setNewTaskTitle('')
    }


    const handleBack = () => {
        router.push('/lists')
    }
    const router = useRouter()
    const { data: session } = useSession()

    const { title } = router.query

    const handleDeleteTask = async (taskId) => {
        const res = await axios.delete(`/api/lists/${listsid}/tasks/${taskId}`);
        setTasksList(tasksList.filter((task) => task.id !== taskId));
        console.log(taskId)
    };

    if (session) {
        return (

            <>
                <Head>
                    <title>Todoish Tasks</title>
                    <meta name="description" content="Like Todoist but only ish." />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/Melysa_Logo.png" />
                </Head>
                <main className={styles.main}>
                    <NavBar />
                    <div className={styles.container} >
                        <p className={styles.back} onClick={handleBack}>Lists</p>


                        <h1 className={styles.h1}>{title}</h1>
                        <ul className={styles.scroll}>
                            <div className={styles.center} >
                                {tasksList.map((task) => (
                                    <li className={styles.li} key={task.id}>
                                        <button className={styles.delete} onClick={() => handleDeleteTask(task.id)}></button><br />
                                        <label className={styles.taskTitle}>{task.title}</label>
                                    </li>
                                ))}
                            </div>
                        </ul>
                        <form className={styles.form} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
                            <input className={styles.inputField} type="text" placeholder="What's your task?" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
                            <button className={styles.button} type="submit">Create a Task</button>
                        </form>
                    </div>
                </main>
            </>
        )
    }
    return (
        <>
            <Head>
                <title>Todoish Tasks</title>
                <meta name="description" content="Like Todoist but only ish." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/Melysa_Logo.png" />
            </Head>
            <main className={styles.main}>
                <NavBar />
                <div className={styles.container} >
                    <p className={styles.back} onClick={handleBack}>Lists</p>
                    <h1 className={styles.h1}>Please log in to view tasks.</h1>

                </div>
            </main>
        </>

    )
}

export async function getServerSideProps(context) {
    const id = Number(context.params.id)
    const tasks = await prisma.task.findMany({
        where: {
            listId: id
        }
    })

    return {
        props: {
            tasks: JSON.parse(JSON.stringify(tasks)),
            listsid: id
        },
    }
}