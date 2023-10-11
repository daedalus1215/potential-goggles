/**
 * 
 * @param {string|string[]} names 
 * @returns string[]
 */
export const parseArrayString = (names) => {
    if (typeof names === 'string' && names.includes(',')) {
        return names.split(',').map(tag => tag.trim());
    } else if (typeof names === 'string') {
        return [names];
    } else if (Array.isArray(names)) {
        return names;
    }
    return [];
};