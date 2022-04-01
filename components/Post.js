import Link from 'next/link'

export default function Post({ post }) {
  return (
    <div className='card'>
        <Link href={`/write/${post.slug}`}>
          <a>{post.frontmatter.title}</a>
        </Link>
        <p className='post-date'>Posted on {post.frontmatter.date}</p>
        <p>{post.frontmatter.excerpt}</p>
    </div>
  )
}