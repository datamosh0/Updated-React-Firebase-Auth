# WebDevSimplified React-Firebase-Auth, Updated 6-11-2022

### [React-Firebase-Auth original project code](https://github.com/WebDevSimplified/React-Firebase-Auth)

## Changes made:

### firebase changes:

- firebase imports modifed

- exports modifed

- auth() from 'firebase/auth' deprecated. Now getAuth().

- auth.AnyFirebaseFunction(params) is now AnyFirebaseFunction(auth, params)

### react-router changes:

- PrivateRoute component updated

- useHistory deprecated. Now using useNavigate

- Redirect deprecated. Now using Navigate

### minor change:

- updated function declaration to ES6

### version updates

- firebase(7.2.0) -> firebase(9.8.3)

- react-router-dom(5.2.0) -> react-router-dom(6.3.0)
