import { MongoClient } from 'mongodb';

export class MongoClientConnection {
  constructor() {
    this.URI = process.env.MONGO_DB_CONNECTION_URL;
    this.client = new MongoClient(
      'mongodb+srv://root:root@cluster0.ttmmwky.mongodb.net/'
    );
    this.connect();
  }
  connect() {
    try {
      this.client.connect().then(() => {
        console.log('connected successfully');
      });
      this.collection = this.client.db('user-db').collection('user-data');
      this.userData = this.client.db('user-db').collection('userData');
    } catch (err) {
      console.log(err);
    } finally {
    }
  }

  async addUser(data) {
    const { username } = data;
    const res = await this.userData.updateOne(
      { username },
      { $set: data },
      { upsert: true }
    );
    // console.log(res);
  }

  async getUser(username) {
    const res = await this.userData.findOne({ username });
    return res;
  }
  async getAllUser() {
    const res = await this.userData.find({}).toArray();
    return res;
  }
  async getUserByEmail(email) {
    // console.log({ email });
    return new Promise((resolve, reject) => {
      resolve(this.userData.findOne({ email }));
    });
  }
}
