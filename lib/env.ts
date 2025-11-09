const NEXT_API_URL = process.env.NEXT_API_URL;

if (!NEXT_API_URL) {
  throw new Error("The app cannot function without the backend url - NEXT_API_URL");
}

const ENV = {
  NEXT_API_URL,
};

export default ENV;
