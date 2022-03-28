import Link from "next/link"
export default function Header() {
  return (
    <header id="header">
      <ul>
        <li>
          <Link href="/"><a>Home</a></Link>
        </li>
        <li>
          <Link href="/posts"><a>Posts</a></Link>
        </li>
      </ul>
    </header>
  )
}