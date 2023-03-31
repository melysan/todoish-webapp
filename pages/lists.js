import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { prisma } from '../server/db/client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import NavBar from '../components/navbar'
import { useSession } from "next-auth/react"


export default function Home({ lists }) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [newLists, setNewLists] = useState(lists)

    const router = useRouter()

    useEffect(() => {
        setNewLists(lists)
    }, [lists])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.post('/api/lists', { title, content })
        setNewLists([...newLists, res.data])
        setTitle('')
    }

    const { data: session } = useSession()
    if (session) {
        return (
            <>
                <Head>
                    <title>Todoish Lists</title>
                    <meta name="description" content="Like Todoist but only ish" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/Melysa_logo.png" />
                </Head>
                <main className={styles.main}>
                    <NavBar />
                    <div className={styles.container} >
                        <p className={styles.back} onClick={() => router.push('/')}>← Back to Home</p>
                        <h1 className={styles.h1}>Lists</h1>
                        <div className={styles.scroll}>
                            {newLists.map((list) => (
                                <div key={list.id}
                                    className={styles.list}
                                    onClick={() => router.push(
                                        {
                                            pathname: `/${list.id}`,
                                            query: { title: list.title }
                                        }
                                    )}> <p>
                                        {list.title} by {session.user.name}</p>
                                </div>
                            ))}
                        </div>

                        <form className={styles.form} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
                            <input className={styles.inputField} type="text" placeholder="What's your list for?" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <button className={styles.button} type="submit">Create a List</button>
                        </form>
                    </div>
                </main>
            </>
        )
    }
    return (
        <>
            <Head>
                <title>Todoish Lists</title>
                <meta name="description" content="Like Todoist but only ish" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/Melysa_logo.png" />
            </Head>
            <main className={styles.main}>
                <NavBar />
                <div className={styles.container} >
                    <p className={styles.back} onClick={() => router.push('/')}>← Back to Home</p>
                    <h1 className={styles.h1}>Lists</h1>
                    <div className={styles.scroll}>
                        {newLists.map((list) => (
                            <div key={list.id}
                                className={styles.list}
                                onClick={() => router.push(
                                    {
                                        pathname: `/${list.id}`,
                                        query: { title: list.title }
                                    }
                                )}> <p>
                                    {list.title}</p>
                            </div>
                        ))}
                    </div>


                </div>
            </main>
        </>
    )
}
export async function getServerSideProps() {
    const lists = await prisma.list.findMany()

    return {
        props: {
            lists: JSON.parse(JSON.stringify(lists)),
        },
    }
}