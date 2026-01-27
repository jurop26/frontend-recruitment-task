import { useState } from "react";

const useHandleDb = (collection) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const URL = `http://localhost:3000/api/${collection}`;

  const apiFetch = async (URL, options = {}) => {
    try {
      const res = await fetch(URL, {
        headers: { "Content-type": "application/json" },
        ...options,
      });
      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`);
      }
      return await res.json();
    } catch (err) {
      throw err;
    }
  };

  const create = async (body) =>
    await apiFetch(URL, {
      method: "POST",
      body: JSON.stringify(body),
    });

  const open = async (id) => await apiFetch(`${URL}/${id}`);

  const update = async (id, body) =>
    await apiFetch(`${URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });

  const readAll = async () => {
    try {
      setLoading(true);
      return await apiFetch(URL);
    } catch (err) {
      setErrors(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { create, open, readAll, update, loading, errors };
};

export default useHandleDb;
