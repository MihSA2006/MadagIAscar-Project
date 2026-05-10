import { apiFetch } from './api';

export async function getChatHistory() {
    return await apiFetch('/chat-ai');
}

export async function sendChatMessage(message) {
    return await apiFetch('/chat-ai', {
        method: 'POST',
        body: JSON.stringify({ message }),
    });
}
