import { TService } from './service.interface';
import { ServicesModel } from './service.model';

// create a new product
const createServicesInDB = async (product: TService) => {
  const result = await ServicesModel.create(product);
  return result;
};

// get single product using  by Id
const getSingleServicesFromDB = async (id: string) => {
  const result = await ServicesModel.findById(id);
  return result;
};
// update product
const updateServicesFromDB = async (id: string, payload: Partial<TService>) => {
  const result = await ServicesModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// const updateServicesFromDB = async (_id: string, updateProduct: TService) => {
//   const result = await ServicesModel.updateOne(
//     { _id },
//     { $set: updateProduct },
//   );
//   return result;
// };
// delete product
const deletedServicesFromDB = async (id: string) => {
  const deletedFaculty = await ServicesModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  return deletedFaculty;
};
// const deletedServicesFromDB = async (_id: string) => {
//   const result = await ServicesModel.deleteOne({ _id });
//   return result;
// };

// get all products
// const getAllServicesFromDB = async () => {
//   const result = await ServicesModel.find();
//   return result;
// };

// const getAllProductsFromDB = async (query?: string) => {
//   let searchText = {};

//   if (query) {
//     const regex = new RegExp(query, 'i');
//     searchText = {
//       $or: [
//         { name: { $regex: regex } },
//         { description: { $regex: regex } },
//         { category: { $regex: regex } },
//       ],
//     };

//     const result = await ProductModel.find(searchText);
//     return result;
//   } else {
//     const result = await ProductModel.find();
//     return result;
//   }
// };
export const serviceServices = {
  // getAllServicesFromDB,
  getSingleServicesFromDB,
  createServicesInDB,
  updateServicesFromDB,
  deletedServicesFromDB,
};
