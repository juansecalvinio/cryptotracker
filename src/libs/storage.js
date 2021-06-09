import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {
    
    static instance = new Storage();

    async store(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
            return true;
        } catch (error) {
            console.log("Storage store error", error);
            return false;
        }
    }

    async multiGet(keys) {
        try {
            return await AsyncStorage.multiGet(keys);
        } catch (error) {
            console.log("Storage multiget error", error);
            throw Error(error);
        }
    }

    async getAllKeys() {
        try {
            return await AsyncStorage.getAllKeys();
        } catch (error) {
            console.log("Storage getAllKeys error", error);
            throw Error(error);
        }
    }

    async get(key) {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            console.log("Storage get error", error);
            throw Error(error);
        }
    }

    async remove(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (error) {
            console.log("Storage remove error", error);
            return false;
        }
    }
}

export default Storage;