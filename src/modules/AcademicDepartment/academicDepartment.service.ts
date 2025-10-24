/* eslint-disable @typescript-eslint/no-explicit-any */
import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (
  payload: TAcademicDepartment,
  image: any,
) => {
  const result = await AcademicDepartment.create({
    ...payload,
    image: image?.path,
  });
  return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find().populate('faculty');
  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById(id).populate('faculty');

  return result;
};

const updateAcademicDepartmentIntoDB = async (
  departmentId: string,
  payload: Partial<TAcademicDepartment>,
  image?: any,
) => {
  const updateData: Partial<TAcademicDepartment> = {
    ...payload,
  };

  if (image) {
    updateData.image = image?.path;
  }

  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: departmentId },
    updateData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
    updateAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB
};
