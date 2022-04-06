import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Post from '../../components/Post'

export default function Blog({ posts }) {
  return (
    <div>
      <div className='posts'>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {

  // Get files from the posts dir
  const files = fs.readdirSync(path.join('data/posts'))

  // Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace('.md', '')
    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('data/posts', filename),
      'utf-8'
    )

    const { data: frontmatter } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter
    }
  })


  return {
    props: {
      posts: posts
    },
  }
}
