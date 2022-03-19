let BASE_URL = "";

if (process.env.NODE_ENV == "development") {
	BASE_URL = "/api";
} else if (process.env.NODE_ENV == "debug") {
	BASE_URL = "";
} else if (process.env.NODE_ENV == "production") {
	BASE_URL = "http://106.52.192.138:8111";
}

export default BASE_URL;
