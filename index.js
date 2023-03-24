const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

/**
 * Apply a hash function over the given data
 * @param {string} data 
 * @returns the hash value
 */
function hashString(data) {
    if (!data) return undefined
    //This is used twice, can be a function
    return crypto.createHash("sha3-512").update(data).digest("hex");
}

/**
 * Checks what is the best value to return based in the partition key value and type.
 * @param {object} event the received event
 * @returns a string representation of the partition key.
 */
function extractPartitionKeyValue(event) {
    const { partitionKey } = event
    if (typeof partitionKey === 'string')
        return partitionKey
    else
        return JSON.stringify(partitionKey)
}

function deterministicPartitionKey(event) {
    //If event is undefined then candidate is undefined too, also TRIVIAL_PARTITION_KEY length is always
    //lower than MAX_PARTITION_KEY_LENGTH
    if (!event) return TRIVIAL_PARTITION_KEY;

    if (event.partitionKey) {
        const partitionKeyValue = extractPartitionKeyValue(event)
        return partitionKeyValue.length > MAX_PARTITION_KEY_LENGTH ? hashString(partitionKeyValue) : partitionKeyValue
    } else {
        //MAX_PARTITION_KEY_LENGTH validation not required because hash is always shorter than MAX_PARTITION_KEY_LENGTH
        return hashString(JSON.stringify(event)) 
    }
};

//For clarity, I prefer to declare exported members this way
module.exports = { deterministicPartitionKey }

//
// Refactor explain.
//
// It could be hard to explain how I did the refactor because what I did was to start
// removing duplicate logic, but in the end all comes down to determine if the partitionKey is
// present in the event object or not, and what is it's type. Please read the comments, they
// explain some of the most important logic facts to remove certain conditionals.
//
// Why is easier to read?
// Is a simple logic without nested blocks
// It does not uses var or let keywords, only const, it makes less bug prune
// It reduces duplicate code
// Reduces validations because some logic conclusions
//

