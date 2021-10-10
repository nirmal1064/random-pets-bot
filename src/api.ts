import axios from "axios";

interface dogResponse {
  message: string;
  status: string;
}

export const getImage = async () => {
  const url = "https://dog.ceo/api/breeds/image/random";
  try {
    const resp: dogResponse = await (await axios.get(url)).data;
    if (resp.status === "success") {
      return resp.message;
    }
    return null;
  } catch (error) {
    return null;
  }
};
