import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

export default function DailyLog({ logs }) {
  return (
    <>
      <h1>Daily</h1>
      {logs.map((log, index) => (
        <div className='photosets' key={index}>
          <h2>{log.frontmatter.date}</h2>
          <h3>{log.frontmatter.wake}</h3>
          <h3>{log.frontmatter.wather}</h3>
          <div className="post-content" dangerouslySetInnerHTML={{ __html: marked(log.content) }}></div>
        </div>
      ))}
    </>
  )
}

export async function getStaticProps() {

  // Get files from the data dir
  const files = fs.readdirSync(path.join('data/daily'))

  const logs = files.map((filename) => {
    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('data/daily', filename),
      'utf-8'
    )

    const { data: frontmatter, content } = matter(markdownWithMeta)
    console.log(content)

    return {
      frontmatter,
      content
    }
  })


  return {
    props: {
      logs
    },
  }
}
