import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue, orderByChild, query, off } from "firebase/database";

class Fb {

  _app;
  _db;

  constructor()
  {
    const firebaseConfig = {
      apiKey: process.env.FB_ApiKey,
      authDomain: process.env.FB_AuthDomain,
      databaseURL: process.env.FB_DatabaseURL,
      projectId: process.env.FB_ProjectId,
      storageBucket: process.env.FB_StorageBucket,
      messagingSenderId: process.env.FB_MessagingSenderId,
      appId: process.env.FB_AppId
    };
    this._app = initializeApp(firebaseConfig);
    this._db = getDatabase(this._app);
  }

  disconnect() {
    off();
  }

  addRegister(collection, data) {
    const referenceDb = ref(this._db, collection);
    set(push(referenceDb), data);
  }

  getRegisters(collection, callback) {
    const referenceDb = ref(this._db, collection);
    onValue(referenceDb, callback);
  }

  getRegistersByName(collection) {
    const referenceDb = ref(this._db, collection);
    return query(referenceDb, orderByChild("name"));
  }

}

export default Fb;