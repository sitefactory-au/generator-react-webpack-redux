import 'rxjs';

const get(url, headers ) {
	return ajax.getJSON( url, headers );
}

const put(url, payload, headers ) {
	return ajax.put( url, payload );
}

const post(url, payload, headers ) {
	return ajax.post( url, payload, headers );
}

const delete(url, headers ) {
	return ajax.delete( url, headers );
}

export const ajax = {get, put, post, delete};