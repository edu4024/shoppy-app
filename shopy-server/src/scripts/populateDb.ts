import mongoose from 'mongoose';
import { UserSchema } from '../api/users/schemas/user.schema';
import { ProductSchema } from '../api/products/schemas/product.schema';
import { users, products } from './sample-data';

async function main() {
  await connect();
  console.log('Connected to', process.env.MONGODB);
  const [user] = await populateUsers();
  await populateProducts(user._id);
  console.log('The database has been populated successfully');
}

const connect = async () => {
  try {
    return mongoose.connect(process.env.MONGODB);
  } catch (err) {
    console.error('Database connect error', err);
  }
};

const populateUsers = async () => {
  try {
    const userModel = mongoose.model('USER', UserSchema);
    return userModel.create(users);
  } catch (err) {
    console.error('An error occurred while attempting to create user:', err);
  }
};

const populateProducts = async (userId) => {
  try {
    const productModel = mongoose.model('PRODUCT', ProductSchema);
    const mapProducts = products.map((product) => {
      product.userId = userId;
      return product;
    });
    return productModel.create(mapProducts);
  } catch (err) {
    console.error('An error occurred while attempting to create user:', err);
  }
};

main()
  .catch((err) => {
    console.error(
      'An error occurred while attempting to populate the database:',
      err,
    );
  })
  .finally(async () => {
    console.log('Close connection');
    await mongoose.connection.close();
  });
