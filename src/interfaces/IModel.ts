export interface IModel<T> {
  create(obj: T): Promise<T>,
}