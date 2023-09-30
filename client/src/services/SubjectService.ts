import { User } from '@/types/User';
import { Subject } from '@/types/Subject';
import { ApiCommunicator } from '@/services/ApiCommunicator';

export class SubjectService {
  public static async getByUser(user: User): Promise<Subject[]> {
    return (await await ApiCommunicator.getSubjectsByUser(
      user.id
    )) as Subject[];
  }

  public static async getSubject(id: number): Promise<Subject> {
    return (await ApiCommunicator.getSubject(id.toString())) as Subject;
  }
}
