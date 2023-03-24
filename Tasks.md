# Tickets

## Assumptions:

1. The report does not need to be updated, so the generateReport function will remains the same.
2. The user will require an UI to set their custom ids.
3. The generated tickets are only for the backend part, it could be necessary to create more tickets to
update some other front end views.

# Tickets

## Ticket 1. Update Facilities table to add custom_id column
Update the database to add a new column named `custom_id` in the facilities table, this column must have a unique key restriction. Also fill the `custom_id` column with default values generated from the same row.

| Estimation: 2 hours

### Acceptance criteria:
1. There must be a new column named `custom_id` in the facilities table.
2. There must be a unique key restriction over the `custom_id` column.
3. The `custom_id` column must be filled with unique values calculated from the row id.
4. Trying to insert a record with an existent `custom_id` should fail with unique key restriction.

### Implementation details
1. Use the database migration management tool to perform this updates.
2. Write an script to create a column named `custom_id` of type `varchar(64)` in the Facilities table without the unique key restriction.
3. Write an script to fill the new column with a default unique value, use the row id to generate the values.
4. Write an script to create the unique key restriction over the `custom_id` column.

## Ticket 2: Update the facilities backend services to add custom_id

Update the definition of the backend services to update and create facilities to receive the new customId property when updating or creating a facility. Also add the field to the listFacilities and get facility details functions.

The new customId property is a required string of 3 to 64 characters long, no spaces or punctuation are allowed, only alphanumeric characters and underscores.

| Estimation: 4 hours

### Acceptance criteria:
The service must validate that the new field is coming and is valid.
When calling the create endpoint it must filll the new custom_id column with the given value.
When calling the update endpoint it must update the custom_id column with the given value.
It must return a user friendly error if the user attempts to set an existent customId when calling the update or create facility endpoint.

### Implementation details:
Update the validation rules to add the new field
Update any references to the Facility entity to add the new field
Update both, the create and update field to use and check the customId field
Update the list facilities endpoint to return the new customId field
Update the get facility details endpoint to return the new customId field.
Insert or update the value into the custom_id column of the Facilities table.
Since this will perform a optimistic update over the customId field, the backend must check if a unique key restriction error is triggered and translate it to a more user friendly error and return it to the backend, the error message mustt be “There is another facility with the same custom id”.
Update all the unit and integration tests to make sure they will remain working with the new values.
Create new test cases to check that the customId validations are performed.
Update all related documentation about the update and create Facility to include the new field.


## Ticket 3. Implement the new getShiftsByFacilityCustomId feature
Create a new method called getShiftsByFacilityCustomId and implement the logic to get the facilities using the provided custom id. The signature must be as follows:

```javascript
async function getShiftsByFacilityCustomId(facilityCustomId: number): Promise<Array<Shift> {
    //implementation...
}
```
| Estimation: 1 hours

### Implementation details
1. If the given facilityCustomId is undefined, then throw an ArgumentError
2. If there is no a facility with the given facility custom Id, throw a ElementNotFoundError
3. The returned array could be empty but never undefined

### Acceptance criteria
1. There must be a new method called `getShiftsByFacilityCustomId` with the required signature.

## Ticket 4. Update report generation endpoint
Update the endpoint tha exposes the report generation function to allow a new field called `facilityCustomId`,
the old `facilityId` field will be optional if the new `facilityCustomId` is provided.

| Estimation: 3 hours

### Acceptance criteria
1. The generate report endpoint should allow the use of the new optional `customId` property.
2. A new integration test must be created to check this new scenario.

### Implementation details
1. Update validation according the new requirement
2. Implement a new integration test to verify the new functionality
3. Use the new function `getShiftsByFacilityCustomId` to get the shifts if the custom id is provided.
4. If both, `facilityCustomId` and `facilityId` are provided, then return a 400 error code. 




