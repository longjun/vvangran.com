import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>WangRan</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-8">
        <div className="mb-10">
          <Image
            src="logo.svg"
            alt="WangRan"
            width={100}
            height={100}
          />
        </div>
        <p className="h-7 text-base font-semibold leading-7 text-sky-500">👋 Hey, there</p>
        <h1 className="my-6 text-3xl font-extrabold tracking-tight text-slate-900">
          我叫王然(Ryan)
        </h1>
        <h2 className="text-center text-sm text-slate-400">五年级小学生<br/>是一个乐观开朗的孩子，喜欢和朋友一起玩耍</h2>
        <dl className="my-6 text-sm text-slate-900">
          <dt className="font-bold mb-3">我的兴趣爱好很多：</dt>
          <dd className="my-1">🎻 - 喜欢各种乐器，正在努力练习小提琴</dd>
          <dd className="my-1">🪲 - 喜欢观察和研究昆虫的生活习性、外形</dd>
          <dd className="my-1">🎮 - 喜欢玩 Minecraft</dd>
          <dd className="my-1">🎨 - 喜欢绘画</dd>
        </dl>
      </main>
    </div>
  )
}

export default Home
