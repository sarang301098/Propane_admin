type SettingsArray = {
  id: number;
  isActive: boolean;
  value: number;
};
export let updateData: SettingsArray[] = [];

export const compareFunction = (oldArray: SettingsArray[], newArray: SettingsArray[]) => {
  updateData = [];

  for (let index = 0; index < oldArray.length; index++) {
    const oldData: SettingsArray = oldArray[index];
    const newData: SettingsArray = newArray[index];
    if (
      oldData.id === newData.id &&
      (oldData.isActive !== newData.isActive || oldData.value !== newData.value)
    ) {
      updateData.push({
        id: newData.id,
        isActive: newData.isActive,
        value: newData.value,
      });
    }
  }
};
