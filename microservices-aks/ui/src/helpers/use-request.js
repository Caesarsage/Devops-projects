import axios from "axios";
import { useState } from "react";

const useRequest = ({ url, method, data, onSuccess }) => {
  const [error, setError] = useState(null);

  const sendRequest = async (props = {}) => {
    try {
      setError(null);
      const result = await axios[method](url, {...data, ...props});

      if (onSuccess) {
        onSuccess(result.data);
      }

      return result.data;
    } catch (error) {
      setError(error.response.data.errors);
    }
  };

  return { sendRequest, error };
};

const uiURL = process.env.NEXT_PUBLIC_SITE_URL;

export { useRequest, uiURL };
