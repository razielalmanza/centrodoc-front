import { Permisos } from "../types";

export const userHasPermissionToAccess = async (permissionsNeeded: Permisos[], permissionsGranted: Permisos[] | undefined) => {
  console.log(permissionsGranted, permissionsNeeded);
  if (!permissionsNeeded || permissionsNeeded.length == 0) return true;
  if (!permissionsGranted) {
    return false;
  }

  for (const permiso of permissionsGranted){
    if (permissionsNeeded.includes(permiso)) return true;
  }

  return false;
}
