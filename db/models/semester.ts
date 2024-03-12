import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import Student from './student';

export interface SemesterAttributes {
    id: String;
    name: String;
}

interface SemesterCreationAttributes
    extends Optional<SemesterAttributes, 'id'> { }

interface SemesterInstance
    extends Model<SemesterAttributes, SemesterCreationAttributes>,
    SemesterAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}


const Semester = sequelize.define<SemesterInstance>(
    'Semester',
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        allowNull: false,
        type: DataTypes.ENUM('one', 'two', 'three'),
      }
    }
  );

  Semester.hasMany(Student, {
    foreignKey: 'semesterId',
    as: 'students'
  });

  Student.belongsTo(Semester, {
    foreignKey: 'semesterId',
    as: 'semester'
  })

  export default Semester;