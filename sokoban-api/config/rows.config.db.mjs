import { mongoose } from "mongoose";

  const rowsSchema = mongoose.Schema(
    {
      //board_id: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
      board_id: String,
      row: Number,
      description: String,
    },
    {
      timestamps: true,
    }
  );

  export const Rows = mongoose.model("Rows", rowsSchema);