require('dotenv').config()
const jwt = require('jsonwebtoken')

// Middleware לאימות משתמש
exports.loggedIn = function (req, res, next) {
  let token = req.header('Authorization')

  // אם אין טוקן, לא נותנים גישה
  if (!token) return res.status(401).send('Access Denied')

  try {
    // אם הטוקן מתחיל ב-'Bearer ' מסירים את המילה הזו
    if (token.startsWith('Bearer ')) {
      token = token.slice(7).trimLeft()
    } else {
      return res.status(401).send('Invalid token format')
    }

    // מאמתים את הטוקן עם SECRET שמור ב-.env
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)

    req.user = verified  // מכניסים את פרטי המשתמש לתוך בקשת ה-req
    next()  // אם הכל תקין, ממשיכים לפונקציה הבאה
  } catch (err) {
    res.status(401).send(`Invalid Token: ${err.message}`)
  }
}

// Middleware לבדוק אם המשתמש הוא אדמין
exports.adminOnly = async function (req, res, next) {
  if (req.user.userType !== "Admin") {
    return res.status(403).send('Access Denied: Admins Only')  // 403 אם המשתמש לא אדמין
  }
  next()  // אם המשתמש הוא אדמין, ממשיכים
}
