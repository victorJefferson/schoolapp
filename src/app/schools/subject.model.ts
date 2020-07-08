export class Sub {
  constructor
  (
    public subjectId: string,
    public name: string,
    public classId: string,
    public schoolId: string,
    public performance?:
    {
      userId: string,
      marks: number
    }[]

  ) {}
}
