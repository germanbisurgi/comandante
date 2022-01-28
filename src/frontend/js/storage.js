class Storage {
  getItem (key) {
    return JSON.parse(window.localStorage.getItem(key))
  }

  setItem (key, value) {
    console.log('set', value)
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  removeItem (key) {
    window.localStorage.removeItem(key)
  }
}
