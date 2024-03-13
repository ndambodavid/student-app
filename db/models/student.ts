import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import Semester from './semester';

export interface StudentAttributes {
    id: String;
    firstName: String;
    lastName: String;
    address: String;
    regNo: String;
    userId: String;
    semesterId: String;
}

interface StudentCreationAttributes
    extends Optional<StudentAttributes, 'id'> { }

interface StudentInstance
    extends Model<StudentAttributes, StudentCreationAttributes>,
    StudentAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}


const Student = sequelize.define<StudentInstance>(
    'Student',
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      regNo: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      semesterId: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: Semester
        }
        
      },
      userId: {
        allowNull: false,
        type: DataTypes.STRING
      }
    }
  );

  

  export default Student;