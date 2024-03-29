import React from 'react'
import { getCategories, getCategoryDetails } from '../../services';
import {useRouter} from 'next/router';
import {PostCard,Loader} from '../../component';

const CategoryDetails = ({ category }) => {

  const router = useRouter();

    if (router.isFallback) {
        return <Loader />
    }
  
  return (
    <>
      <div className='container mx-auto px-10 mb-8 '>
        <div className=''>
          <h2 className='text-xl font-semibold text-white'>
            ! Aquí están mis {category.name.toLowerCase()} !
          </h2>

        </div>
      </div>
      <div className="container mx-auto px-10 mb-8">
        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
          
          { 
            category.post.map((item) => (
              <PostCard post={item} key={item.title} />
            ))
          }
          {(category.post.length == 0) && <p className='text-xl text-red-600'>Aún no cargue mis {category.name.toLowerCase()}.</p>}
        </div>
      </div>
    </>

  )
}

export default CategoryDetails



export async function getStaticProps({ params }) {
  const data = await getCategoryDetails(params.slug)
  console.log('data:', data)
  return {
    props: { category: data }
  }
}


export async function getStaticPaths({ params }) {
  const categories = await getCategories();
  console.log('categoreis:', categories)
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  }
}
