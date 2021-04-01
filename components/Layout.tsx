import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const items = [
    { text: 'Home', url: '/' },
    { text: 'Daily', url: '/daily' },
    { text: 'Retrospect', url: '/retrospect' },
    { text: 'Portfolio', url: '/portfolio' },
    { text: 'Develop', url: '/develop' },
    { text: 'Review', url: '/review' },
    { text: 'Travel', url: '/travel' },
  ];
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
            <div className={'logoWrap'}>
              <Image src="/logo.png" alt="logo" width="111" height="26"/>
            </div>
            {items.map((item) => (
              <Link key={item.text} href={`${item.url}`}>
                <a className={`${useRouter().route === item.url ? 'active' : ''}`}>{`${item.text}`}</a>
              </Link>
            ))}
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
  
          .logoWrap {
            text-align: center;
            margin: 40px 0;
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
