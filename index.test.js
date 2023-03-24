//const { deterministicPartitionKey } = require("./original")
const { deterministicPartitionKey } = require("./index")
const { Chance } = require("chance")
const crypto = require("crypto");

const chance = new Chance();

// This can be reused from the script definition, but I need it here to test
// the original implementation
const hashString = (string) => crypto.createHash("sha3-512").update(string).digest("hex");
const hashObject = (object) => hashString(JSON.stringify(object));

describe("Test the original function", () => {
    it("Testing falsy event", () => {
        expect(deterministicPartitionKey(undefined)).toBe("0")
        expect(deterministicPartitionKey("")).toBe("0")
        expect(deterministicPartitionKey(0)).toBe("0")
    })
    it("Testing falsy partition key", () => {

        const test = (value) => {
            const hashed = hashObject(value)
            expect(deterministicPartitionKey(value)).toBe(hashed)
        }
        test({ partitionKey: "" })
        test({ partitionKey: 0 })
        test({ partitionKey: false })
        test({ partitionKeyX: "Hello world" })
    })
    it("Testing no-string partition key", () => {
        const event1 = { partitionKey: true }
        expect(deterministicPartitionKey(event1)).toBe(`${true}`)

        const event2 = { partitionKey: 1 }
        expect(deterministicPartitionKey(event2)).toBe("1")

        const event3 = { partitionKey: [] }
        expect(deterministicPartitionKey(event3)).toBe("[]")

        const event4 = { partitionKey: "Hello" }
        expect(deterministicPartitionKey(event4)).toBe("Hello")

        const event5 = { partitionKey: chance.string({ length: 256 }) }
        expect(deterministicPartitionKey(event5)).toBe(event5.partitionKey)

        const event6 = { partitionKey: chance.string({ length: 257 }) }
        expect(deterministicPartitionKey(event6)).toBe(hashString(event6.partitionKey))
    })

    it("Test no partition key", () => {
        const event1 = {} //Small objects are also hashed
        expect(deterministicPartitionKey(event1)).toBe(hashObject(event1))
        const event2 = { aCoolProperty: chance.string({ length: 1024 }) } //Make sure is a big object
        expect(deterministicPartitionKey(event2)).toBe(hashObject(event2))
    })
})


