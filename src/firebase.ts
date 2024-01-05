import * as admin from "firebase-admin";
import { Bucket } from "@google-cloud/storage";

const firebaseServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(Buffer.from(firebaseServiceAccount, "base64").toString("utf-8")),
  ),
  storageBucket: "gs://storemint-api.appspot.com",
});

const storage = admin.storage();
export const bucket: Bucket = storage.bucket();
