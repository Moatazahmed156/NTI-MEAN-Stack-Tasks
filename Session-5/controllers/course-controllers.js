const fs = require("fs");

let courses = JSON.parse(
  fs.readFileSync("./data/courses-data.json", "utf-8")
);

// GET ALL COURSES
const getAllCourses = (req, res) => {
  res.status(200).json({
    status: "success",
    count: courses.length,
    data: {
      courses,
    },
  });
};

// GET COURSE BY ID
const getCourseById = (req, res) => {
  const courseId = +req.params.id;

  const course = courses.find((course) => course.id === courseId);

  if (!course) {
    return res.status(404).json({
      status: "error",
      message: "Course not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      course,
    },
  });
};

// CREATE COURSE
const createCourse = (req, res) => {
  const newId = courses.length
    ? courses[courses.length - 1].id + 1
    : 1;

  const newCourse = {
    id: newId,
    ...req.body,
  };

  courses.push(newCourse);

  fs.writeFile(
    "./data/courses-data.json",
    JSON.stringify(courses, null, 2),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Failed to save course",
        });
      }

      res.status(201).json({
        status: "success",
        message: "Course created successfully",
        data: {
          course: newCourse,
        },
      });
    }
  );
};

// UPDATE COURSE
const updateCourse = (req, res) => {
  const courseId = +req.params.id;

  const course = courses.find((course) => course.id === courseId);

  const index = courses.findIndex(
    (course) => course.id === courseId
  );

  if (!course) {
    return res.status(404).json({
      status: "error",
      message: "Course not found",
    });
  }

  const updatedCourse = Object.assign(course, req.body);

  courses[index] = updatedCourse;

  fs.writeFile(
    "./data/courses-data.json",
    JSON.stringify(courses, null, 2),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Failed to update course",
        });
      }

      res.status(200).json({
        status: "success",
        message: "Course updated successfully",
        data: {
          course: updatedCourse,
        },
      });
    }
  );
};

// DELETE COURSE
const deleteCourse = (req, res) => {
  const courseId = +req.params.id;

  const course = courses.find((course) => course.id === courseId);

  const index = courses.findIndex(
    (course) => course.id === courseId
  );

  if (!course) {
    return res.status(404).json({
      status: "error",
      message: "Course not found",
    });
  }

  courses.splice(index, 1);

  fs.writeFile(
    "./data/courses-data.json",
    JSON.stringify(courses, null, 2),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Failed to delete course",
        });
      }

      res.status(200).json({
        status: "success",
        message: "Course deleted successfully",
        data: {
          course,
        },
      });
    }
  );
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};