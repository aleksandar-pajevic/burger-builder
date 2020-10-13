export const updateObject = (oldState, newData) => {
  return {
    ...oldState,
    ...newData,
  };
};
