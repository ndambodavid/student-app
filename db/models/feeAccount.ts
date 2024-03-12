import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import { addDays } from 'date-fns';
import Student from './student';

export interface AccountStructureAttributes {
    id: String;
    balance: number;
}

interface AccountStuctureCreationAttributes
    extends Optional<AccountStructureAttributes, 'id'> { }

interface AccountInstance
    extends Model<AccountStructureAttributes, AccountStuctureCreationAttributes>,
    AccountStructureAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}


const Account = sequelize.define<AccountInstance>(
    'Account',
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      balance: {
        allowNull: false,
        type: DataTypes.DECIMAL,
        defaultValue: 0.00,
      },

    }
  );

  Account.belongsTo(Student, {
    foreignKey: 'studentId',
    as: 'student'
  });

  Student.hasOne(Account, {
    foreignKey: 'studentId',
    as: 'account'
  })

  export default Account;