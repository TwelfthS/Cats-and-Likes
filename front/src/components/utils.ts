export const heartAppear = (id: string) => {
    const heartBtn = document.getElementById('heart-' + id)
    heartBtn.classList.remove('hidden')
}

export const heartDisappear = (id: string) => {
    const heartBtn = document.getElementById('heart-' + id)
    heartBtn.classList.add('hidden')
}

export const network = 'http://localhost:8080/api/'