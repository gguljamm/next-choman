import db from './db'
import { collectionToObject } from './utils'

export function getPage(pageId:string) {
  return db.collection('pages').doc(pageId).get().then((doc:any) => doc.data())
}

export function getDailyRef(limit:number = 9999) {
  return db.collection('daily')
    .limit(limit)
}

export function getDaily() {
  return getDailyRef()
    .get().then((ss: any) => collectionToObject(ss))
}

export function watchDaily(onData:Function, limit:number) {
  return getDailyRef(limit)
    .onSnapshot((ss: any) => {
      onData(collectionToObject(ss))
    })
}

export function addDoc(collectionName: string, key: string, obj: any) {
  return db.collection(collectionName).doc(key).set(obj)
}

export function deleteTodo(docId:string) {
  return db.collection('todos').doc(docId).delete()
}

