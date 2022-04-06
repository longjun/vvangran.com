import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function Photosets({ photos }) {
  return (
    <>
      <h1>Photosets</h1>
      <h2>Shot with Fuji and iPhone</h2>
      {photos.map((photo, index) => (
        <div className='photosets' key={index}>
          <h2>{photo.frontmatter.title}</h2>
          <img src={photo.frontmatter.cover} />
          <div className='photosets-thumb'>
            {photo.frontmatter.thumb.map((item, index) => (
              <div key={index} className='photosets-thumb__item'>
                <img src={item} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

export async function getStaticProps() {

  // Get files from the posts dir
  const files = fs.readdirSync(path.join('data/photos'))

  // Get slug and frontmatter from posts
  const photos = files.map((filename) => {
    // Create slug
    const slug = filename.replace('.md', '')
    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('photos', filename),
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
      photos
    },
  }
}
