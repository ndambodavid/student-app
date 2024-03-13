import { DATE, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import { addDays, addHours } from 'date-fns';
import Semester from './semester';

export interface FeeStructureAttributes {
    id: String;
    tuitionFee: number;
    examFee: number;
    libraryFee: number;
    projectFee: number;
    dateLine?: Date;
    semesterId?: String;
}

interface FeeStuctureCreationAttributes
    extends Optional<FeeStructureAttributes, 'id'> { }

interface FeeStructureInstance
    extends Model<FeeStructureAttributes, FeeStuctureCreationAttributes>,
    FeeStructureAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}


const FeeStructure = sequelize.define<FeeStructureInstance>(
    'FeeStructure',
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      tuitionFee: {
        allowNull: false,
        type: DataTypes.DECIMAL,
        defaultValue: 0.00,
      },
      examFee: {
        allowNull: false,
        type: DataTypes.DECIMAL,
        defaultValue: 0.00,
      },
      libraryFee: {
        allowNull: false,
        type: DataTypes.DECIMAL,
        defaultValue: 0.00
      },
      projectFee: {
        allowNull: false,
        type: DataTypes.DECIMAL,
      },
      dateLine: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: () => addHours(new Date(), 3)
      }

    }
  );

  Semester.hasOne(FeeStructure, {
    foreignKey: 'semesterId',
    as: 'feeStructure'
  })

  FeeStructure.belongsTo(Semester, {
    foreignKey: 'semesterId',
    as: 'semester'
  })

  export default FeeStructure;