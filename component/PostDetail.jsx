import React, { useState, useEffect } from 'react';
import moment from 'moment';

const PostDetail = ({ post }) => {


  const [theme, setTheme] = useState('')

  const onClickToggleDark = () => {
    console.log('LO TOQUE!')

    if (localStorage.getItem('theme') === 'dark') {
      localStorage.setItem('theme', 'light');
      setTheme('light')
    } else {
      localStorage.setItem('theme', 'dark');
      setTheme('dark')
    }
  }

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }


  }, [theme])


  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
    }

    switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };

  return (
    <div className='bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8 dark:invert'>
      <div className='relative overflow-hidden shadow-md mb-6'>
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className='object-top h-full w-full rounded-t-lg dark:invert'
        />
      </div>
      <div className='px-4 lg:px-0'>
        <div className='flex items-center mb-8 w-full'>
          <div className='flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8'>
            <img
              alt={post.author.name}
              height='30px'
              width='30px'
              className='align-middle rounded-full'
              src={post.author.photo.url}
            />
            <p className='inline align-middle text-gray-700 ml-2 text-lg'>{post.author.name} </p>

          </div>
          <div className='font-medium text-gray-700'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>
              {moment(post.createdAt).format('MMM DD,YYYY')}
            </span>
          </div>
        </div>

        <div className='grid grid-cols-3 gap-4'>
          <h1 className='text-3xl font-semibold col-span-2'>{post.title}</h1>
          
          {/* Toggle button modo oscuro*/}
          <div className="flex items-center justify-center w-full mb-8">
            <label htmlFor="toogleA" className="flex items-center cursor-pointer">
              <div className="relative">
                <input id="toogleA" type="checkbox" className="sr-only" onClick={onClickToggleDark} />
                <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
              </div>
              <div className="ml-3 text-gray-700 text-xl font-semibold">
                Modo oscuro
              </div>
            </label>
          </div>
        </div>
        <div className="border-b w-full inline-block border-blue-400 mb-4"></div>
        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemIndex) => getContentFragment(itemIndex, item.text, item))
          return getContentFragment(index, children, typeObj, typeObj.type)
        })}
      </div>
    </div>
  )
}

export default PostDetail