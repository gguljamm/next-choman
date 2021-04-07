import React, { ReactNode, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {

  const [selectedMenu, setSelectedMenu] = useState(`/${useRouter().route.split('/')[1]}`);

  const handleClick = (menu:string) => {
    setSelectedMenu(selectedMenu === menu ? '' : menu);
  };

  const items = [
    { text: 'Home', url: '/', children: [] },
    { text: 'Daily', url: '/daily', children: [] },
    { text: 'Develop', url: '/develop', children: [
      { text: 'Posting', url: '/posting' },
      { text: 'Retrospect', url: '/retrospect' },
      { text: 'Portfolio', url: '/portfolio' },
    ]},
    { text: 'Review', url: '/review', children: [
      { text: 'Culture Life', url: '/culture' },
      { text: 'Game', url: '/game' },
      { text: 'Travel', url: '/travel' },
    ]},
  ];

  return<div>
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
            {items.map((item: { text: string, url: string, children: any }) => item.children.length === 0 ? (
              <Link key={item.text} href={`${item.url}`}>
                <a className={`btn${useRouter().route === item.url ? ' active' : ''}`}>{`${item.text}`}</a>
              </Link>
            ) : (
              <div key={item.text} className={ `list${selectedMenu === item.url ? ' expend' : ''}` }>
                <div className={`btn${`/${useRouter().route.split('/')[1]}` === item.url ? ' active' : ''}`} onClick={() => handleClick(item.url)}>{ item.text }</div>
                <ul>
                  { item.children.map((it: { url: string, text: string }) => (
                    <li key={`${item.text}${it.text}`}>
                      <Link href={`${item.url}${it.url}`}>
                        <a className={useRouter().route === `${item.url}${it.url}` ? 'btn active' : 'btn'}>{`${it.text}`}</a>
                      </Link>
                    </li>
                  )) }
                </ul>
              </div>
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
  
          .btn {
            color: #828288;
            display: block;
            text-decoration: none;
            text-align: center;
            width: 100%;
            padding: 12px 0;
            cursor: pointer;
  
            &.active {
              color: #FFF;
            }
          }
          .list{
            ul{
              display: none;
            }
            &.expend ul{
              display: block;
            }
          }
        }
      `}</style>
    </div>
}

export default Layout
