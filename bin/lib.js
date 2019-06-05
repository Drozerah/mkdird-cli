/**
 * 
 * Check if a given string contains any rejected characters
 * from a given array of substrings
 * 
 * Method:
 * 
 * - we use Array​.prototype​.some() to check if the input 
 * string contains at least one of the subtrings stored
 * in the toReject array 
 * 
 * - the function return true if the string
 * contains at least one of the substring or false if not
 *
 * @example Example usage:
 * 
 * isReject('foo', ['foo','bar']) // true
 * isReject('foo', ['bar','baz']) // false
 * 
 * @param  {string} input the string to check
 * @param  {array} toReject the array of rejected substrings
 * @return {boolean} boolean
 * @author Drozerah https://github.com/Drozerah
 * 
 */
const isReject = (input, toReject) => toReject.some(elm => input.includes(elm))

/**
 * Exports
 */
module.exports = {isReject}