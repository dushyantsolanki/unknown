const conf = {
  projectId: String(import.meta.env.VITE_PROJECT_ID),
  endPoint: String(import.meta.env.VITE_ENDPOINT),
  apiKey: String(import.meta.env.VITE_API_KEY),
  bucketId : String(import.meta.env.VITE_BUCKET_ID)
};

export default conf;
