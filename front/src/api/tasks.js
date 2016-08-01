import { list, post, patch, remove as _remove } from './base'

export const fetchAll = () => list('tasks');
export const create = (card, text) => post('tasks', { card, text });
export const toggle = (id, done) => patch('tasks', id, { done });
export const remove = (id) => _remove('tasks', id);
export const edit = (id, text) => patch('tasks', id, { text });
