/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import AppError from '../../app/errors/AppError';
import { AcademicDepartment } from '../AcademicDepartment/academicDepartment.model';

const createFacultyIntoDB = async (
  payload: TFaculty,
  image: any,
): Promise<TFaculty> => {
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Academic department not found');
  }

  const existingEmail = await Faculty.findOne({ email: payload.email });
  if (existingEmail) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Faculty with this email already exists',
    );
  }
  const existingNID = await Faculty.findOne({ nid: payload.nid });
  if (existingNID) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Faculty with this nid already exists',
    );
  }
  const existingFacultyID = await Faculty.findOne({ id: payload.id });
  if (existingFacultyID) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Faculty with this id already exists',
    );
  }
  const existingPhone = await Faculty.findOne({ contactNo: payload.contactNo });
  if (existingPhone) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Faculty with this phone already exists',
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // const generatedId = await generateFacultyId();
    // payload.id = generatedId;

    if (image) {
      payload.image = image.path;
    }

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await AcademicDepartment.findByIdAndUpdate(
      payload.academicDepartment,
      {
        $push: { faculty: newFaculty[0]._id },
      },
      { session },
    );

    await session.commitTransaction();
    return newFaculty[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllFacultiesFromDB = async () => {
  const result = await Faculty.find().populate('academicDepartment');
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id).populate('academicDepartment');

  return result;
};

const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const FacultyServices = {
  createFacultyIntoDB,
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
};
