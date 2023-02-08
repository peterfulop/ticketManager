import { Text } from './translate.scema';

export const TEXT: Text = {
  pages: {
    home: {
      name: { ENG: 'Home' },
    },
    login: {
      name: { ENG: 'LogIn' },
    },
    signup: {
      name: { ENG: 'SignUp' },
    },
    userConfirm: {
      name: { ENG: 'Confirm' },
    },
    projects: {
      name: { ENG: 'Projects' },
      labels: {
        noProjects: { ENG: 'No projects yet!' },
      },
    },
    notFound: {
      name: { ENG: 'Not Found' },
      labels: {
        title: { ENG: 'Page Not Found!' },
        content: { ENG: 'Return to the contacts page:' },
      },
    },
    profile: {
      name: { ENG: 'Profile' },
    },
  },
  forms: {
    loginForm: {
      title: { ENG: 'login' },
      labels: {
        email: { ENG: 'email:' },
        password: { ENG: 'password:' },
      },
      buttons: {
        loginBtn: { ENG: 'login' },
        resendBtn: { ENG: 'resend confirmation email' },
        signupBtn: { ENG: 'signup' },
      },
      alerts: {
        successfulEmailResent: { ENG: 'Email successfully resent!' },
      },
    },
    signupForm: {
      title: { ENG: 'signup' },
      labels: {
        name: { ENG: 'name:' },
        email: { ENG: 'email:' },
        password: { ENG: 'password:' },
        passwordConfirm: { ENG: 'password confirmation:' },
      },
      buttons: {
        signupBtn: { ENG: 'create account' },
        loginBtn: { ENG: 'login' },
      },
      alerts: {
        successfullRegistration: {
          ENG: 'You have successfully registered! Please confirm your account by email!',
        },
      },
    },
    confirmUserForm: {
      title: { ENG: 'User confirmation' },
      labels: {
        confirmText: {
          ENG: 'Confirm your registration by clicking the button below!',
        },
      },
      buttons: {
        confirmBtn: { ENG: 'confirm' },
      },
      alerts: {
        successfulUserConfirmation: {
          ENG: 'Successfully confirmed your account! Redirecting to the login page...',
        },
      },
    },
    projectForms: {
      CREATE: {
        title: { ENG: 'Create new project' },
        labels: {
          name: {
            ENG: 'Project name:',
          },
        },
        buttons: {
          submitBtn: { ENG: 'create project' },
        },
        alerts: {
          successful: {
            ENG: 'You successfully created the project!',
          },
        },
      },
      UPDATE: {
        title: { ENG: 'Update project' },
        labels: {
          name: {
            ENG: 'Current name:',
          },
        },
        buttons: {
          submitBtn: { ENG: 'update project' },
        },
        alerts: {
          successful: {
            ENG: 'You successfully updated the project!',
          },
        },
      },
      DELETE: {
        title: { ENG: 'Delete project' },
        labels: {
          name: {
            ENG: 'Current project:',
          },
        },
        buttons: {
          submitBtn: { ENG: 'update project' },
        },
        alerts: {
          successful: {
            ENG: 'You successfully deleted the project, and the connected tickets!',
          },
        },
      },
    },
  },
  buttons: {
    addNewBtn: { ENG: 'add new' },
    editBtn: { ENG: 'edit' },
    removeBtn: { ENG: 'remove' },
    doneBtn: { ENG: 'done' },
    cancelBtn: { ENG: 'cancel' },
    createBtn: { ENG: 'create' },
    homePageButton: { ENG: 'home' },
    logOutBtn: { ENG: 'log out' },
  },
  general: {
    loading: { ENG: 'loading...' },
    fetchingData: { ENG: 'fetching data...' },
    serverError: { ENG: 'Server Error. Something went wrong! :( ' },
  },
  ERRORS: {
    MISSING_TITLE_AND_CONTENT: {
      ENG: 'You must provide a title and a content to create a post!',
    },
    MISSING_RECORD: {
      ENG: 'Missing record!',
    },
    ONE_FIELD_TO_UPDATE: {
      ENG: 'Need to have at least one filed to update!',
    },
    SERVER_ERROR: { ENG: 'Internal server error!' },
    MISSING_SIGNUP_DATA: {
      ENG: 'You must provide a name, email and password to create a user!',
    },
    SHORT_PASSWORD: {
      ENG: 'Your password must be longer than 6 characters!',
    },
    PASSWORDS_DO_NOT_MATCH: { ENG: 'Your passwords do not match!' },
    MISSING_INPUTS: { ENG: 'All fields are mandatory!' },
    INVALID_EMAIL_ADDRESS: { ENG: 'Your email address is invalid!' },
    EMAIL_ADDRESS_ALREADY_IN_USE: {
      ENG: 'The email address is already in use! Please, choose another one!',
    },
    AUTHORIZATION_FAILED: { ENG: 'Wrong login credentials!' },
    UNAUTHENTICATED: { ENG: 'You are not logged in!' },
    USER_UNAUTHORIZED: {
      ENG: 'You have no permission to edit this content!',
    },
    UNCONFIRMED_USER: { ENG: 'Please, confirm your registration by email!' },
    ALREADY_CONFIRMED_USER: {
      ENG: 'You account is already confirmed! Please, login!',
    },
    MISSING_FIELDS: { ENG: 'The following values as required: ' },
    UNIQUE_CONSTRAINT_FAIL: {
      ENG: 'Duplicated values! The following inputs must be unique: ',
    },
  },
};
