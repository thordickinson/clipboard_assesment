const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

function hashString(data) {
    //This is used twice, can be a function
    return crypto.createHash("sha3-512").update(data).digest("hex");
}

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
        return hashString(JSON.stringify(event)) //MAX_PARTITION_KEY_LENGTH validation not required
    }
};

//For clarity, I prefer to declare exported members this way
module.exports = { deterministicPartitionKey }

//
// It could be hard to explain how I did the refactor because what I did was to start
// removing duplicate logic, but in the end all comes down to determine if the partitionKey is
// present in the event object and
//
// Why is easier to read?
// Is a simple logic without nested blocks
// It does not uses var or let keywords, only const, it makes less bug prune
// It reduces duplicate code
// Reduces validations because some logic conclusions
//

