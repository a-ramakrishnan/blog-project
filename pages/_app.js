import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../api'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async () => checkUser()
        )
        checkUser()
        return () => {
            authListener?.unsubscribe()
        };
    }, [])
    async function checkUser() {
        const user = supabase.auth.user()
        setUser(user)
    }
    return (
        <div className='container mx-auto'>
            <nav className="p-6 border-b border-gray-300">
                <Link passHref href="/">
                    <span className="mr-6 cursor-pointer">Home</span>
                </Link>
                {
                    user && (
                        <Link passHref href="/create-post">
                            <span className="mr-6 cursor-pointer">Create Post</span>
                        </Link>
                    )
                }
                {
                    user && (
                        <Link passHref href="/my-posts">
                            <a className="m-6">My Posts</a>
                        </Link>
                    )
                }
                <Link passHref href="/profile">
                    <span className="mr-6 cursor-pointer">Profile</span>
                </Link>
            </nav>
            <div className="py-8 px-16">
                <Component {...pageProps} />
            </div>
        </div>
    )
}

export default MyApp
