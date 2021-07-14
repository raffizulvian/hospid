const deleteQueryBatch = async (db, query, resolve) => {
  const snapshot = await query.get();
  const batchSize = snapshot.size;

  if (batchSize === 0) {
    resolve();
    return;
  }

  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
  });
};

const deleteCollection = async (db, path, batchSize) => {
  const collectionRef = db.collection(path);
  const query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject);
  });
};

export { deleteCollection, deleteQueryBatch };
