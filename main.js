const API = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_uL0JRwEkwko1Sn2ih42JdMwx8MrVXCk6auu1fKfqXoc7zDGfzicuzFHJHGkSIctj'
const API_favoritos = 'https://api.thecatapi.com/v1/favourites'
const API_upload = 'https://api.thecatapi.com/v1/images/upload'
const span_error = document.querySelector('#error')
const gato = document.querySelector('#imagen_gato')
const gato_2 = document.querySelector('#imagen_gato_2')
const gato_3 = document.querySelector('#imagen_gato_3')
const boton = document.querySelector('#button')
const botton_cat_1 = document.querySelector('#botton_cat_1')
const botton_cat_2 = document.querySelector('#botton_cat_2')
const botton_cat_3 = document.querySelector('#botton_cat_3')
const favorites_cats = document.querySelector('#favorites_cats')
const container_favorites_cats = document.querySelector('.container_favorites_cats')
const my_form = document.getElementById('uplading_form')
const gato_upload = document.getElementById('gato_pre')
const image_file = document.getElementById('file')

boton.addEventListener('click', get_cat)
document.addEventListener('DOMContentLoaded',get_cat)

async function get_data(url_api) {
   try {
      const data = await fetch(url_api)
      const traduce = await data.json()
      return traduce
   }
   catch(err) {
      console.error(err)
   }
}

async function get_cat() {
   const info = await get_data(API)
   console.log(info)
   gato.src = info[0].url
   gato_2.src = info[1].url
   gato_3.src = info[2].url

   botton_cat_1.onclick = () => save_favorites(info[0].id)
   botton_cat_2.onclick = () => save_favorites(info[1].id)
   botton_cat_3.onclick = () => save_favorites(info[2].id)
}


async function bring_the_favorites(url_fav_api) {
   try {
      const data = await fetch(url_fav_api, {
         method: 'GET',
         headers:{
            'x-api-key':'live_uL0JRwEkwko1Sn2ih42JdMwx8MrVXCk6auu1fKfqXoc7zDGfzicuzFHJHGkSIctj'
         }
      })
      const tranlate = await data.json()
      return tranlate

   } catch (err){
      console.error(err)
   }
}


async function draw_michi_favorite(){
   const info = await bring_the_favorites(API_favoritos)
   console.log('guardados en favs')
    console.log(info)
   const draw = info.map(item =>
      `<div>
         <img src="${item.image.url}" id ="cats_favs"  alt="picture of cat">
         <button onclick="delete_michi(${item.id})" class="botton_cat_delete">Delete the favorites</button>
      </div>`
      ).join('')
      container_favorites_cats.innerHTML = draw
}

draw_michi_favorite()


async function save_favorites(id) {
   const res = await fetch(API_favoritos, {
      method: 'POST',
      headers: {
         'content-type': 'application/json',
         'x-api-key':'live_uL0JRwEkwko1Sn2ih42JdMwx8MrVXCk6auu1fKfqXoc7zDGfzicuzFHJHGkSIctj'
      },
      body: JSON.stringify({
         "image_id":id
      })
   })
   const data = await res.json()
   console.log('traer los fav')
   console.log(data)
   draw_michi_favorite()
}

function id_cat_aleatorio (longitud) {
   const letra = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
   let respuesta = ''
   for (let i = 0;  i < longitud; i++) {
      let letra_aleatoria = letra.charAt(Math.floor(Math.random() * letra.length))
      respuesta += letra_aleatoria
   }
   return respuesta
}

async function delete_michi(id) {
   const data = await fetch(`https://api.thecatapi.com/v1/favourites/${id}`, {
      method: 'DELETE',
      headers: {
         'x-api-key':'live_uL0JRwEkwko1Sn2ih42JdMwx8MrVXCk6auu1fKfqXoc7zDGfzicuzFHJHGkSIctj'
      }
   })

   const tranlate = data.json()
   console.log('borrar')
   console.log(tranlate)

   draw_michi_favorite()
}

async function upload_picture(){
   const form_data = new FormData(my_form)
   console.log(form_data.get('file'))
   const data = await fetch(API_upload, {
      method: 'POST',
      headers:{
         'x-api-key': 'live_uL0JRwEkwko1Sn2ih42JdMwx8MrVXCk6auu1fKfqXoc7zDGfzicuzFHJHGkSIctj'
      },
      body: form_data
   })

   const answer = await data.json()
   console.log(answer)
   console.log(answer.url)
   save_favorites(answer.id)
}

function show_image_preview() {
   if(image_file.files.length > 0) {
      let render = new FileReader()
      render.onload = function(e) {
         gato_upload.src = e.target.result
         gato_upload.style.display = 'block'
      }
      render.readAsDataURL(image_file.files[0])
   }  else {
      gato_upload.style.display = 'none';
  }

}







