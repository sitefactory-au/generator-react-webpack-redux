import { combineEpics } from 'redux-observable';
// import { someEpic } from '../epics/someEpics';

var epics = [
	//someEpic
];

export const rootEpic = combineEpics.apply( this, epics );
