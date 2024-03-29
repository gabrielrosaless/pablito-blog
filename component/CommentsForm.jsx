import React, {useRef, useState, useEffect} from 'react'
import { submitComment } from '../services';

const CommentsForm = ({slug}) => {

  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name');
    emailEl.current.value = window.localStorage.getItem('email');
  }, [])
  

  const handleCommentSubimission = () =>{
    setError(false);
    
    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;

    if (!comment || !name || !email){
      setError(true);
    }

    const commentObj = { name,email,comment,slug };

    if (storeData){
      window.localStorage.setItem('name',name);
      window.localStorage.setItem('email',email);
    }else{
      window.localStorage.removeItem('name',name);
      window.localStorage.removeItem('email',email);
    }

    submitComment(commentObj)
      .then((res) => {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        },3000)
      })

  }


  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-12'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Dejame un comentario o sugerencia :)</h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea 
        ref={commentEl} 
        className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-8'
        placeholder='Comentario...'
        name="comment"
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
        <input 
        type="text" 
        ref={nameEl} 
        className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-8' 
        placeholder='Nombre'
        name="name"
        />
        <input 
        type="text" 
        ref={emailEl} 
        className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-8' 
        placeholder='Email'
        name="email"
        />
      </div>
      <div className='grid grid-cols-1 gap-4 mb-4 ml-2'>
        <div>
          <input type="checkbox" ref={storeDataEl} id='storeData' name='storeData' value='true'/>
          <label className='text-gray-500 cursor-pointer ml-2' htmlFor='storeData'>
            Guardar mi email y mi nombre para la proxima vez que comente.
          </label>
        </div>
      </div>
      {error && <p className='text-xs text-red-500'> Todos los campos son requeridos.</p>}
      <div className='mt-8 mr-8 flex justify-end'>
        <button 
          className='transition duration-500 ease hover:bg-indigo-900 
          inline-block bg-pink-600 text-lg 
          rounded-full text-white px-8 py-3
          cursos-pointer'
          type='button' 
          onClick={handleCommentSubimission}
        >
          Post comment
        </button>
        {showSuccessMessage && <span className='text-xl float-right font-semibold mt-3 text-green-500 ml-2'>El comentario fue enviado y será publicado a la brevedad.</span>}
      </div>
    </div>
  )
}

export default CommentsForm