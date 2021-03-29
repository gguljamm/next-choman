import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  return <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <style>{`
          body {
            margin: 0;
            padding: 0;
          }
        `}</style>
      </Head>
      <div className={'layout-wrapper'}>
        <header>
          <nav>
            <div className={'logo'}/>
            <Link href="/">
              <a className={`${useRouter().route === '/' ? 'active' : ''}`}>Home</a>
            </Link>
            <Link href="/about">
              <a className={`${useRouter().route === '/about' ? 'active' : ''}`}>About</a>
            </Link>
            <Link href="/users">
              <a className={`${useRouter().route === '/users' ? 'active' : ''}`}>Users List</a>
            </Link>
            <a href="/api/users">Users API</a>
          </nav>
        </header>
        <div className={'content-wrapper'}>
          {children}
        </div>
      </div>
      <style jsx>{`
        .layout-wrapper {
          display: flex;
  
          .content-wrapper {
            flex: auto;
          }
  
          .logo {
            margin: 40px auto;
            background-image: url(https://s.pstatic.net/static/www/img/uit/2021/sp_main_153a02.png);
            background-size: 220px 205px;
            width: 111px;
            height: 26px;
            background-position: 0 -79px;
          }
        }
  
        header {
          width: 200px;
          flex: 0 0 200px;
        }
  
        nav {
          background-color: rgb(46, 49, 57);
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          width: 200px;
  
          a {
            color: #828288;
            display: block;
            text-decoration: none;
            text-align: center;
            width: 100%;
            padding: 12px 0;
  
            &.active {
              color: #FFF;
            }
          }
        }
      `}</style>
    </div>
  }

export default Layout
