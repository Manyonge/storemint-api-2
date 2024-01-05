import * as admin from "firebase-admin";
import { Bucket } from "@google-cloud/storage";

let serviceAccount = require("../service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://storemint-api.appspot.com",
});

const storage = admin.storage();
export const bucket: Bucket = storage.bucket();
