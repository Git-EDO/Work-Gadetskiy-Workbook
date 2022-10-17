// Управление классами бокового меню

const sideMenuItems = document.querySelectorAll('.side-menu-item-label');

sideMenuItems.forEach(item => {
  item.addEventListener('click', (e) => {
    if(item.parentNode.classList.contains('active')) {
      item.parentNode.classList.remove('active')
    } else {
      sideMenuItems.forEach(li => li.parentNode.classList.remove('active'))
      item.parentNode.classList.add('active')
    }
  })
});

// Отправка формы

const forms = document.querySelectorAll('.exercise');

forms.forEach(form => {
  form.onsubmit = (e) => {
    e.preventDefault();

    const uid = 1234567
    const formData = new FormData(form)

    formData.append('form_id', form.id)
    formData.append('user', uid)
    formData.append('action', 'edit')
    formData.append('stream', 'stream1')

    fetch('https://rt.ptt.life/do.php', {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error.message))
  }
});


  // fetch('https://rt.ptt.life/do.php', {
  //   method: 'POST',
  //   mode: 'no-cors',
  //   body: JSON.stringify({action: 'get', 'user': 1234567, 'stream': 'stream1', 'form_id': 'f11-2-4-1'})
  // })
  // .then((res) => {
  //   if(res.ok) {
  //     return res.json()
  //   } else {
  //     console.error(res.status, res.statusText)
  //   }
  // })
  // .then((data) => {
  //   console.log(data)
  // })








  
// const getForm = fetch('https://rt.ptt.life/do.php?uid=1234567&form_id=f11-2-4-1&action=get&stream=stream1', {
//   method: 'GET',
//   mode: 'no-cors'
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.log(error))

// Подготовка объекта для отправки на сервер

// const saveBtns = document.querySelectorAll('.save');

// saveBtns.forEach(btn => {

//   btn.addEventListener('click', (e) => {

//     e.preventDefault()
//     const uid = 1234567 // Нужно получить из Геткурса

//     const form = btn.closest('form')
//     // const formTextareas = form.querySelectorAll('textarea')


    // const objectForSending = {
    //   user: uid,
    //   form_id: form.id.replace('f', ''),
    //   stream: 'stream1',
    //   action: 'edit'
    // }
  
    // formTextareas.forEach(textarea => Object.assign(objectForSending, {[textarea.id.replace('t', '')]: textarea.value}))
  
    // console.log(objectForSending)

    // const formData = new FormData();
    // formData.append(form_id, form.id.replace('f', ''))
    // formData.append(user, uid)

//     console.log(formData)
//   sendRequest('POST', requestURL, objectForSending)
//   .then(data => console.log(data))
//   .catch(error => console.log(error))
// })
//   })
// });

// someData.forEach(form => {
//   for (let input in form) {
//     if(document.getElementById(input)) {
//       document.getElementById(input).value = form[input]
//     }
//   }
// });