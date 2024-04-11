import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import firebaseConfig from './firebase';
import { ImageType, ChartItemType, ChartItemDataType } from './types';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(firebaseApp);
const database = firebase.database(firebaseApp);
const dbRef = database.ref();
const storage = firebase.storage(firebaseApp);
const storageRef = storage.ref();

/**
 * Get DB Data
 * @param target 
 * @returns 
 */
export const fetchData = async (target: string) => {
  const dataRef = await dbRef.child('chart-tool/' + target).get();
  const data = await dataRef.val();
  return data;
}

/**
 * Get Chart List
 * @returns 
 */
export const fetchChartList = async (): Promise<ChartItemType[]> => {
  const charts = await fetchData('charts');
  let result = [];
  for (const [key, dbChartData] of Object.entries(charts)) {
    const tempChartData: ChartItemDataType = dbChartData as ChartItemDataType;
    const tempChartID = { id: key }
    const tempChartItem: ChartItemType = Object.assign(tempChartID, tempChartData);
    result.push(tempChartItem);
  }
  return result;
}

/**
 * Update Chart Info
 * @param chart 
 * @returns 
 */

export const updateChart = async (chart: ChartItemType): Promise<ChartItemType> => {
  const { id, ...data } = chart;
  const chartData: ChartItemDataType = data;
  const chartRef = dbRef.child('chart-tool/charts/' + chart.id).update(chartData);
  const dataRef = await dbRef.child('chart-tool/charts/' + chart.id).get();
  const response = await dataRef.val();
  return chart;
}

/**
 * Add New Chart
 * @param chart 
 * @returns 
 */

export const newChart = async (chart: ChartItemDataType): Promise<ChartItemType> => {
  const key = dbRef.child('chart-tool/charts/').push().key;
  const chartRef = await dbRef.child('chart-tool/charts/' + key).set(chart);
  const dataRef = await dbRef.child('chart-tool/charts/' + key).get();
  const response = await dataRef.val();
  const result = Object.assign({ id: key, chart });
  return result;

}

/**
 * Remove Chart
 * @param id 
 * @returns 
 */

export const removeChart = async (id: string): Promise<string> => {
  dbRef.child('chart-tool/charts/' + id).remove();
  return id;
}

/**
 * Firebase Get Media List
 * @returns 
 */

export const fetchMediaList = async () => {
  const fileList = await storageRef.child('images/').listAll();
  const items = fileList.items;
  const results = await Promise.all(items.map(async (item) => {
    const url = await item.getDownloadURL();
    const result: ImageType = {
      name: item.name,
      url: url
    }
    return result;
  }));
  return results;
}

/**
 * Firebase Get Single Media
 * @param fileName 
 * @returns 
 */

export const downloadMedia = async (fileName: string) => {
  const fileRef = storageRef.child('images/' + fileName);
  const fileURL = await fileRef.getDownloadURL();
  return fileURL;
}

/**
 * Firebase Upload Media
 * @param file 
 * @returns 
 */

export const uploadMedia = async (file: File) => {
  const metadata = {
    contentType: 'image/*'
  };
  const fileRef = storageRef.child('images/' + file.name);
  const uploadTask = await fileRef.put(file, metadata);
  const downloadURL = await uploadTask.ref.getDownloadURL();
  const result: ImageType = {
    name: file.name,
    url: downloadURL
  }
  return result;
}

/**
 * Firebase User Login
 * @param email 
 * @param password 
 */
export const userLogin = async (email: string, password: string) => {
  const userLogin = await auth.signInWithEmailAndPassword(email, password);
  const userData = userLogin.user;
  return userData;
}

/**
 * Firebase User Signup
 * @param email 
 * @param password 
 */
export const userSignUp = async (email: string, password: string) => {
  const userLogin = await auth.createUserWithEmailAndPassword(email, password);
  const userData = userLogin.user;
  return userData;
}

/**
 * Firebase User Logout
 */

export const removeUserLogin = async () => {
  const initFirebaseAuth = () => {
    return new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        resolve(user);
        unsubscribe();
      });
    });
  };
  const user = await initFirebaseAuth();
  if (user) {
    console.log(user);
  }
  auth.signOut().then(() => {
    console.log('Logout successed');
  })
    .catch((error) => {
      console.log(`Logout error (${error})`);
    });
}