import { apiFetch } from './api'

export async function getChecklists() {
    return apiFetch('/checklist-ai')
}

export async function createChecklist(data) {
    return apiFetch('/checklist-ai', {
        method: 'POST',
        body: JSON.stringify(data),
    })
}

export async function updateChecklist(id, data) {
    return apiFetch(`/checklist-ai/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    })
}

export async function deleteChecklist(id) {
    return apiFetch(`/checklist-ai/${id}`, {
        method: 'DELETE',
    })
}
