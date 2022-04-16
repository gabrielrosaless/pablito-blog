import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import { getCategories } from '../services'


function Categories() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {

    getCategories()
      .then((newCategories) => setCategories(newCategories))

  }, [])
  

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8 pb-12'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        Categorias
      </h3>
      {categories.map( (category) => (
        <>
          <Link key={category.slug} href={`/category/${category.slug}`}>
            <span className='cursor-pointer flex mb-3 pb-3 transition duration-500 transform hover:-translate-y-1 text-lg font-medium rounded-full'>
              {category.name}
              <svg className="w-6 h-6 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            </span>
          </Link>
            
        </>
      ))}
    </div>
  )
}

export default Categories