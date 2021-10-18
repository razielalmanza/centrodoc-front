export type User = {
  usuario: AuthUser;
  permisos: Permisos[];
};

export enum Permisos {
  CAR_READ = 1,
  CAR_WRITE = 2,
  CARTEL_READ = 3,
  CARTEL_WRITE = 4,
  FOMO_READ = 5,
  FOMO_WRITE = 6,
  FOTO_READ = 7,
  FOTO_WRITE = 8,
  HEME_READ = 9,
  HEME_WRITE = 10,
  INDI_READ = 11,
  INDI_WRITE = 12,
  LIBROS_READ = 13,
  LIBROS_WRITE = 14,
  PERSON_READ = 15,
  PERSON_WRITE = 16,
  STILLS_READ = 17,
  STILLS_WRITE = 18,
  UNICA_READ = 19,
  UNICA_WRITE = 20,
  CAR_BAJA = 21,
  CARTEL_BAJA = 22,
  FOMO_BAJA = 23,
  FOTO_BAJA = 24,
  HEME_BAJA = 25,
  INDI_BAJA = 26,
  LIBROS_BAJA = 27,
  PERSON_BAJA = 28,
  STILLS_BAJA = 29,
  UNICA_BAJA = 30,
}

export const Groups = {
  adminCar: [Permisos.CAR_READ, Permisos.CAR_WRITE, Permisos.CAR_BAJA],
  adminCartel: [Permisos.CARTEL_READ, Permisos.CARTEL_WRITE, Permisos.CAR_BAJA],
  adminFomo: [Permisos.FOMO_READ, Permisos.FOMO_WRITE, Permisos.CAR_BAJA],
  adminFoto: [Permisos.FOTO_READ, Permisos.FOTO_WRITE, Permisos.CAR_BAJA],
  adminHeme: [Permisos.HEME_READ, Permisos.HEME_WRITE, Permisos.CAR_BAJA],
  adminIndi: [Permisos.INDI_READ, Permisos.INDI_WRITE, Permisos.CAR_BAJA],
  adminLibros: [Permisos.LIBROS_READ, Permisos.LIBROS_WRITE, Permisos.CAR_BAJA],
  adminPerson: [Permisos.PERSON_READ, Permisos.PERSON_WRITE, Permisos.CAR_BAJA],
  adminStills: [Permisos.STILLS_READ, Permisos.STILLS_WRITE, Permisos.CAR_BAJA],
  adminUnica: [
    Permisos.UNICA_READ,
    Permisos.UNICA_WRITE,
    Permisos.UNICA_BAJA,
  ] /**Tal vez cambiar el nombre de este permiso en la base de permisos. */,
  consulta: getReadPermission(),
  consultaUnica: [Permisos.UNICA_READ],
  superuser: getAllPermissions(),
  // STAFF: [],
};

function getAllPermissions(): Permisos[] {
  let permissions: Permisos[] = [];
  for (const item in Permisos) {
    if (Number(item)) {
      permissions.push(Number(item));
    }
  }
  return permissions;
}

function getReadPermission(): Permisos[] {
  return [
    Permisos.CAR_READ,
    Permisos.CARTEL_READ,
    Permisos.FOMO_READ,
    Permisos.FOTO_READ,
    Permisos.HEME_READ,
    Permisos.INDI_READ,
    Permisos.LIBROS_READ,
    Permisos.PERSON_READ,
    Permisos.STILLS_READ,
    Permisos.UNICA_READ,
  ];
}

export type AuthUser = {
  id: number;
  password: string;
  lastLogin: Date | null;
  isSuperuser: boolean;
  username: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  isActive: boolean;
  isStaff: boolean;
  dateJoined: Date;
}