import { ticketPriorities } from '../../../helpers/ticket-priorities';
import { ticketStatuses } from '../../../helpers/ticket-statuses';
import { ticketTypes } from '../../../helpers/ticket-types';
import { MainSelectOption } from '../../../types';

export const ticketStatusOptions: MainSelectOption[] = Object.entries(
  ticketStatuses
).map((obj) => {
  const status = obj[0];
  const values = obj[1];
  return {
    value: status,
    content: values.title,
  };
});

export const ticketPriorityOptions: MainSelectOption[] = Object.entries(
  ticketPriorities
).map((obj) => {
  const priority = obj[0];
  const values = obj[1];
  return {
    value: priority,
    content: values.title,
  };
});

export const ticketTypeOptions: MainSelectOption[] = Object.entries(
  ticketTypes
).map((obj) => {
  const type = obj[0];
  const values = obj[1];
  return {
    value: type,
    content: values.title,
  };
});
