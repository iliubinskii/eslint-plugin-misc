// eslint-disable-next-line @skylib/consistent-import, import/no-unassigned-import -- Ok
import "typescript";

declare module "typescript" {
  interface TypeChecker {
    /**
     * Checks if type is an array.
     *
     * @param type - Type.
     * @returns _True_ if type is an array, _false_ otherwise.
     */
    readonly isArrayType: (type: Type) => type is TypeReference;
    /**
     * Checks if type is a tuple.
     *
     * @param type - Type.
     * @returns _True_ if type is a tuple, _false_ otherwise.
     */
    readonly isTupleType: (type: Type) => type is TupleTypeReference;
  }
}
