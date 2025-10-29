
export interface IParticipant {
  name: string;
  email: string;
  phone: string;
}

export type Ticket = {
  number: number;
  participant: IParticipant | null;
};
