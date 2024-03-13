import { DATE, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import Student from './student';

export interface PaymentAttributes {
    id: String;
    amount: number;
    paymentMethod: String;
    studentId: String
}

interface PaymentCreationAttributes
    extends Optional<PaymentAttributes, 'id'> { }

interface PaymentInstance
    extends Model<PaymentAttributes, PaymentCreationAttributes>,
    PaymentAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}


const Payment = sequelize.define<PaymentInstance>(
    'Payment',
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      amount: {
        allowNull: false,
        type: DataTypes.DECIMAL,
        defaultValue: 0.00,
      },
      paymentMethod: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'bank',
      },
      studentId: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: Student
        }
      }

    }
  );

  Payment.belongsTo(Student, {
    foreignKey: 'studentId',
    as: 'student'
  });

  Student.hasMany(Payment, {
    foreignKey: 'studentId',
    as: 'payments'
  });

  export default Payment;