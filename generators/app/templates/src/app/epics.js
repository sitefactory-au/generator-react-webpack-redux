import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
// import { someEpic } from '../epics/someEpics';



var epics = [
	//someEpic
];

const origOfType = ActionsObservable.prototype.ofType;
ActionsObservable.prototype.ofType = function (type) {
    if (!type) throw ('type parameter for ofType cannot be null or undefined');
    return origOfType.apply(this, arguments);
};


if (epics.filter((epic) => epic === undefined).length > 0) {
    console.error('epics array contains one or more endefined epic:', epics);
    throw 'combine epics error';
}

var wrappedEpics = epics.map(epic =>
    (action$, store) =>
        epic(action$, store)
        .do(action => {
            console.info('Epic', epic.name, '->', action);
        })
    );

export const rootEpic = combineEpics.apply(this, wrappedEpics);

Observable.prototype.mapResponse = function(mapFunc) {
    return this.map(xhr => mapFunc(xhr.response));
};

Observable.prototype.concatVal = function() {
    return this.concat( Observable.of(...arguments) );
};