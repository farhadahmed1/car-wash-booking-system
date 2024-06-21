import httpStatus from 'http-status';
import catchAsync from '../../middlewares/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { serviceServices } from './service.service';
import { handleNoDataFound } from '../../errors/handleNoDataFound';
import { ServicesModel } from './service.model';

const createService = catchAsync(async (req, res) => {
  const ServiceData = req.body;
  const result = await serviceServices.createServicesInDB(ServiceData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service created successfully',
    data: result,
  });
});

const getSingleService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await serviceServices.getSingleServicesFromDB(id);
  if (!result) {
    return handleNoDataFound(res);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service retrieved successfully',
    data: result,
  });
});

const getAllServices = catchAsync(async (req, res) => {
  // const result = await Service.find()
  const result = await ServicesModel.aggregate([
    { $match: { isDeleted: false } },
  ]);

  if (result?.length === 0) {
    return handleNoDataFound(res);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service is retrieved successfully',
    data: result,
  });
});

const updateService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const service = req.body;
  const result = await serviceServices.updateServicesFromDB(id, service);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service is updated successfully',
    data: result,
  });
});

const deleteService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await serviceServices.deletedServicesFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service is deleted successfully',
    data: result,
  });
});

export const serviceControllers = {
  createService,
  getSingleService,
  getAllServices,
  updateService,
  deleteService,
};
