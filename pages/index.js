import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import NavBar from '../components/navbar'
import { useSession } from "next-auth/react"

export default function Home() {
  const r = useRouter();
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        <Head>
          <title>Todoish</title>
          <meta name="description" content="Like Todoist but only ish" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/Melysa_Logo.png" />
        </Head>
        <main className={styles.main}>
          <NavBar />
          <div className={styles.container} >
            <h1 className={styles.mainTitle}>To Do List...ish.</h1> <br />
            <div className={styles.buttonContainer}>
              <button className={styles.homeButton} onClick={() => r.push('/profile')}>View Profile</button>
              <button className={styles.startButton} onClick={() => r.push('/lists')}>To The Lists</button>
            </div>

          </div>
        </main>
      </>
    )
  }
  return (
    <>
      <Head>
        <title>Todoish</title>
        <meta name="description" content="Like Todoist but only ish" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Melysa_Logo.png" />
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.container} >
          <h1 className={styles.mainTitle}>To Do List...ish.</h1> <br />
          <div className={styles.buttonContainer}>
            <button className={styles.homeButton} onClick={() => r.push('/api/auth/signin')}>Login</button>
            <button className={styles.startButton} onClick={() => r.push('/lists')}>Preview Lists</button>
          </div>

        </div>
      </main>
    </>
  )
}
