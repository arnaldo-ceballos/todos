import React from "react";

function useLocalStorage(itemName, initialValue) {
  let [loading, setLoading] = React.useState(true);
  let [error, setError] = React.useState(false);
  let [item, setItem] = React.useState(initialValue);
  React.useEffect(() => {
    console.log("se ejecuta use effect");
    setTimeout(() => {
      try {
        if (!localStorage.getItem(itemName)) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
        }
        let parsedItem = JSON.parse(localStorage.getItem(itemName));
        setItem(parsedItem);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Para actualizar la información
  const saveItem = (newItem) => {
    try {
      const stringifyItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifyItem);
      setItem(newItem);
    } catch (error) {
      setError(error);
    }
  };
  // Al ser mas de dos elementos (estado y su actualizador) en el retorno, no se debe retornar un array sino un objeto
  return { item, saveItem, loading, error };
}

export { useLocalStorage };
