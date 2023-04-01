import { useSession, signIn, signOut } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import Image from 'next/image'
import NavBar from '../components/navbar'
import Head from 'next/head'

export default function Component() {
    const { data: session } = useSession()
    const router = useRouter()

    if (session) {
        return (
            <>
                <Head>
                    <title>Todoish Profile</title>
                    <meta name="description" content="Like Todoist but only ish." />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/Melysa_Logo.png" />
                </Head>
                <main className={styles.main}>
                    <NavBar />
                    <div className={styles.container} >
                        <div className={styles.center} >

                            <p>
                                Signed in as {session.user.name} <br />
                                {session.user.email} <br />
                            </p>
                            <Image src={session.user.image} alt="GitHub Profile Image" loading="lazy" width={100} height={100} /> <br />

                            <div className={styles.buttonContainer}>
                                <button className={styles.homeButton} onClick={() => router.push('/')}>Home</button>
                                <button className={styles.button} onClick={() => signOut()}>Sign out</button>
                            </div>
                        </div>
                    </div>

                </main>
            </>
        )
    }
    return (
        <>
            <main className={styles.main}>
                <div className={styles.container} >
                    <div className={styles.center} >

                        <p>
                            Not signed in
                        </p>
                        <button className={styles.button} onClick={() => signIn()}>Sign in</button>
                    </div>
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions)

    if (!session) {
        //redirect to login page
        return {
            redirect: {
                destination: "/api/auth/signin",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    }
}