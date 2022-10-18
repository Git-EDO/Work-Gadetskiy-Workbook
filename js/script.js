// Управление классами бокового меню

const sideMenuItems = document.querySelectorAll('.side-menu-item-label');
const sideSubmenuItems = document.querySelectorAll('.side-submenu-item a')

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

sideSubmenuItems.forEach(item => {
  item.addEventListener('click', (e) => {
    if(item.classList.contains('active')) {
      item.classList.remove('active')
    } else {
      sideSubmenuItems.forEach(a => a.classList.remove('active'))
      item.classList.add('active')
    }
  })
});

// Отправка формы

// const forms = document.querySelectorAll('.exercise');

// forms.forEach(form => {
//   form.onsubmit = (e) => {
//     e.preventDefault();

//     const uid = 1234567
//     const formData = new FormData(form)

//     formData.append('form_id', form.id)
//     formData.append('user', uid)
//     formData.append('action', 'edit')
//     formData.append('stream', 'stream1')

//     fetch('https://rt.ptt.life/do.php', {
//       method: 'POST',
//       mode: 'no-cors',
//       body: formData
//     })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error(error.message))
//   }
// });

const newFormData = new FormData();

newFormData.append('form_id', '11-1-1-0')
newFormData.append('user', 1234567)
newFormData.append('action', 'get')
newFormData.append('stream', 'stream1')

  fetch('https://rt.ptt.life/do.php', {
    method: 'POST',
    body: newFormData
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.error(error.message))


// Radar-chart

// Нарисовать диаграмму

// chart.xAxis[0].categories - названия сфер жизни
// chart.series[0].data - значения сфер жизни


const wheelBtn = document.querySelector('.make-wheel');
let spheresArr = [];
let spheresValueArr = [];

wheelBtn.addEventListener('click', drawChart);

function drawChart(e) {
    e.preventDefault()

    spheresArr = []
    spheresValueArr = []

    const thisForm = wheelBtn.closest('form')

    const allInputs = document.querySelectorAll('input')
    
    const isEmpty = (input) => input.value == ''

    if(Array.from(allInputs).some(isEmpty)) {
      alert('Все поля должны быть заполнены!')
    } else {
      const allSpheares = thisForm.querySelectorAll('.wheel-sphere')
      const allValues = thisForm.querySelectorAll('.wheel-input')
    
      allSpheares.forEach(sphere => {
        spheresArr.push(sphere.value)
      })
      allValues.forEach(value => {
        spheresValueArr.push(+value.value)
      })

      document.getElementById('chart-container').style.height = '400px'
      chartOptions()
    }
  
};


function chartOptions() {
  chart = Highcharts.chart('chart-container', {
    chart: {
      renderTo: 'chart-container',
      polar: true,
      type: 'line'
  },
  
  title: {
      text: 'Колесо Жизненного Баланса',
      x: -80
  },
  
  pane: {
      size: '80%'
  },
  
  xAxis: {
      categories: spheresArr,
      tickmarkPlacement: 'on',
      lineWidth: 0
  },
      
  yAxis: {
      gridLineInterpolation: 'polygon',
      lineWidth: 0,
      min: 0
  },
  
  tooltip: {
      shared: true,
      valuePrefix: ''
  },
  
  // legend: {
  //     align: 'right',
  //     verticalAlign: 'top',
  //     y: 100,
  //     layout: 'vertical'
  // },
  
  series: [{
      name: 'Колесо Жизненного Баланса',
      data: spheresValueArr,
      pointPlacement: 'on'
  }]
  
  });
} 

// Добавить сферу

const addSphereBtn = document.querySelector('.add-field')

addSphereBtn.addEventListener('click', addSphere)

function addSphere(e) {

  e.preventDefault()

    const spheresDiv = document.querySelector('.spheres-data')
    const sphereWrapper = document.createElement('div')
    sphereWrapper.classList.add('wheel-inputs-wrapper')
  
    const taskInput = document.createElement('div')
    taskInput.classList.add('task-input')
  
    const spheresDivLabel = document.createElement('label')
    const countOfSpheres = spheresDiv.querySelectorAll('.wheel-sphere').length
    spheresDivLabel.innerText = `Сфера ${countOfSpheres + 1}`
  
    const sphereName = document.createElement('input')
    sphereName.type = 'text'
    sphereName.classList.add('wheel-sphere')
    sphereName.placeholder = 'Введите название сферы'
  
  
    const sphereNum = document.createElement('input')
    sphereNum.type = 'number'
    sphereNum.classList.add('wheel-input')
    sphereNum.placeholder = 'Введите оценку от 0 до 10'

    if(countOfSpheres < 10) {
      spheresDiv.appendChild(taskInput)
      taskInput.appendChild(spheresDivLabel)
      taskInput.appendChild(sphereWrapper)
      sphereWrapper.appendChild(sphereName)
      sphereWrapper.appendChild(sphereNum)
    } 
}



// Ограничение ввода чисел для инпутов сфер КЖБ

const wheelInputs = document.querySelectorAll('.wheel-input')

wheelInputs.forEach(input => {
  input.addEventListener('keyup', () => {
    if(input.value > 10) {
      input.value = 10
    }
  })
})

// Доступность заданий

// Вступление и вводное - 648396832
// Основы личной практики по методу ЦОП - 643394526
// Основы эффективного планирования - 650927715
// Основы тайм-менеджмента - 650927717
// Три энергии природы - 656010895
// Теория строения личности - 656010898
// Эмоциональный интеллект - 656010902
// Основы духовного мировоззрения - 656010906
// Сила Рода - 656010907
// Родовая система - 656010909


const availableTasks = [648396832, 643394526, 650927715, 650927717]

const dataLabels = document.querySelectorAll('.side-menu-item-label[data-courseNum]')

document.addEventListener('DOMContentLoaded', function () {
  dataLabels.forEach(label => {
    const dataValue = +label.dataset.coursenum
    if(availableTasks.indexOf(dataValue) == -1) {
      label.classList.add('disabled')
    }
  })
})

// Функционал проверки данных ученика куратором

// https://sockurs.ru/teach/control/stream/view/id/635211926?student-id=1234567
// window.navigation.currentEntry.url.split('student-id=').slice(-1)

// document.addEventListener("DOMContentLoaded", {
//   if(window.userInfo.isTeacher == true) {
//     studentId = window.navigation.currentEntry.url.split('student-id=').slice(-1)
//   }
// });

