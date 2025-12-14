const express = require("express");
const app = express();
const port = 3000;

const sequelize = require("./sequelize");

const University = require("./models/university");
const Student = require("./models/student");
const Course = require("./models/course");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

University.hasMany(Student, { foreignKey: "universityId", onDelete: "CASCADE" });
Student.belongsTo(University, { foreignKey: "universityId" });

University.hasMany(Course, { foreignKey: "universityId", onDelete: "CASCADE" });
Course.belongsTo(University, { foreignKey: "universityId" });

Student.belongsToMany(Course, { through: "enrollements" });
Course.belongsToMany(Student, { through: "enrollements" });

app.put("/", async (req, res, next) => {
  try {
    await sequelize.sync({ force: true });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.get("/create", async (req, res, next) => {
  try {
    await sequelize.sync({ force: true });
    res.status(201).json({ message: "Database created with the models." });
  } catch (error) {
    next(error);
  }
});

app.get("/universities", async (req, res, next) => {
  try {
    const universities = await University.findAll();
    if (universities.length > 0) res.json(universities);
    else res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.post("/universities", async (req, res, next) => {
  try {
    const university = await University.create(req.body);
    res.status(201).location(String(university.id)).send();
  } catch (error) {
    next(error);
  }
});

app.post("/university", async (req, res, next) => {
  try {
    const university = await University.create(req.body);
    res.status(201).json(university);
  } catch (error) {
    next(error);
  }
});

app.get("/students", async (req, res, next) => {
  try {
    const students = await Student.findAll();
    if (students.length > 0) res.json(students);
    else res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.get("/universities/:universityId/students", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId, { include: [Student] });
    if (!university) return res.sendStatus(404);
    if (university.students && university.students.length > 0) res.json(university.students);
    else res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.post("/universities/:universityId/students", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (!university) return res.sendStatus(404);

    const student = await Student.create({
      studentFullName: req.body.studentFullName ?? req.body.fullName,
      studentStatus: req.body.studentStatus ?? req.body.status,
      universityId: university.id
    });

    res.status(201).location(String(student.id)).json(student);
  } catch (error) {
    next(error);
  }
});

app.get("/universities/:universityId/students/:studentId", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (!university) return res.sendStatus(404);

    const students = await university.getStudents({ where: { id: req.params.studentId } });
    const student = students.shift();
    if (!student) return res.sendStatus(404);

    res.status(202).json(student);
  } catch (error) {
    next(error);
  }
});

app.put("/universities/:universityId/students/:studentId", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (!university) return res.sendStatus(404);

    const students = await university.getStudents({ where: { id: req.params.studentId } });
    const student = students.shift();
    if (!student) return res.sendStatus(404);

    const fullName = req.body.studentFullName ?? req.body.fullName;
    const status = req.body.studentStatus ?? req.body.status;

    if (fullName !== undefined) student.studentFullName = fullName;
    if (status !== undefined) student.studentStatus = status;

    await student.save();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.delete("/universities/:universityId/students/:studentId", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (!university) return res.sendStatus(404);

    const students = await university.getStudents({ where: { id: req.params.studentId } });
    const student = students.shift();
    if (!student) return res.sendStatus(404);

    await student.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.get("/universities/:universityId/courses", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (!university) return res.sendStatus(404);

    const courses = await university.getCourses();
    if (courses.length > 0) res.json(courses);
    else res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.get("/universities/:universityId/courses/:courseId", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (!university) return res.sendStatus(404);

    const courses = await university.getCourses({ where: { id: req.params.courseId } });
    const course = courses.shift();
    if (!course) return res.sendStatus(404);

    res.json(course);
  } catch (error) {
    next(error);
  }
});

app.post("/universities/:universityId/courses", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (!university) return res.sendStatus(404);

    const course = await Course.create({
      name: req.body.name,
      universityId: university.id
    });

    res.status(201).location(String(course.id)).json(course);
  } catch (error) {
    next(error);
  }
});

app.put("/universities/:universityId/courses/:courseId", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (!university) return res.sendStatus(404);

    const courses = await university.getCourses({ where: { id: req.params.courseId } });
    const course = courses.shift();
    if (!course) return res.sendStatus(404);

    await course.update(req.body);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.delete("/universities/:universityId/courses/:courseId", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (!university) return res.sendStatus(404);

    const courses = await university.getCourses({ where: { id: req.params.courseId } });
    const course = courses.shift();
    if (!course) return res.sendStatus(404);

    await course.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.get("/universities/:universityId/students/:studentId/enrollements", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (!university) return res.sendStatus(404);

    const students = await university.getStudents({ where: { id: req.params.studentId } });
    const student = students.shift();
    if (!student) return res.sendStatus(404);

    const courses = await student.getCourses({ attributes: ["id", "name"] });
    if (courses.length > 0) res.json(courses);
    else res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.post("/universities/:universityId/students/:studentId/enrollements/:courseId", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (!university) return res.sendStatus(404);

    const students = await university.getStudents({ where: { id: req.params.studentId } });
    const student = students.shift();

    const courses = await university.getCourses({ where: { id: req.params.courseId } });
    const course = courses.shift();

    if (!student || !course) return res.sendStatus(404);

    await student.addCourse(course);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.delete("/universities/:universityId/students/:studentId/enrollements/:courseId", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (!university) return res.sendStatus(404);

    const students = await university.getStudents({ where: { id: req.params.studentId } });
    const student = students.shift();

    const courses = await university.getCourses({ where: { id: req.params.courseId } });
    const course = courses.shift();

    if (!student || !course) return res.sendStatus(404);

    await student.removeCourse(course);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.get("/universities/:universityId/courses/:courseId/enrollements", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (!university) return res.sendStatus(404);

    const courses = await university.getCourses({ where: { id: req.params.courseId } });
    const course = courses.shift();
    if (!course) return res.sendStatus(404);

    const students = await course.getStudents({ attributes: ["id"] });
    if (students.length > 0) res.json(students);
    else res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.post("/universities/:universityId/courses/:courseId/enrollements/:studentId", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (!university) return res.sendStatus(404);

    const courses = await university.getCourses({ where: { id: req.params.courseId } });
    const course = courses.shift();

    const students = await university.getStudents({ where: { id: req.params.studentId } });
    const student = students.shift();

    if (!course || !student) return res.sendStatus(404);

    await course.addStudent(student);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.delete("/universities/:universityId/courses/:courseId/enrollements/:studentId", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (!university) return res.sendStatus(404);

    const courses = await university.getCourses({ where: { id: req.params.courseId } });
    const course = courses.shift();

    const students = await university.getStudents({ where: { id: req.params.studentId } });
    const student = students.shift();

    if (!course || !student) return res.sendStatus(404);

    await course.removeStudent(student);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.post("/", async (req, res, next) => {
  try {
    const registryStudents = {};
    const registryCourses = {};

    for (const u of req.body) {
      const universityPayload = {
        universityName: u.universityName ?? u.name
      };

      const university = await University.create(universityPayload);

      for (const s of (u.students || [])) {
        const studentPayload = {
          studentFullName: s.studentFullName ?? s.fullName ?? `${s.firstName ?? ""} ${s.lastName ?? ""}`.trim(),
          studentStatus: s.studentStatus ?? s.status ?? "ACTIVE",
          universityId: university.id
        };
        const student = await Student.create(studentPayload);
        const key = s.key ?? String(student.id);
        registryStudents[key] = student;
      }

      for (const c of (u.courses || [])) {
        const coursePayload = {
          name: c.name,
          universityId: university.id
        };
        const course = await Course.create(coursePayload);
        const key = c.key ?? String(course.id);
        registryCourses[key] = course;
      }

      for (const e of (u.enrollements || [])) {
        const student = registryStudents[e.studentKey ?? e.studentId];
        const course = registryCourses[e.courseKey ?? e.courseId];
        if (student && course) {
          await course.addStudent(student);
        }
      }
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.get("/", async (req, res, next) => {
  try {
    const universities = await University.findAll();
    const result = [];

    for (const u of universities) {
      const students = await u.getStudents();
      const courses = await u.getCourses();

      const studentMap = {};
      const courseMap = {};

      const outUniversity = {
        id: u.id,
        universityName: u.universityName ?? u.name,
        students: [],
        courses: [],
        enrollements: []
      };

      for (const s of students) {
        studentMap[String(s.id)] = true;
        outUniversity.students.push({
          id: s.id,
          studentFullName: s.studentFullName,
          studentStatus: s.studentStatus
        });
      }

      for (const c of courses) {
        courseMap[String(c.id)] = true;
        outUniversity.courses.push({
          id: c.id,
          name: c.name
        });
      }

      for (const c of courses) {
        const enrolledStudents = await c.getStudents({ attributes: ["id"] });
        for (const s of enrolledStudents) {
          if (studentMap[String(s.id)] && courseMap[String(c.id)]) {
            outUniversity.enrollements.push({
              studentId: s.id,
              courseId: c.id
            });
          }
        }
      }

      result.push(outUniversity);
    }

    if (result.length > 0) res.json(result);
    else res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "500 - Server Error" });
});

app.listen(port, () => {
  console.log("The server is running on http://localhost:" + port);
});
