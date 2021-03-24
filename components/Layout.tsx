import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <style>{`
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </Head>
    <header>
      <nav>
        <div>
          <img alt={'hihi'} src={`https://`}/>
        </div>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/users">
          <a>Users List</a>
        </Link>
        <a href="/api/users">Users API</a>
      </nav>
      <style jsx>{`
        nav{
          background-color: rgb(46, 49, 57);
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          width: 200px;
          a {
            color: #FFF;
            display: block;
            text-decoration: none;
            text-align: center;
            width: 100%;
            padding: 12px 0;
          }
        }
      `}</style>
    </header>
    {children}
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
)

export default Layout
