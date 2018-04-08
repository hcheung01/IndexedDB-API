IDB notes

idb
This is your entry point to the API. It's exposed to the global scope unless you're using a module system such as browserify, in which case it is the exported object.

idb.open(name, version, upgradeCallback)
This method returns a promise that resolves to a DB.

name and version behave as they do in indexedDB.open.

upgradeCallback is called if version is greater than the version last opened. It's similar to IDB's onupgradeneeded. The callback receives an instance of UpgradeDB.

idb.open('keyval-store', 2, upgradeDB => {
  // Note: we don't use 'break' in this switch statement,
  // the fall-through behaviour is what we want.
  switch (upgradeDB.oldVersion) {
    case 0:
      upgradeDB.createObjectStore('keyval');
    case 1:
      upgradeDB.createObjectStore('stuff', {keyPath: ''});
  }
}).then(db => console.log("DB opened!", db));
idb.delete(name)
Behaves like indexedDB.deleteDatabase, but returns a promise.

idb.delete('keyval-store').then(() => console.log('done!'));
----------------------------------------------------------------------------
UpgradeDB
As DB, except:

Properties:

transaction - this is a property rather than a method. It's a Transaction representing the upgrade transaction
oldVersion - the previous version of the DB seen by the browser, or 0 if it's new
Methods:

createObjectStore - as idbDatabase.createObjectStore, but returns an ObjectStore
deleteObjectStore - as idbDatabase.deleteObjectStore
----------------------------------------------------------------------------
