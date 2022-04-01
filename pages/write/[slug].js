import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

export default function Article({
  frontmatter: { title, date },
  slug,
  content,
}) {

  // const lightbox = new PhotoSwipeLightbox({
  //   gallery: '.gallery',
  //   children: '.gallery-item',
  //   pswpModule: () => import('photoswipe')
  // })
  // lightbox.init()
  const renderer = new marked.Renderer() 
  renderer.paragraph = text => {
    var imageRe = /<img.*?(?:>|\/>)/gi
    var isImage = imageRe.test(text)
    if (isImage) {
      const br = /\n/g.test(text)
      let galleryRow = ''
      if (br) {
        const imgList = text.split(/\n/g)
        console.log(imgList)
        for (const i of imgList) {
          galleryRow += `<div class="gallery-row">${ i }</div>`
        }
      } else {
        galleryRow += `<div class="gallery-row">${ text }</div>`
      }
      return `<section class="gallery">${ galleryRow }</section>`
    } else {
      return `<p>${ text }</p>`
    }
  } 
  renderer.image = function(href, title, text) {
    return `<figure class="gallery-item"><img src="${href}" alt="${text}">${ title ? `<figcaption>${ title }</figcaption>` : ''}</figure>`
  }
  return (
    <>
      <article className='post'>
        <header className='post-header'>
          <h1 className='post-title'>{title}</h1>
        </header>
        <div className='post-body'>
          <div className="post-content" dangerouslySetInnerHTML={{ __html: marked(content, { renderer }) }}></div>
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