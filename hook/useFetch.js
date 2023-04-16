import { useState, useEffect } from "react";
import axios from "axios";
// import { API_KEY } from "@env";
import { Constants } from "expo-constants";
// import Config from "react-native-config";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  console.log(process.env.API_KEY);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {
      ...query,
    },
    headers: {
      "X-RapidAPI-Key": "f9a70fe045msh532deb5dcd7eb9ap186f2djsn0abf91e34804",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
