import Link from "next/link"

export default function Header() {
    return (
        <header className="flex h-[var(--header-height)] items-center px-7">
            <nav className='flex space-x-5'>
                <Link href="/home">HOME</Link>
                <Link href="/login">LOGIN</Link>
            </nav>
        </header>
    )
}