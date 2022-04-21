let BASE_URL = "";

if (process.env.NODE_ENV == "development") {
	BASE_URL = "/api";
} else if (process.env.NODE_ENV == "debug") {
	BASE_URL = "";
} else if (process.env.NODE_ENV == "production") {
	BASE_URL = "/api";
}

export default BASE_URL;
