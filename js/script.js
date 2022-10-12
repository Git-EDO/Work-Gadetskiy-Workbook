const sideMenuItems = document.querySelectorAll('.side-menu-item-label')

sideMenuItems.forEach(item => {
  item.addEventListener('click', (e) => {
    if(item.parentNode.classList.contains('active')) {
      item.parentNode.classList.remove('active')
    } else {
      sideMenuItems.forEach(li => li.parentNode.classList.remove('active'))
      item.parentNode.classList.add('active')
    }
  })
})