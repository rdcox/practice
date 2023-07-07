/**
 * Certain combinations of user actions produce an error and we want to write a script to detect which users experience this error.
 * If a particular user enters the sequence "A", "B", "C" exactly, then they will experience the error. 
 * It does not matter if other key presses precede or follow the sequence, so long as the sequence occurs in the provided order.
 * For example:
 * A -> B -> C ------> Error!
 * A -> A -> B -> C -> Error!
 * A -> B -> C -> C -> Error!
 * A -> B -> B -> C -> Ok!
 */
const logs = [
    { user: 1, action: 'A'},
    { user: 2, action: 'A'},
    { user: 3, action: 'A'},
    { user: 1, action: 'A'},
    { user: 2, action: 'B'},
    { user: 3, action: 'B'},
    { user: 1, action: 'B'},
    { user: 2, action: 'B'},
    { user: 3, action: 'C'},
    { user: 1, action: 'C'},
    { user: 2, action: 'C'},
    { user: 4, action: 'A'},
    { user: 4, action: 'B'},
    { user: 4, action: 'C'},
    { user: 4, action: 'C'},
]

// Original Solution
function getErrorUsers(logs, uniqueUsers, sequence = ["A", "B", "C"]) {
    
    const errorUsers = [];
    for (let i = 0; i < uniqueUsers.length; i++) {
        // array of logs belonging to a user
        const userLogs = logs.filter((log) => {
            return log.user === uniqueUsers[i];
        });

        for (let j = 0; j < userLogs.length; j++) {
            // sequence start detected
            if (userLogs[j].action === sequence[0]) {
                // look for the rest of the sequence
                for (let k = 1; k < sequence.length; k++) {
                    // if we detect a deviation from the sequence - break
                    if (userLogs[j + k].action !== sequence[k]) {
                        break;
                    }
                    // if we hit the end of the sequence - add user to error list
                    if (k + 1 === sequence.length) {
                        errorUsers.push(uniqueUsers[i]);
                    }
                }
            }
        }
    }

    return errorUsers;
}
function getUniqueUsers(logs) {
    const users = [];
    for (let i = 0; i < logs.length; i++) {
        if (!users.includes(logs[i].user)) {
            users.push(logs[i].user);
        }
    }
    return users;
}

// Revised Solution
// only traverse the log list once, and be smarter about tracking sequences
function getErrorUsersV2(logs, sequence = ["A", "B", "C"]) {
    // create a map to track users
    const userSeqMap = new Map();
    const errUsers = [];
    for (let i = 0; i < logs.length; i++) {
        const currUser = logs[i].user;
        const currAction = logs[i].action;
        // if the log's user is already in our error list, skip that log
        if (errUsers.includes(currUser)) { continue; }

        // if a user has started the sequence, add them to our map
        // if they're already there and the sequence has started again, just continue
        if (currAction === sequence[0]) {
            if (!userSeqMap.has(currUser)) {
                userSeqMap.set(currUser, [currAction]);
            }
            continue;
        }
        // if we have the user in our map, it means they've started the sequence and we should check if they continue it or break it
        if (userSeqMap.has(currUser)) {
            const seqSoFar = userSeqMap.get(currUser);
            // if the user makes the next action in the sequence, update the sequence in the map
            if (currAction === sequence[seqSoFar.length]) {
                userSeqMap.set(currUser, [...seqSoFar, currAction]);
    
            // user deviated from error sequence, so remove them
            } else {
                userSeqMap.delete(currUser);
                continue;
            }
            // if our array lengths match, then we've found an erroring user
            if (userSeqMap.get(currUser).length === sequence.length) {
                errUsers.push(currUser);
            }
        }
    }

    return errUsers;
}

// run & benchmark the script
console.time("v1");
console.log(getErrorUsers(logs, getUniqueUsers(logs)));
console.timeEnd("v1");

console.time("v2");
console.log(getErrorUsersV2(logs));
console.timeEnd("v2");