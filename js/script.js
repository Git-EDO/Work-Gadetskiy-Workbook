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

// Подготовка объекта для отправки на сервер

const saveBtns = document.querySelectorAll('.save');

saveBtns.forEach(btn => {

  btn.addEventListener('click', (e) => {

    e.preventDefault()
    const uid = 1234567 // Нужно получить из Геткурса

    const form = btn.closest('form')
    // console.log(form)
    const formTextareas = form.querySelectorAll('textarea')
    // console.log(formTextareas)


    const objectForSending = {
      user: uid,
      formID: form.id.replace('f', '')
    }
  
    formTextareas.forEach(textarea => Object.assign(objectForSending, {[textarea.id.replace('t', '')]: textarea.value}))
  
    console.log(objectForSending)


    sendRequest('POST', requestURL, objectForSending)
    .then(data => console.log(data))
    .catch(error => console.log(error))
  })

});

const requestURL = 'http://rt.ptt.life/';

async function sendRequest(method, url, body = null) {
  const headers = {
    'Content-type': 'application/json'
  }

  const response = await fetch(url, {
    method,
    mode: 'no-cors',
    body: JSON.stringify(body),
    headers
  });
  if (response.ok) {
    return response.json();
  } else {
    return response.json().then(error => console.error(error));
  }
};
