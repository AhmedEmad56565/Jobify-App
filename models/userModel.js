import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name field can not be empty!'],
    minLength: [3, 'name field can not be less than 3 characters!'],
    maxLength: [10, 'name field can not be more than 10 characters!'],
    trim: true,
  },

  email: {
    type: String,
    required: [true, 'email field can not be empty!'],
    unique: true,
    validate: {
      validator: function (val) {
        return val.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
      },
      message: 'eamil field is not valid!',
    },
  },

  password: {
    type: String,
    required: [true, 'password field can not be empty!'],
    validate: {
      validator: function (val) {
        return val.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g);
      },
      message:
        'password must be at least 8 characters long, contains only letters and numbers.',
    },
  },

  lastName: {
    type: String,
    default: 'lastName',
    required: [true, 'last name field can not be empty!'],
    minLength: [3, 'last name field can not be less than 3 characters!'],
    maxLength: [10, 'last name field can not be more than 10 characters!'],
    trim: true,
  },

  location: {
    type: String,
    default: 'my city',
  },

  role: {
    type: String,
    enum: {
      values: ['user', 'admin'],
      message: 'job status is either (user) or (admin)!',
    },
    default: 'user',
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.validatePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
