interface ApiUrls {
  development: string;
  production: string;
}

const apiUrls: ApiUrls = {
  development: "http://localhost:3001/api",
  production: "https://zany-frederique-abm-tech-5c05b1b4.koyeb.app/api",
};

export const BASE_URL: string = apiUrls.development;
