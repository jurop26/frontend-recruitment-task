import { useState } from "react";

const useFetch = (collection) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const URL = `http://localhost:3000/api/${collection}`;

  const create = async (body) => {
    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        throw new Error(`Failed to create ${id}.`);
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.err(err.message);
    }
  };

  const open = async (id) => {
    try {
      const res = await fetch(`${URL}/${id}`);
      if (!res.ok) {
        throw new Error(`Failed to open ${id}.`);
      }
      const data = await res.json();

      return data;
    } catch (err) {
      console.error(err.message);
    }
  };

  const readAll = async () => {
    try {
      setLoading(true);
      const res = await fetch(URL);
      const data = await res.json();
      return data;
    } catch (err) {
      setErrors(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { create, open, readAll, loading, errors };
};

export default useFetch;
