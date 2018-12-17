import { cookie } from 'cookie_js';

export default class DataManager {
	constructor (options) {
		this.duration = options.duration;
	}
	getData(key) {
		if (cookie.enabled()) {
			return cookie.get(key);
		}
		return localStorage.getItem(key);
	}
	setData(key, value, duration) {
		if (cookie.enabled()) {
			if (duration) {
				cookie.set(key, value, { expires: duration });
			}
			else {
				cookie.set(key, value, { expires: this.duration });
			}
		}
		else {
			localStorage.setItem(key, value);
		}
	}
	removeData(key) {
		if (cookie.enabled()) {
			cookie.remove(key);
		}
		else {
			localStorage.removeItem(key);
		}
	}
}