import { readFileSync } from "fs";

const min = parseFloat(process.env.min || 3), max = parseFloat(process.env.max || 5);

export function addPost(data, unused) {
    if (unused.length > 0 && data.length < 25) {
        const pos = getRandomNo(0, unused.length - 1);
        const id = unused[pos].id;

        data.unshift({
            ...unused[pos],
            createdAt: new Date()
        });

        unused.splice(pos, 1);
        
        console.log(`Added post of id ${ id }. Count: ${ data.length }`);
    }

    var rand = Math.floor(Math.random() * (max - min + 1) + min);

    setTimeout(() => addPost(data, unused), rand * 1000);
}

export function deleteOldestPost(data, unused) {
    if (data.length > 20) {

        const removed = data.pop();
        console.log(`Removed post of id ${ removed.id }. Count: ${ data.length }`);
    
        unused.push(removed);
    }

    var rand = Math.floor(Math.random() * (max - min + 1) + min);

    setTimeout(() => deleteOldestPost(data, unused), rand * 1000);
}

export function getRandomNo(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export async function isDebugging(req, res, next) {
    console.log("check", process.env.debug );
    if (process.env.debug === "true") {
        console.log("next!")
        //res.status(400).json({m: "OK"})
        next();
    } else {
        res.status(401).json({ error: "Can't access this page." });
    }
}

export function formatHHMMSS(date) {
    datetext = date.toTimeString();
    datetext = datetext.split(' ')[0];
    return datetext + ":" + date.getMilliseconds();
}

export function isDateValid(dateStr) {
    return !isNaN(new Date(dateStr));
}

export function loadJSON(path) {
    return JSON.parse(readFileSync(new URL(path, import.meta.url)));
} 