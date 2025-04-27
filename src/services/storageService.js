const STORAGE_KEY = 'taskManagerData'

export function saveToLocalStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function loadFromLocalStorage() {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved ? JSON.parse(saved) : { modules: [] }
}
