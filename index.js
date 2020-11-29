const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
      const newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection);
      newCollection.forEach(e => callback(e));
      return collection
    },

    map: function(collection, callback) {
      if (!(collection instanceof Array))
        collection = Object.values(collection)

      const newCollection = []
      
      collection.forEach(e => newCollection.push(callback(e)))

      return newCollection
    },

    reduce: function(c = [], callback = () => {}, acc) {
      let collection = c.slice(0)

			if (!acc) {
				acc = collection[0]
				collection = collection.slice(1)
			}

			let len = collection.length;

			for (let i = 0; i < len; i++) {
				acc = callback(acc, collection[i], collection)
			}
			return acc;
    },

    find: function(collection, predicate) {
      if (!(collection instanceof Array))
        collection = Object.values(collection)

      for (let i = 0; i < collection.length; i++)
        if (predicate(collection[i])) return collection[i]

      return undefined
    },

    filter: function(collection, predicate) {
      if (!(collection instanceof Array))
        collection = Object.values(collection)

      const newCollection = []

      for (let i = 0; i < collection.length; i++)
        if (predicate(collection[i])) newCollection.push(collection[i])

      return newCollection
    },

    size: function(collection) {
      return (collection instanceof Array) ? collection.length : Object.keys(collection).length
    },

    first: function(collection, n) {
      return (n) ? collection.slice(0, n) : collection[0]
    },	
    
    last: function(collection, n) {
      return (n) ? collection.slice(collection.length - n, collection.length) : collection[collection.length - 1]
    },	

    compact: function(collection) {
      let filtered = collection.filter(x => x)
      return filtered
    },

    sortBy: function(array, callback) {
      const newArray = [...array]
      return newArray.sort(function(a, b) {
        return callback(a) - callback(b)
      })
    },

    uniq: function(collection, sorted = false, callback = false) {
      if (sorted) {
        return fi.uniqSorted(collection, callback)
      } else if (!callback) {
        return Array.from(new Set(collection))
      } else {
        const modifiedVals = new Set()
        const uniqVals = new Set()
        for (let val of collection) {
          const moddedVal = callback(val)
          if (!modifiedVals.has(moddedVal)) {
            modifiedVals.add(moddedVal)
            uniqVals.add(val)
          }
        }
        return Array.from(uniqVals)
      }
    },

    unpack: function(receiver, arr) {
      for (let val of arr)
          receiver.push(val)
    },

    flatten: function(collection, shallow, newArr = []) {
      if (!Array.isArray(collection)) return newArr.push(collection)
      if (shallow) {
          for (let val of collection)
              Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val)
      } else {
          for (let val of collection) {
              this.flatten(val, false, newArr)
          }
      }
      return newArr
    },

    keys: function(obj) {
      const keys = []
      for (let key in obj) {
        keys.push(key)
      }
      return keys
    },

    values: function(obj) {
      const values = []
      for (let key in obj) {
        values.push(obj[key])
      }
      return values
    },

    functions: function(obj) {
      const functionNames = []
      for (let key in obj) {
        if (typeof obj[key] === "function") {
          functionNames.push(obj[key])
        }
      }
      return functionNames.sort()
    },

  }
})()

fi.libraryMethod()
