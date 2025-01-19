import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  db_uri: process.env.DB_URI,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires: process.env.JWT_ACCESS_EXPIRES,
  store_id: process.env.STORE_ID,
  signeture_key: process.env.SIGNETURE_KEY,
  payment_url: process.env.PAYMENT_URL,
  payment_verify_url: process.env.PAYMENT_VERIFY_URL,
};
