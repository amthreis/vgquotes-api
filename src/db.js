import { loadJSON } from "./funcs.js";

//whenever the app starts, the in-mem db comes up with no data and from times to times will pull something from the unused
const db = loadJSON('./data.json');
db.data.sort(() => Math.random() - 0.5);

export let data = [];
export const unused = [... db.data];