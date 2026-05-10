import { apiFetch } from './api';

export async function fetchAgendaEvents() {
    return await apiFetch('/agenda');
}

export async function createAgendaEvent(eventData) {
    return await apiFetch('/agenda', {
        method: 'POST',
        body: JSON.stringify(eventData),
    });
}

export async function updateAgendaEvent(id, eventData) {
    return await apiFetch(`/agenda/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(eventData),
    });
}

export async function deleteAgendaEvent(id) {
    return await apiFetch(`/agenda/${id}`, {
        method: 'DELETE',
    });
}
