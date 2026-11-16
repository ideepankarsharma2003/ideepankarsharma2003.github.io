let databasePromise;
let expectedRevision = 0;

function openDatabase() {
  if (!databasePromise) {
    databasePromise = new Promise((resolve, reject) => {
      const request = indexedDB.open("deepankar-writing-desk", 1);
      request.onupgradeneeded = () =>
        request.result.createObjectStore("workspace");
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      request.onblocked = () =>
        reject(new Error("Close other writing-desk tabs and reload."));
    });
  }
  return databasePromise;
}

export async function readDesk() {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const request = database
      .transaction("workspace", "readonly")
      .objectStore("workspace")
      .get("desk");
    request.onsuccess = () => {
      expectedRevision = request.result?.revision || 0;
      resolve(request.result);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function saveDesk(desk) {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction("workspace", "readwrite");
    const store = transaction.objectStore("workspace");
    const request = store.get("desk");
    let nextRevision;
    let conflict;
    request.onsuccess = () => {
      const revision = request.result?.revision || 0;
      if (revision !== expectedRevision) {
        conflict = new Error(
          "A newer draft was saved in another tab. Export your current writing before reloading.",
        );
        transaction.abort();
        return;
      }
      nextRevision = revision + 1;
      store.put({ ...desk, revision: nextRevision }, "desk");
    };
    transaction.oncomplete = () => {
      expectedRevision = nextRevision;
      resolve();
    };
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () =>
      reject(
        conflict ||
          transaction.error ||
          new Error("The draft save was interrupted."),
      );
  });
}
