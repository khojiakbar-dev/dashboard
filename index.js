let exercises = [
    {
        head: 'wepro IT',
        description: 'Hello how are u i hope you are doing good',
        time: '22:52',
        date: '23.02.2023',
        typeEx: 'В прогрессе'
    }
]

let logExercise = document.forms.addExercise
let modal_bg = document.querySelector('.modal_bg')
let modal = document.querySelector('.modalAdd')
let addEx = document.querySelector('.add_ex')
let table_choose = document.querySelector('.table')
let as_box = document.querySelector('.as_box')
let close = document.querySelector('.back')
let cont = document.querySelector('.container')
let contTwo = document.querySelector('.containerTwo')
let modalTwo = document.querySelector('.modalTwo')
let modal_bgTwo = document.querySelector('.modal_bgTwo')
let closeModalTwo = document.querySelector('.close_modal')
let delete_crt = document.querySelector('.delete_crt')
let search_img = document.querySelector('.search_img')
let search_input = document.querySelector('.search_ex')

logExercise.onsubmit = (event) => {
    event.preventDefault()

    let excs = {
        id: Math.random(),
        time: new Date().getHours() + ":" + new Date().getMinutes(),
        date: new Date().getDay() + "." + new Date().getMonth() + "." + new Date().getFullYear()
    }

    let fm = new FormData(logExercise)
    fm.forEach((value, key) => {
        excs[key] = value
    })


    exercises.push(excs)
    reload(exercises)
    closeModal()
}

let isSorted = false

as_box.onclick = () => {
    isSorted = true
    table_choose.classList.remove('active')
    as_box.classList.add('active')
    reload(exercises)
}

table_choose.onclick = () => {
    isSorted = false
    as_box.classList.remove('active')
    table_choose.classList.add('active')
    reload(exercises)

}


const reload = (arr) => {
    cont.innerHTML = ''
    contTwo.innerHTML = ''
    for (let item of arr) {
        if (isSorted) {
            createBlock(item)
        } else {
            createTr(item)
        }
    }
}


reload(exercises)

function createTr(item) {
    let tr = document.createElement('tr')
    let td_head = document.createElement('td')
    let td_desc = document.createElement('td')
    let td_date = document.createElement('td')
    let td_time = document.createElement('td')
    let td_progress = document.createElement('td')

    tr.classList.add('block_lg')
    td_head.classList.add('td_head')
    td_desc.classList.add('td_desc')
    td_date.classList.add('td_date')
    td_time.classList.add('td_time')
    td_progress.classList.add('td_progress')
    td_head.innerHTML = item.head
    td_desc.innerHTML = item.description
    td_date.innerHTML = item.date
    td_time.innerHTML = item.time
    td_progress.innerHTML = item.typeEx

    cont.append(tr)
    tr.append(td_head, td_desc, td_date, td_time, td_progress)


    if (td_progress.innerHTML.toLowerCase().trim() === 'progress' || td_progress.innerHTML === 'В прогрессе') {
        td_progress.style.color = 'blue'
    } else if (td_progress.innerHTML.toLowerCase().trim() === 'Не выполнено' || td_progress.innerHTML === 'no done') {
        td_progress.style.color = 'red'
    }

    tr.onclick = () => {
        openModalTwo()
    }

    delete_crt.onclick = () => {
        exercises = exercises.filter((el) => el.id !== item.id)
            reload(exercises)
            closeModalTwoFunc()
    }
}


function createBlock(item) {
    let box = document.createElement('div')
    let h3 = document.createElement('h3')
    let spanDesc = document.createElement('span')
    let data = document.createElement('div')
    let spanData = document.createElement('span')
    let spanTime = document.createElement('span')
    let spanProgress = document.createElement('span')

    box.classList.add('box-bg')
    h3.classList.add('h3')
    spanDesc.classList.add('spanDesc')
    data.classList.add('data')
    spanData.classList.add('spanData')
    spanTime.classList.add('spanTime')
    spanProgress.classList.add('spanProgress')


    h3.innerHTML = item.head
    spanDesc.innerHTML = item.description
    spanData.innerHTML = item.date
    spanTime.innerHTML = item.time
    spanProgress.innerHTML = item.typeEx

    contTwo.append(box)
    box.append(h3, spanDesc, data, spanProgress)
    data.append(spanData, spanTime)

    if (spanProgress.innerHTML.toLowerCase().trim() === 'progress' || spanProgress.innerHTML === 'В прогрессе') {
        spanProgress.style.color = 'blue'
    } else if (spanProgress.innerHTML.toLowerCase().trim() === 'Не выполнено' || spanProgress.innerHTML === 'no done') {
        spanProgress.style.color = 'red'
    }

    
    box.onclick = () => {
        openModalTwo()
    }

    delete_crt.onclick = () => {
        exercises = exercises.filter((el) => el.id !== item.id)
            reload(exercises)
            closeModalTwoFunc()
    }
}


function openModal() {
    modal.style.display = 'block'
    modal_bg.style.display = 'block'

    setTimeout(() => {
        modal_bg.style.opacity = '1'
        modal.style.opacity = '1'
        modal.style.transform = 'transform: translate(-50%, -50%) scale(1)'
    }, 200)
}


addEx.onclick = () => {
    openModal()
}

close.onclick = () => {
    closeModal()
}

closeModalTwo.onclick = () => {
    closeModalTwoFunc()
}
function closeModal() {
    modal.style.display = 'none'
    modal_bg.style.display = 'none'
    modal_bg.style.opacity = '0'
    modal.style.opacity = '0'
}


function openModalTwo() {
    modalTwo.style.display = 'block'
    modal_bgTwo.style.display = 'block'

    setTimeout(() => {
        modal_bgTwo.style.opacity = '1'
        modalTwo.style.opacity = '1'
        modalTwo.style.transform = 'transform: translate(-50%, -50%) scale(1)'
    }, 200)
}


function closeModalTwoFunc() {
    modalTwo.style.display = 'none'
    modal_bgTwo.style.display = 'none'
    modal_bgTwo.style.opacity = '0'
    modalTwo.style.opacity = '0'
}



search_img.onclick = () => {
    search_img.style.scale = '1.8'
    setTimeout(() => {
         search_img.style.scale = '1'
    },200)
    let value = search_input.value
    value = value.toLowerCase().trim()

    let filtered = exercises.filter(ol => {
        let { head } = ol
        head = head.toLowerCase().trim()

        if (head.includes(value)) {
            return ol
        }
        
    })
    reload(filtered)
}