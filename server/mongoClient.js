import { MongoClient } from 'mongodb';

export class MongoClientConnection {
  constructor() {
    this.URI = process.env.MONGO_DB_CONNECTION_URL;
    this.client = new MongoClient(this.URI);
    this.connect();
  }
  connect() {
    try {
      this.client.connect().then(() => {
        console.log('connected successfully');
      });
      this.collection = this.client
        .db('tutAR-webApp-db')
        .collection('model-metadata');
      this.userData = this.client.db('tutAR-webApp-db').collection('userData');
    } catch (err) {
      console.log(err);
    } finally {
    }
  }

  async getData() {
    const result = this.collection.find();
    const resArray = await result.toArray();
    return resArray;
  }
  async getOneModel(name) {
    return this.collection.findOne({ name });
  }
  async getFilteredData(Class) {
    const res = await this.collection.find({ Class }).toArray();
    return res;
  }
  async updateData(data) {
    const {
      name,
      thumbName: thumbAddr,
      fileAddr,
      Subject,
      Class,
      materialAddr,
      Scale: scale,
      Topic,
      DisplayName,
      X,
      Y,
      Z,
      Active,
      Intensity,
    } = data;
    const res = await this.collection.updateOne(
      { name },
      {
        $set: {
          thumbAddr,
          DisplayName,
          fileAddr,
          Subject,
          Class,
          Topic,
          materialAddr,
          scale,
          X,
          Y,
          Z,
          Active,
          Intensity,
        },
      },
      { upsert: true }
    );
    // console.log(res);
  }
  deleteData() {}

  async addUser({ username, password }) {
    this.userData.updateOne(
      { username },
      { $set: { username, password } },
      { upsert: true }
    );
    // console.log({ username, password });
    console.log('updating user');
  }
  async getUser(username) {
    console.log('getting user');
    console.log(username);
    const res = await this.userData.find({ username }).toArray();

    return res;
  }

  async addNewUser(details) {
    const { username } = details;
    delete details.type;
    console.log({ details });
    this.userData.updateOne({ username }, { $set: details }, { upsert: true });
  }
  async getUserByEmail(email) {
    // console.log({ email });
    return new Promise((resolve, reject) => {
      resolve(this.userData.findOne({ email }));
    });
  }
}
