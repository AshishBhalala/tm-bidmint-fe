import { dependencies, epic$ } from '../root-epic';
// Dynamic loading of Epics
const addEpic = (newEpic, newDependencies) => {
    Object.assign(dependencies, newDependencies);
    // merges this new epic into our existing rootEpic above
    epic$.next(newEpic);
};

export default addEpic;
