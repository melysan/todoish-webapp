import navStyles from '../styles/NavBar.module.css'
import Link from 'next/link'

export default function NavBar() {
    return (
        <>
            <div className={navStyles.navbarContainer}>
                <div className={navStyles.navbarLinks}>
                    <Link href="/">Todoish</Link>
                    <Link href="/profile">Profile</Link>
                </div>
            </div>
        </>
    )
}