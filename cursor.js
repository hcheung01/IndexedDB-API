The IDBCursor interface of the IndexedDB API represents a cursor for traversing or iterating over multiple records in a database.

The cursor has a source that indicates which index or object store it is iterating over. It has a position within the range, and moves in a direction that is increasing or decreasing in the order of record keys. The cursor enables an application to asynchronously process all the records in the cursor s range.

You can have an unlimited number of cursors at the same time. You always get the same IDBCursor object representing a given cursor. Operations are performed on the underlying index or object store.

PROPERTIES

IDBCursor.source Read only
Returns the IDBObjectStore or IDBIndex that the cursor is iterating. This function never returns null or throws an exception, even if the cursor is currently being iterated, has iterated past its end, or its transaction is not active.
IDBCursor.direction Read only
Returns the direction of traversal of the cursor. See Constants for possible values.
IDBCursor.key Read only
Returns the key for the record at the cursor's position. If the cursor is outside its range, this is set to undefined. The cursor's key can be any data type.
IDBCursor.value Read only
Returns the value for the record at the cursor's position. The cursor's value can be any data type.
IDBCursor.primaryKey Read only
Returns the cursor's current effective primary key. If the cursor is currently being iterated or has iterated outside its range, this is set to undefined. The cursor's primary key can be any data type.

METHODS

1. IDBCursor.advance()

SYNTAX EXAMPLE:

cursor.advance(count);

Sets the number times a cursor should move its position forward.
IDBCursor.continue()
Advances the cursor to the next position along its direction, to the item whose key matches the optional key parameter.
IDBCursor.continuePrimaryKey()
Sets the cursor to the given index key and primary key given as arguments.
IDBCursor.delete()
Returns an IDBRequest object, and, in a separate thread, deletes the record at the cursor's position, without changing the cursor's position. This can be used to delete specific records.
IDBCursor.update()
Returns an IDBRequest object, and, in a separate thread, updates the value at the current position of the cursor in the object store. This can be used to update specific records.

2. IDBCursor.continue()

SYNTAX EXAMPLE:
cursor.continue(optionalKey);

The continue() method of the IDBCursor interface advances the cursor to the next position along its direction, to the item whose key matches the optional key parameter. If no key is specified, the cursor advances to the immediate next position, based on its direction.

3. IDBCursor.continuePrimaryKey(

SYNTAX EXAMPLE:
cursor.continuePrimaryKey(key, primaryKey);

The continuePrimaryKey() method of the IDBCursor interface advances the cursor to the to the item whose key matches the key parameter as well as whose primary key matches the primary key parameter.

A typical use case, is to resume the iteration where a previous cursor has been closed, without having to compare the keys one by one.

Calling this method more than once before new cursor data has been loaded - for example, calling continuePrimaryKey() twice from the same onsuccess handler - results in an InvalidStateError being thrown on the second call because the cursor’s got value flag has been unset.

4. IDBCursor.delete()

SYNTAX EXAMPLE:
var anIDBRequest = myIDBCursor.delete();

The delete() method of the IDBCursor interface returns an IDBRequest object, and, in a separate thread, deletes the record at the cursor's position, without changing the cursor's position. Once the record is deleted, the cursor's value is set to null.

Be aware that you can't call delete() (or IDBCursor.update()) on cursors obtained from IDBIndex.openKeyCursor(). For such needs, you have to use IDBIndex.openCursor() instead.

5. IDBCursor.update()

SYNTAX EXAMPLE:
var anIDBRequest = myIDBCursor.update(value);

The update() method of the IDBCursor interface returns an IDBRequest object, and, in a separate thread, updates the value at the current position of the cursor in the object store. If the cursor points to a record that has just been deleted, a new record is created.

Be aware that you can't call update() (or IDBCursor.delete()) on cursors obtained from IDBIndex.openKeyCursor(). For such needs, you have to use IDBIndex.openCursor() instead.
