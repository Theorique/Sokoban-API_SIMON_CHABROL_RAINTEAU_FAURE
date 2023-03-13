import { mongoose } from "mongoose";

  const boardSchema = mongoose.Schema(
    {
      board_id: String,
      name: String,
      rows: Number,
      cols: Number,
    },
    {
      timestamps: true,
    }
  );

  export const Board = mongoose.model("Board", boardSchema);