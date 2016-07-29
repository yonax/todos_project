import { list, post, remove as _remove } from './base'

export const fetchAll = () => list('cards');
export const remove = (id) => _remove('cards', id);
export const create = (name) => post('cards', { name });
