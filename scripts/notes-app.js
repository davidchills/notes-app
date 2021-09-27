'use strict'

let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', (evt) => {
    const id = uuidv4()
    const timestamp = moment().valueOf()

    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt: timestamp
    })
    saveNotes(notes)
    location.assign(`/edit.html#${id}`)
})

document.querySelector('#search-text').addEventListener('input', (evt) => {
    filters.searchText = evt.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', (evt) => {
    filters.sortBy = evt.target.value
    renderNotes(notes, filters)
})

window.addEventListener('storage', (evt) => {
    if (evt.key === 'notes') {
        notes = JSON.parse(evt.newValue)
        renderNotes(notes, filters)
    }
})
