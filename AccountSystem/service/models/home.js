let mongoose = require('mongoose')
let Schema = mongoose.Schema

// ? 模式类型； https://mongoose.shujuwajue.com/guide/schemas/typesmd
const homeSchema = new Schema({
  name:    String,
  binary:  Buffer,
  living:  Boolean,
  updated: { type: Date, default: Date.now },
  age:     { type: Number, min: 18, max: 65 },
  mixed:   Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  array:      [],
  ofString:   [String],
  ofNumber:   [Number],
  ofDates:    [Date],
  ofBuffer:   [Buffer],
  ofBoolean:  [Boolean],
  ofMixed:    [Schema.Types.Mixed],
  ofObjectId: [Schema.Types.ObjectId],
  nested: {
    stuff: { type: String, lowercase: true, trim: true }
  }
})
const Home =  mongoose.model("Home", homeSchema)
// var m = new Home;
//   m.name = 'Statue of Liberty';
//   m.age = 125;
//   m.updated = new Date;
//   m.binary = new Buffer(0);
//   m.living = false;
//   m.mixed = { any: { thing: 'i want' } };
//   m.markModified('mixed');
//   m._someId = new mongoose.Types.ObjectId;
//   m.array.push(1);
//   m.ofString.push("strings!");
//   m.ofNumber.unshift(1,2,3,4);
//   m.ofDates.addToSet(new Date);
//   m.ofBuffer.pop();
//   m.ofMixed = [1, [], 'three', { four: 5 }];
//   m.nested.stuff = 'good';
//   m.save(callback); 

module.exports = Home