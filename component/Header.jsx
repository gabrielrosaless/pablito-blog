import React, { useEffect, useState, useContext } from 'react'
import { getCategories } from '../services'
import Link from 'next/link';

// const categories = [{ name: 'React', slug: 'react' }, { name: 'Web development', slug: 'web-dev' }]

const Header = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {

        getCategories()
            .then((newCategories) => setCategories(newCategories))

    }, [])

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="border-b w-full inline-block border-blue-400 py-8">
                <div className="md:float-left block">
                    <Link href="/">
                        <span className="cursor-pointer font-bold text-4xl text-white">El rincón de pablito</span>
                    </Link>
                </div>
                <div className="hidden md:float-left md:contents">
                    <span className="md:float-right mt-2 align-middle ml-4  cursor-pointer">
                    <a href='https://cafecito.app/pablonrosales' rel='noopener' target='_blank'>
                        <img srcset='https://cdn.cafecito.app/imgs/buttons/button_3.png 1x, https://cdn.cafecito.app/imgs/buttons/button_3_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_3_3.75x.png 3.75x' src='https://cdn.cafecito.app/imgs/buttons/button_3.png' alt='Invitame un café en cafecito.app' />
                    </a>
                    </span>
                    
                    {/* {categories.map((category, index) => (
                        <Link key={index} href={`/category/${category.slug}`}>
                            <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">{category.name}</span>
                        </Link>
                    ))} */}
                </div>
            </div>
        </div>
    );
}


export default Header;