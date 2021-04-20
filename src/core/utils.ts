import firestore from 'firebase'

export function collectionToObject(ss:firestore.firestore.QuerySnapshot) {
  const output:any = {};
  ss.forEach((item:any) => {
    output[item.id] = item.data();
  })
  return output;
}
