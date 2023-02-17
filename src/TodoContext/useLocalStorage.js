import React from "react";

function useLocalStorage(itemName, initialValue) {
  let [loading, setLoading] = React.useState(true);
  let [error, setError] = React.useState(false);
  let [item, setItem] = React.useState(initialValue);
  React.useEffect(() => {
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
    }, 5000);
  });

  const saveItem = (newItem) => {
    try {
      // console.log("new item", newItem);
      const stringifyItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifyItem);
      setItem(newItem);
    } catch (error) {
      setError(error);
    }
  };
  return { item, saveItem, loading, error };
}

export { useLocalStorage };
