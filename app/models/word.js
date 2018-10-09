import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const wordSchema = new Schema({
  chain: String, default: "",
  assonantRhyme: String, default: "",
  consonantRhyme: String, default: "",
  firstSyllable: String, default: "",
  lastSyllable: String, default: "",
  vocalSkeleton: String, default: ""
});

module.exports = mongoose.model('Word', wordSchema);
