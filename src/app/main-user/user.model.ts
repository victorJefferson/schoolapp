export class User {
  constructor(
    public userId: string,
    public name: string,
    public designation: string,
    public email: string,
    public role: string,
    public schoolId: string,
    public classId?: string
    ) {}
}
