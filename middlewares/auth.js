const admin = require('firebase-admin');
module.exports = () => async (req, res, next) => {
  try {
    const decode = await admin
      .auth()
      .verifyIdToken(
        'eyJhbGciOiJSUzI1NiIsImtpZCI6IjVmYjMyOWRmNjdiYjY4NDVkNDk1NDNiMGM0OWIzNWM4ODg1NzllYmEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTWluaCIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9jaGF0LXJlYWx0aW1lLWMwNjQ5IiwiYXVkIjoiY2hhdC1yZWFsdGltZS1jMDY0OSIsImF1dGhfdGltZSI6MTU1NTU1NjE3NiwidXNlcl9pZCI6IjQyaXZNcUlMOGRUWEp2TWhsY3IwR0tNUnV6TDIiLCJzdWIiOiI0Mml2TXFJTDhkVFhKdk1obGNyMEdLTVJ1ekwyIiwiaWF0IjoxNTU1NTU2MTc3LCJleHAiOjE1NTU1NTk3NzcsImVtYWlsIjoiM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiM0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.haLURyZtGbgmOKseMODF3ekwGeGYDoTMg5cKSdR4ahxGrPcNegdv8mihVhXU3FqabYdKnRcBXCbJjIa3aRGKpa5Jq2bzPhm4tjhoJlQqMg_f2sWZ9JnzYlHe8MNZWQwc52TKNLIS3V-iNr16L36mWCQbdHqTWY7-QbcFFzTVSfnK0N3vEZVSF3ckDwq-LFZECH4rabefCDwAFsXtKWcgudexcLtQJ8VElKfyvRiqoI7AiP8YHVYP9D4URE40GmBTBZwnDVNt4a5tUHQx9x3lyPcIyEbe6iXmPR4MRU5wsx8ulM0gJBEe0dRA56AJ_9BUNA2B9IO447Btrqz69zPclA',
      );
    const {
      providerData: [user],
    } = await admin.auth().getUser(decode.uid);
    req.user = user;
    next();
  } catch (err) {
    return next(err);
  }
};
