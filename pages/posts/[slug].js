import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

export default function Article({
  frontmatter: { title, date },
  slug,
  content,
}) {
  return (
    <>
      <article className='post'>
        <header className='post-header'>
          <h1 className='post-title'>{title}</h1>
        </header>
        <div className='post-body'>
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
        <footer className='post-footer'>
          以上
          <div className='post-date'>{date}</div>
        </footer>
      </article>
    </>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  )

  const { data: frontmatter, content } = matter(markdownWithMeta)

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  }
}