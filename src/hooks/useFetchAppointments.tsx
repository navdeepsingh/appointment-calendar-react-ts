import { useState, useEffect } from "react";
import { fetchPromise } from "@src/utility";

export default function useFetchAppointments(url, defaultValue = []) {
  const [data, setData] = useState(defaultValue);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {   
    // fetch new data
    fetchPromise(url)
    .then(newData => {
      setData(newData)
      setLoading(false)
    }, 
    error => {
      console.log(error)
      setLoading(false)
    });
  }, []);

  return [data, isLoading];
}