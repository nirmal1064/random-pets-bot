import axios from "axios";
import {
  DOG_API_ENDPOINT,
  RANDOM_DOG_FACTS,
  RANDOM_DOG_IMAGE
} from "../utils/constants";

interface dogImage {
  message: string;
  status: string;
}

interface dogFact {
  fact: string;
}

interface animal {
  image: string;
  fact: string;
}

export const getDogImage = async () => {
  try {
    const resp: dogImage = await (await axios.get(RANDOM_DOG_IMAGE)).data;
    if (resp.status === "success") {
      return resp.message;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const getDogFact = async () => {
  try {
    const resp: dogFact = await (await axios.get(RANDOM_DOG_FACTS)).data;
    return resp.fact;
  } catch (error) {
    return null;
  }
};

export const getDog = async () => {
  try {
    const resp: animal = await (await axios.get(DOG_API_ENDPOINT)).data;
    return resp;
  } catch (error) {
    return null;
  }
};
