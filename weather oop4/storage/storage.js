import { get, set } from "./sorageUtils.js";

const rootRef = document.getElementById("root");
const visit = get("visit");

//updating the disk
if (visit) {
  set("visit", {
    ...visit,
    count: visit.count + 1,
    lastVisitDate: Date.now(),
  });
} else {
  set("visit", {
    count: 1,
    lastVisitDate: Date.now(),
    firstVisitDate: Date.now(),
  });
}

//render the dom based on the above data
if (Date.now() - visit.firstVisitDate > 15000) {
  rootRef.innerHTML = `Holiday is £200`;
} else {
  rootRef.innerHTML = `Holiday is £100`;
}
