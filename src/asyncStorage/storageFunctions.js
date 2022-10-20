import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      alert("Saving key not possible");
    }
  }

const storeDataJson = async (key,value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      alert("Saving key not possible");
    }
}

const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
        return value;
      }else{
        return null;
      }
    } catch(e) {
      alert("Saving key not possible");
    }
  }

  const getDataJson = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      alert("Saving key not possible");
    }
  }

  export {storeData,storeDataJson,getData,getDataJson};