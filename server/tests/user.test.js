const supertest = require('supertest');
const app = require('../app'); // האפליקציה שמחוברת ל-DB
const User = require('../models/User'); // עדכון המסלול למודל User

let request;

beforeAll(() => {
    request = supertest(app); // חיבור לשרת דרך האפליקציה
});

afterEach(async () => {
    // ניקוי המשתמשים לאחר כל מבחן
    await User.deleteMany({});
});

describe('POST /user/signup', () => {
    test('should create a new user and return a success message', async () => {
        const userData = {
            username: 'testuser',
            password: 'Test@1234',
            phone: '053-4198051',
            email: 'testuser@example.com',
            userType: 'Client',
        };

        const res = await request.post('/user/signup').send(userData);

        expect(res.status).toBe(201);
        expect(res.text).toBe('User saved successfully');

        const userInDb = await User.findOne({ email: 'testuser@example.com' });
        expect(userInDb).not.toBeNull();
        expect(userInDb.username).toBe('testuser');
    });

    test('should not create user with missing password', async () => {
        const userData = {
            username: 'testuser2',
            phone: '053-4198052',
            email: 'm9743740@example.com',
            userType: 'Client',
        };

        const res = await request.post('/user/signup').send(userData);

        expect(res.status).toBe(400); // או כל סטטוס מתאים להודעת שגיאה
    });

    test('should not create user with invalid email format', async () => {
        const userData = {
            username: 'testuser3',
            password: 'Test@1234',
            phone: '053-4198053',
            email: 'invalid-email',
            userType: 'Client',
        };

        const res = await request.post('/user/signup').send(userData);

        expect(res.status).toBe(500); // או כל סטטוס מתאים להודעת שגיאה
    });
});
