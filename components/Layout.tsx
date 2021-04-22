import React, { ReactNode, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

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
      { text: 'Commodity', url: '/commodity' },
      { text: 'Travel', url: '/travel' },
    ]},
  ];

  return<div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <style>{`
          @import '/all.min.css';
          body {
            margin: 0;
            padding: 0;
          }
          * {
            box-sizing: border-box;
          }
          *:before, *:after{
            box-sizing: border-box;
          }
        `}</style>
      </Head>
      <div className={'layout-wrapper'}>
        <header className={'webHeader'}>
          <nav>
            <div className={'logoWrap'}>
              <img src="/logo.png" alt="logo" width="111" height="26"/>
              {/*<Image src="/logo.png" alt="logo" width="111" height="26"/>*/}
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
        <header className={'mobileHeader'}>
          <div className={'block'}></div>
          <nav>
            <img src="/logo.png" alt="logo" width="111" height="26"/>
            <button><FontAwesomeIcon icon={faBars} width={'24px'} /></button>
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
  
        .webHeader {
          width: 200px;
          flex: 0 0 200px;
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
        }
        
        .mobileHeader {
          display: none;
          .block{
            width: 100%;
            height: 44px;
          }
          nav{
            background-color: rgb(46, 49, 57);
            width: 100%;
            height: 44px;
            position: fixed;
            top: 0;
            text-align: center;
            img{
              margin: 9px 0;
            }
            button{
              position: absolute;
              width: 40px;
              top: 2px;
              right: 2px;
              height: 40px;
              background-color: transparent;
              border: none;
              color: ivory;
            }
          }
        }
        @media all and (max-width: 768px) {
          .layout-wrapper{
            display: block;
            .webHeader{
              display: none;
            }
            .mobileHeader{
              display: unset;
            }
          }
        }
      `}</style>
    </div>
}

export default Layout
