import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    param: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    content: {
      type: String,
      required: false,
      default: "",
    },
    password: {
      type: String,
      required: false,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

noteSchema.methods.comparePassword = function (password) {
  return password === this.password;
};

const Note = mongoose.model("Note", noteSchema);

export default Note;
