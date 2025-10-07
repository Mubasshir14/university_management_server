import { AcademicSessionNameCodeMapper } from './academicSession.constant';
import { TAcademicSession } from './academicSession.interface';
import { AcademicSession } from './academicSession.model';

const createAcademicSessionIntoDB = async (payload: TAcademicSession) => {
  if (AcademicSessionNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }
  const result = await AcademicSession.create(payload);
  return result;
};

const getAllAcademicSessionsFromDB = async () => {
  const result = AcademicSession.find();

  return result;
};

const getSingleAcademicSessionFromDB = async (id: string) => {
  const result = await AcademicSession.findById(id);
  return result;
};

const updateAcademicSessionIntoDB = async (
  id: string,
  payload: Partial<TAcademicSession>,
) => {
  if (
    payload.name &&
    payload.code &&
    AcademicSessionNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code');
  }

  const result = await AcademicSession.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSessionServices = {
  createAcademicSessionIntoDB,
  getAllAcademicSessionsFromDB,
  getSingleAcademicSessionFromDB,
  updateAcademicSessionIntoDB,
};
