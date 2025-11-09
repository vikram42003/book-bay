const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!NEXT_PUBLIC_API_URL) {
  console.log(NEXT_PUBLIC_API_URL);
  throw new Error("The app cannot function without the backend url - NEXT_PUBLIC_API_URL");
}

const ENV = {
  NEXT_PUBLIC_API_URL,
};

export default ENV;
