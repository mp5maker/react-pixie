export const indexedDBTables = {
    music: {
        keyPath: `id`,
        autoIncrement: true,
        columns: {
            id: {
                unique: true
            },
            frequency: {
                unique: false
            },
            isPlaying: {
                unique: false
            }
        }
    }
}

export class IndexedDB {
    public indexedDB: any;
    public request: any;
    public db: any
    public objectStore: any
    public databaseName: any
    public databaseVersion: any
    public tables: any

    constructor() {
        if (window.indexedDB) {
            this.indexedDB = window.indexedDB
            this.databaseName = 'PhotonDatabase'
            this.databaseVersion = 1
            this.tables = indexedDBTables
        } else console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
        this.prepareTables = this.prepareTables.bind(this)
        this.get = this.get.bind(this)
        this.add = this.add.bind(this)
        this.update = this.update.bind(this)
    }

    public open() {
        const openPromise = new Promise((resolve, reject) => {
            this.request = this.indexedDB.open(this.databaseName, this.databaseVersion)
            this.request.onerror = () => reject("IndexedDB is not allowed!");
            this.request.onupgradeneeded = (event: any) => {
                this.db = event.target.result
                this.prepareTables()
            }
            this.request.onsuccess = (event: any) => {
                this.db = event.target.result
                this.db.onerror = (event: any) => console.error(`Database Error: ${event.target.errorCode}`)
                resolve(this.db)
            }
        })

        return openPromise
    }

    private prepareTables() {
        const prepareTablePromise = new Promise((resolve) => {
            const tables = Object.keys(this.tables)
            tables.forEach((tableName) => {
                const objectStore = this.db.createObjectStore(tableName, {
                    ...(this.tables[tableName].keyPath ? { keyPath: this.tables[tableName].keyPath } : {}),
                    ...(this.tables[tableName].autoIncrement ? { autoIncrement: this.tables[tableName].autoIncrement } : {}),
                })
                const columns = Object.keys(this.tables[tableName].columns)
                columns.forEach((columnName: any) => {
                    objectStore.createIndex(
                        columnName,
                        columnName, {
                        ...(this.tables[tableName].columns[columnName].unique ? { unique: true } : { unique: false })
                    })
                })
            })
            resolve()
        })

        return prepareTablePromise
    }

    public get({ tableName, by }: any): any {
        const getPromise = new Promise((resolve, reject) => {
            const transaction = this.db.transaction([tableName])
            const objectStore = transaction.objectStore(tableName)
            const request = objectStore.get(by)
            request.onerror = () => reject(``)
            request.onsuccess = (event: any) => resolve(event.target.result)
        })

        return getPromise
    }

    public add({ tableName, data }: any): any {
        const addPromise = new Promise((resolve, reject) => {
            const transaction = this.db.transaction([tableName], 'readwrite')
            const objectStore = transaction.objectStore(tableName)
            const request = objectStore.add(data)
            request.onerror = () => reject(``)
            request.onsuccess = () => resolve(``)
        })

        return addPromise
    }

    public update({ tableName, data }: any): any {
        const updatePromise = new Promise((resolve, reject) => {
            const transaction = this.db.transaction([tableName], 'readwrite')
            const objectStore = transaction.objectStore(tableName)
            const request = objectStore.put(data)
            request.onerror = () => reject(``)
            request.onsuccess = () => resolve(``)
        })

        return updatePromise
    }

}