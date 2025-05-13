const multer = require('multer');
const path = require('path');

// הגדרת הדרך בה נשמור את הקבצים
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // תיקיית העלאות הקבצים
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // שם קובץ ייחודי
  }
});

// הגדרת העלאת קובץ אחד
const upload = multer({ storage: storage });

module.exports = upload;