import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

export default function Article({
  frontmatter: { title, date },
  slug,
  content,
}) {
  const renderer = new marked.Renderer() 
  renderer.paragraph = text => {
    console.log(text)
    var isImage = /<img.*?(?:>|\/>)/gi.test(text)
    if (isImage) {
      return `<section class="photoset">${text}</section>`
    } else {
      return `<p>${ text }</p>`
    }
  } 
  renderer.html = (html) => {
    console.log(html)
  }
  renderer.image = function(href, title, text) {
    return `<figure class="photoset-item">
      <img src="${href}" alt="${text}">
      ${ title ? `<figcaption>${ title }</figcaption>` : ''}</figure>`
  }
  return (
    <>
      <article className='post'>
        <header className='post-header'>
          <h1 className='post-title'>{title}</h1>
        </header>
        <div className='post-body'>
          <div dangerouslySetInnerHTML={{ __html: marked(content, { renderer }) }}></div>
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