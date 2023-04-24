import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas'

const Imgmemes = () => {

  const [textomeme, setTextomeme] = useState('');
  const [imgMeme, setImgmeme] = useState('');
  const [memeTemplates, setMemeTemplates] = useState([]);

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(response => response.json())
      .then(data => setMemeTemplates(data.data.memes))
      .catch(error => console.error(error))
  }, []);

  const textmeme = (e) => {
    setTextomeme(e.target.value);
  }

  const seleccionarImg = (e) => {
    setImgmeme(e.target.value);
  }

  const descarga = () => {
    html2canvas(document.querySelector('#exportar')).then(function(canvas){
      let img = canvas.toDataURL('image/jpeg');
      let link = document.createElement('a');
      link.download = 'memepropio.jpeg';
      link.href = img;
      link.click();
    });
  }

  return (
    <div>
      <h1 className='mt-5 mb-3 text-light'>Editá tu propio meme</h1>

      <h2 className='mt-2 mb-3'>Escribí tu frase</h2>
      <input
        onChange={textmeme}
        className='form-control w-25 m-auto d-block'
        type='text'
        placeholder='Pone tu frase'
        name='meme'
      />

      <h2 className='mt-2 mb-3'>Elegí la imagen de tu meme</h2>
      <select
        onChange={seleccionarImg}
        className='form-select form-select-lg mb-3 w-50 m-auto'
        aria-label='Default select example'
      >
        <option selected>Elegi tu meme</option>
        {memeTemplates.map(template => (
          <option key={template.id} value={template.url}>
            {template.name}
          </option>
        ))}
      </select>

      <figure className='text-center' id='exportar'>
        <p className='mt-5 m-2 h1 text-center'>{textomeme}</p>
        {imgMeme && <img src={imgMeme} className='figure-img mt-3 d-block m-auto' alt='meme' />}
      </figure>

      <button onClick={descarga} type='button' className='btn btn-primary mt-5 mb-4'>
        Bajar Meme
      </button>
    </div>
  );
};

export default Imgmemes;