//import $ from 'jquery'; 
import 'rxjs';
import { Observable } from 'rxjs/Observable'; 

const _wrap = (val) => Observable.of( { response: val });
const _wrapError = (val) => Observable.throw( { response: val });

/*
Example:  
const _companies = [ 
    { id: 1, name: 'Plumbing Co.', contactName: 'Joe Plumber', contactEmail: 'joe@plumber.com.au' }, 
    { id: 2, name: 'Building Co.', contactName: 'Tom Builder', contactEmail: 'tom@builder.com.au' }, 
    { id: 3, name: 'Tiling Co.', contactName: 'Dave Tiler', contactEmail: 'dave@tiler.com.au' } 
]; 

export const fetchCompanies = () => _wrap(_companies);
*/