import { ETicketInputs } from '../../types/enums/common.enum';
import { Content, Text, TicketFormExtraLabels } from './translate.scema';

const ticketFormInputs: Record<ETicketInputs, Content> = {
  title: {
    ENG: 'ticket title:',
  },
  comment: {
    ENG: 'comment:',
  },
  description: {
    ENG: 'description:',
  },
  priority: {
    ENG: 'priority:',
  },
  references: {
    ENG: 'references:',
  },
  status: {
    ENG: 'status:',
  },
  storyPoints: {
    ENG: 'estimated story points:',
  },
  type: {
    ENG: 'type:',
  },
};

const ticketFormExtraLabels: TicketFormExtraLabels = {
  availableReferences: {
    ENG: 'available references:',
  },
  noReferences: {
    ENG: 'no referencies added ...',
  },
};

const ticketFormLabels = {
  ...ticketFormInputs,
  ...ticketFormExtraLabels,
};

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
        projectDetails: { ENG: 'Project details' },
        projectName: { ENG: 'Project name:' },
        sequence: { ENG: 'Sequence:' },
        tickets: { ENG: 'Tickets:' },
        createdAt: { ENG: 'Created at:' },
        updatedAt: { ENG: 'Updated at:' },
      },
    },
    dashboard: {
      name: { ENG: 'Dashboard' },
    },
    tickets: {
      name: { ENG: 'Tickets' },
      labels: {
        noTickets: { ENG: 'No tickets yet!' },
        noActiveSprint: {
          ENG: 'There are no active sprints yet! Create a sprint first!',
        },
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
          submitBtn: { ENG: 'delete project' },
        },
        alerts: {
          successful: {
            ENG: 'You successfully deleted the project, and the connected tickets!',
          },
        },
      },
    },
    ticketForms: {
      CREATE: {
        title: { ENG: 'Create new ticket' },
        labels: ticketFormLabels,
        buttons: {
          submitBtn: { ENG: 'create ticket' },
        },
        alerts: {
          successful: {
            ENG: 'You successfully created the ticket!',
          },
        },
      },
      UPDATE: {
        title: { ENG: 'Update ticket' },
        labels: ticketFormLabels,
        buttons: {
          submitBtn: { ENG: 'update ticket' },
        },
        alerts: {
          successful: {
            ENG: 'You successfully updated the ticket!',
          },
        },
      },
      DELETE: {
        title: { ENG: 'Delete ticket' },
        labels: ticketFormLabels,
        buttons: {
          submitBtn: { ENG: 'delete ticket' },
        },
        alerts: {
          successful: {
            ENG: 'You successfully deleted the ticket!',
          },
        },
      },
    },
  },
  buttons: {
    addBtn: { ENG: 'add' },
    addNewBtn: { ENG: 'add new' },
    editBtn: { ENG: 'edit' },
    removeBtn: { ENG: 'remove' },
    doneBtn: { ENG: 'done' },
    cancelBtn: { ENG: 'cancel' },
    backBtn: { ENG: 'back' },
    createBtn: { ENG: 'create' },
    homePageButton: { ENG: 'home' },
    logOutBtn: { ENG: 'log out' },
  },
  general: {
    loading: { ENG: 'loading...' },
    fetchingData: { ENG: 'fetching data...' },
    serverError: { ENG: 'Server Error. Something went wrong! :( ' },
    confirmDelete: { ENG: 'Dou you really want to delete this item?' },
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
    PERMISSION_DENIED: {
      ENG: 'Permission denied! You have no permission to the mutation!',
    },
    MUTATION_DISABLED: {
      ENG: 'Mutation disabled!',
    },
    RECORD_ARCHIVED: {
      ENG: 'Record archived!',
    },
    RECORD_ALREADY_EXISTS: {
      ENG: 'Record alreary exists!',
    },
    UNSHARED_PROJECT: {
      ENG: 'Unshared project! You have to share the project first to invite members.',
    },
    ALREADY_SUCCESS: {
      ENG: 'The mutation has already succeeded!',
    },
  },
};
