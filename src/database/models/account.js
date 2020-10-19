const mongoose = require('mongoose');
const leanDefaults = require('mongoose-lean-defaults');

exports.account = mongoose.model(
  'Account',
  new mongoose.Schema(
    {
      UserName: { type: String, required: true },
      Password: { type: String, required: true },
      NewPassword: String,
      FromUrl: String,
      Email: String,
      EmailVerified: Boolean,
      NewEmail: String,
      LOL: {
        Region: String,
        Banned: Boolean,
        SessionError: Boolean,
        BlueEssence: Number,
        Level: Number,
        RP: Number,
        Refunds: Number,
        Champs: Number,
        Skins: Number,
        Elo: String,
        Images: [String],
        LastPlay: Date
      },
      Valorant: {},
      MachineIndex: Number,
      Price: Number,
      UserID: String,
      PaymentID: String,
      NotInRegions: [String]
    },
    { collection: 'Accounts', timestamps: true }
  ).plugin(leanDefaults)
);
