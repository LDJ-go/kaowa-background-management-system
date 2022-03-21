var JSONbigString = require('json-bigint')({ storeAsString: true });

export const parseData = (data) => {
	try {
		return JSONbigString.parse(data);
	} catch (err) {
		return JSON.parse(data);
	}
};
