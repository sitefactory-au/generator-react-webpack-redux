import {Observable} from 'rxjs/Observable';

const obj = {
    get: (url, headers ) => Observable.ajax.getJSON( url, headers ),
    put: (url, payload, headers ) => Observable.ajax.put( url, payload, headers ),
    post: (url, payload, headers ) => Observable.ajax.post( url, payload, headers ),
    delete: (url, headers ) => Observable.ajax.delete( url, headers )
}

export default obj;