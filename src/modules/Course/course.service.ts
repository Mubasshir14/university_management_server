import { Course } from './course.model';
import { TCourse } from './course.interface';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async () => {
  const result = await Course.find()
    .populate('faculty')
    .populate('offered_in'); 

  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id)
    .populate('faculty')
    .populate('offered_in');

  return result;
};


const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
};
