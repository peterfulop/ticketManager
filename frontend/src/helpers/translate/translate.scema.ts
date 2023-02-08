import { EMutationTypes, EProjectInputs } from '../../types/enums/common.enum';
import { EServerSideError } from '../../types/enums/db-errors.enum';

export enum Languages {
  ENG = 'ENG',
}

export type Content = Record<Languages, string>;

type Form = {
  title: Content;
  buttons: {
    backBtn?: Content;
    submitBtn: Content;
  };
  alerts: {
    successful: Content;
  };
};

type ProjectForms = Record<
  EMutationTypes,
  Form & {
    labels: Record<EProjectInputs, Content>;
  }
>;

export type Text = {
  pages: {
    home: {
      name: Content;
    };
    login: {
      name: Content;
    };
    signup: {
      name: Content;
    };
    userConfirm: {
      name: Content;
    };
    projects: {
      name: Content;
      labels: {
        noProjects: Content;
      };
    };
    profile: { name: Content };
    notFound: {
      name: Content;
      labels: {
        title: Content;
        content: Content;
      };
    };
  };
  forms: {
    loginForm: {
      title: Content;
      labels: {
        email: Content;
        password: Content;
      };
      buttons: {
        loginBtn: Content;
        resendBtn: Content;
        signupBtn: Content;
      };
      alerts: {
        successfulEmailResent: Content;
      };
    };
    signupForm: {
      title: Content;
      labels: {
        name: Content;
        email: Content;
        password: Content;
        passwordConfirm: Content;
      };
      buttons: {
        signupBtn: Content;
        loginBtn: Content;
      };
      alerts: {
        successfullRegistration: Content;
      };
    };
    confirmUserForm: {
      title: Content;
      labels: {
        confirmText: Content;
      };
      buttons: {
        confirmBtn: Content;
      };
      alerts: {
        successfulUserConfirmation: Content;
      };
    };
    projectForms: ProjectForms;
  };
  buttons: {
    addNewBtn: Content;
    editBtn: Content;
    removeBtn: Content;
    doneBtn: Content;
    cancelBtn: Content;
    createBtn: Content;
    homePageButton: Content;
    logOutBtn: Content;
  };
  general: {
    fetchingData: Content;
    loading: Content;
    serverError: Content;
  };
  ERRORS: ServerSideErrorObject;
};

export type ServerSideErrorObject = Record<
  keyof typeof EServerSideError,
  Content
>;
